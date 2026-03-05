import api from "./axios-basic";

// 유저 리스트 조회
export const getUsers = async ({page = 1, limit = 10}) => {
    const res = await api.get('/users', {
        params: {page, limit}
    })
    return res
}

// 유저 디테일 조회
export const getUserDetail = async (id) => {
  const res = await api.get(`/users/${id}`);
  return res;
};

// 유저 검색
export const searchUsers = async ({nickname, category, page=1, limit=10})=> {
  const params = {page, limit};
  if(nickname?.trim()){
    params.nickname = nickname.trim()
  }
  if(category?.length) {
    params.category = category
  }
  const res = await api.get(`/users/search`, {
    params,
    paramsSerializer: {indexes: null}
  })
  return res
}

// 팔로워 리스트
export const getFollowers = async ({userId, page=1, limit=10}) => {
  const res = await api.get(`/follows/followers/${userId}`, {
    params: {page, limit}
  });
  return res;
};

// 팔로잉 리스트
export const getFollowings = async ({userId, page=1, limit=10}) => {
 const res = await api.get(`/follows/followings/${userId}`, {
    params: { page, limit}
  });
  return res;
};

// 팔로워 개수 체크
export const getFollowersCount = async (userId) => {
  const res = await api.get(`/follows/${userId}/follower-count`);
  return res?.count ?? 0;
};

// 팔로잉 개수 체크
export const getFollowingCount = async (userId) => {
  const res = await api.get(`/follows/${userId}/following-count`);
  return res?.count ?? 0;
};

// 개인 팔로우 여부 확인
export const isFollowing = async (userId) => {
  const res = await api.get(`/follows/${userId}`);
  return res;
};

// 팔로우
export const followUser = async (userId) => {
  const res = await api.post(`/follows/${userId}`);
  return res;
};

// 언팔로우
export const unfollowUser = async (userId) => {
  const res = await api.delete(`/follows/${userId}`);
  return res;
};

// 로그인한 유저 확인
export const checkMe = async () => {
  const res = await api.get("/users/me");
  return res;
};

// 유저 이미지
export const userImg = (userId) => {
  return `https://hidden-master-server.fly.dev/users/${userId}/image`
}

export const userCategories = async () => {
  const res = await api.get("users/categories");
  return res
}