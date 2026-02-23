import { useQuery } from "@tanstack/react-query";
import { fetchUsers } from "../../api/fetch-users"
import { QUERY_KEYS } from "../../lib/constants";
import { getFollowersCount, getFollowingCount, getUserDetail, isFollowing, searchUsers, getFollowers, getFollowings } from "../../api/user.api";

export function useUsersData() {
  return useQuery({
    queryFn: fetchUsers,
    queryKey: QUERY_KEYS.user.list,
  })
}

export const useUserDetail = (userId) => {
  return useQuery({
    queryKey: QUERY_KEYS.user.detail(userId),
    queryFn:() => getUserDetail(userId)
  })
}

// 검색한 유저 호출
export const useSearchUsers = ({ nickname, category }) =>
  useQuery({
    queryKey: ["users", "search", nickname, category],
    queryFn: () => searchUsers({ nickname, category }),
    keepPreviousData: true,
    enabled: !!nickname || category.length > 0,
  });

// 팔로잉 여부 체크
export const useIsFollowing = (userId) => {
  return useQuery({
    queryKey: ["follow", userId],
    queryFn: async() => {
      const data = await isFollowing(userId)
      console.log('팔로잉인지 체크중', data.isFollow)
      return data.isFollow
    },
    enabled: !!userId
  })
}

// 팔로잉 수
export const useCountFollowing = (userId) => {
  return useQuery({
    queryKey: ["follows", userId, "following"],
    queryFn: async() => getFollowingCount(userId),
    enabled: !!userId
  })
}

// 팔로워 수
export const useCountFollower = (userId) => {
  return useQuery({
    queryKey: ["follows", userId, "follower"],
    queryFn: async() => getFollowersCount(userId),
    enabled: !!userId
  })
}

// 내가 팔로잉 하고 있는 유저 리스트
export const useFollowingUsers = (userId, enabled) => {
  return useQuery({
    queryKey: ["follows", "followings", userId],
    queryFn: async() => getFollowings(userId),
    enabled: !!userId && enabled
  })
}

export const useFollowerUsers = (userId) => {
  return useQuery({
    queryKey: ["follows", "followers", userId],
    queryFn: async() => getFollowers(userId),
    enabled: !!userId
  })
}