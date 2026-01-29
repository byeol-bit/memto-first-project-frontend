import { useEffect, useState } from "react"
import { useParams } from "react-router"
import UserProfile from "../components/user-detail-components/userProfile"

import UserReview from "../components/user-detail-components/userReview"
import UserVisited from "../components/user-detail-components/userVisited"

import {users} from "../data/users.mock"

// 해당 유저의 상세 정보 api
const USER = {
    name: "맛집탐험가",
    tag: "푸드파이터",
    visited_count: 25,
    reviews: 30,
    followers: 15,
    followings: 8,
    most_visited: 5,
    stars: 4.8,
    comment: "서울 강남구 중심으로 이하 생략"
}


const UserDetailPage = () => {
  const {id} = useParams()
  const [selectedTab, setSelectedTab] = useState('visited')

  // 
  useEffect(() => {
    // 유저 정보 불러오기
  })

  return (
    <div>
      <UserProfile user={USER}></UserProfile>
      <div className="grid grid-cols-4 text-center">
        <div onClick={() => setSelectedTab('visited')}>
          <div>방문한 맛집</div>
          <div>{USER.visited_count}</div>
        </div>
        <div onClick={() => setSelectedTab('reviews')}>
          <div>작성한 리뷰</div>
          <div>{USER.reviews}</div>
        </div>
        <div>
          <div>가장 많이 방문한 맛집</div>
          <div>{USER.most_visited}</div>
        </div>
        <div>
          <div>평균 별점</div>
          <div>{USER.stars}</div>
        </div>
        {/* 선택된 항목에 따라 다른 페이지 출력 */}
        <div>
          {selectedTab === 'visited' && <UserVisited />}
          {selectedTab === 'reviews' && <UserReview />}
        </div>
      </div>
    </div>
  )
}

export default UserDetailPage