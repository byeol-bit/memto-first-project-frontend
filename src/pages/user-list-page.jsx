import UserList from "../components/user-list-components/userList";
import UserTag from "../components/user-list-components/userTag";
import TabButton from "../components/tabButton";
import SearchBar from "../components/restaurant/searchBar";
import {tags} from '../data/users.mock'
import { useFollowingUsers, useInfiniteUsers } from "../hooks/queries/use-users-data";

import { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useLoginState } from "../components/loginstate";
import Button from "../components/common/button";
import InfiniteScrollTrigger from "../components/common/infiniteScrollTrigger";

const TABS = {
	ALL_USERS: 'allUsers',
	LIKED_USERS: 'likedUsers'
}

const UserListPage = () => {
	const [keyword, setKeyword] = useState("")
	const [searchKeyword, setSearchKeyword] = useState("")
	const [tag, setTag] = useState([]);
	const [selectedTab, setSelectedTab] = useState(TABS.ALL_USERS)
    const navigate = useNavigate()
	const {isLoggedIn, user} = useLoginState()
	
	  // 디바운싱
	useEffect(() => {
		const timer = setTimeout(() => {
		setSearchKeyword(keyword)
		}, 500)
		
		return () => clearTimeout(timer)    
	}, [keyword])
	
	const {data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading} = useInfiniteUsers({
		nickname: searchKeyword,
		category: tag,
	})
	console.log('dat는요', data)


	const allUsers = useMemo(() => {
		if(!data?.pages) return []
		return data.pages.flatMap((page) => {
			if (Array.isArray(page)) return page
			if (page?.data) return page.data
			return []
		})
	}, [data])

	const { data: followingUsers = [], isLoading: followingUsersLoading} = useFollowingUsers(8)
	const handleKeywordChange = (e) => {
		setKeyword(e.target.value)
	}

	const handleSearch = () => {
		setSearchKeyword(keyword)
	}

	return (
		<div className='px-3'>
			<div className='flex border-b border-b-gray-200 mt-2'>
				<TabButton 
					label='모든 고수'
					active={selectedTab === TABS.ALL_USERS}
					onClick={() => setSelectedTab(TABS.ALL_USERS)}
				/>
				<TabButton
					label='관심 고수'
					active={selectedTab === TABS.LIKED_USERS}
					onClick={() => setSelectedTab(TABS.LIKED_USERS)}
				/>
			</div>
			<div className="py-8">
				{/* 고수 리스트 */}
				{selectedTab === TABS.ALL_USERS && 
					<div>
						<form onSubmit={(e) => e.preventDefault()}>
							<SearchBar 
								value={keyword} 
								onChange={handleKeywordChange}
								onSearch={handleSearch} 
								placeholder='유저 이름을 검색해주세요' />
						</form>

						<UserTag tag={tag} setTag={setTag} tags={tags}/>
						<UserList users={allUsers} isLoading={isLoading}/>
						<InfiniteScrollTrigger onIntersect={fetchNextPage} hasNextPage={hasNextPage} isFetchingNextPage={isFetchingNextPage} />
					</div>
				}
				{selectedTab === TABS.LIKED_USERS && (					
					isLoggedIn ? (
						<div className="pt-4">
							<UserList users={followingUsers}/>
						</div>
					):(
						<div className="flex flex-col items-center gap-4 py-10">
							로그인 해주세요.
							<Button onClick={() => navigate('/sign-in')}>
								로그인 하러가기
							</Button>
						</div>
					)
				)}
			</div>
		</div>
	);
};

export default UserListPage;
