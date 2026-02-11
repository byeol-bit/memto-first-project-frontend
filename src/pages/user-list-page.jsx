import { useState } from "react";
import UserList from "../components/user-list-components/userList";
import useUserFilter from "../hooks/useUserFilter";
import UserTag from "../components/user-list-components/userTag";
import SearchBar from "../components/restaurant/searchBar";
const UserListPage = () => {
  	const { users, keyword, setKeyword, tag, setTag, tags, isLoading, error } =
	useUserFilter();

	const handleKeywordChange = (e) => {
		setKeyword(e.target.value)
	}

	const handleSearch = () => {
		setKeyword(keyword)
	}


	if (isLoading) {
		return (
		<div className="flex justify-center items-center">
			유저 목록을 불러오는 중입니다.
		</div>
		);
	}

		if (error) {
		return (
		<div className="flex justify-center items-center">
			유저 목록을 불러오는데 실패했습니다.
		</div>
		);
	}


	return (
		<div className="px-3">
			<div>
				{/* 상단 메뉴 설명 (메뉴 이름, 숨은 고수들을 탐색해보세요.) */}
				<div className="text-2xl font-bold">고수목록</div>
				<div>숨은 고수들을 탐색해보세요.</div>

				{/* 고수 검색창 + 태그 필터링 */}
				<form onSubmit={(e) => e.preventDefault()}>
				<SearchBar 
					value={keyword} 
					onChange={handleKeywordChange}
					onSearch={handleSearch} 
					placeholder='유저 이름을 검색해주세요' />

				</form>
				<UserTag tag={tag} setTag={setTag} tags={tags}/>

				{/* 고수 리스트 */}
				<UserList
					users={users}
				/>
			</div>
		</div>
	);
};

export default UserListPage;
