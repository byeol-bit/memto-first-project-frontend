import UserList from "../components/user-list-components/userList";
import UserTag from "../components/user-list-components/userTag";
import TabButton from "../components/tabButton";
import SearchBar from "../components/restaurant/searchBar";

import useUserFilter from "../hooks/useUserFilter";
import { useFollowingUsers } from "../hooks/queries/use-users-data";

import { useState } from "react";
import { useNavigate } from "react-router";
// import { useLikedUsers } from "../api/user.api";

const TABS = {
	ALL_USERS: 'allUsers',
	LIKED_USERS: 'likedUsers'
}

const UserListPage = () => {
  	const { users, keyword, setKeyword, tag, setTag, tags, isLoading } =
	useUserFilter();
	const [selectedTab, setSelectedTab] = useState(TABS.ALL_USERS)
    const navigate = useNavigate()

	// ===추가 구현 사항===
	// 로그인 여부 판단 후 내가 관심 갖고 있는 고수 목록 
    const isLogin = true
	// const { data: likedUsers = [], isLoading: likedUsersLoading, error: likedUsersError} = 
	// useLikedUsers()
	const { data: followingUsers = [], isLoading: followingUsersLoading} = 
		useFollowingUsers(8)
	
	const handleKeywordChange = (e) => {
		setKeyword(e.target.value)
	}

	const handleSearch = () => {
		setKeyword(keyword)
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
			<div>
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
						<UserList users={users} isLoading={isLoading}/>
					</div>
				}
				{selectedTab === TABS.LIKED_USERS && (					
					isLogin ? (
						<div className="pt-4">
							<UserList users={followingUsers}/>
						</div>
					):(
						<div 
							className="flex items-center justify-center min-h-screen overflow-hidden hover:bg-gray-100"
							onClick={() => navigate('/sign-in')}
						>
							로그인 해주세요.
						</div>
					)
				)}
			</div>
		</div>
	);
};

export default UserListPage;
