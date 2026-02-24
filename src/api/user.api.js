import api from './axios-basic'

// 유저 리스트 조회
export const getUsers = async () => {
    const res = await api.get('/users')
    return res
}

// 유저 디테일 조회
export const getUserDetail = async (id) => {
    const res = await api.get(`/users/${id}`)
    return res
}

// 유저 검색
export const searchUsers = async ({nickname, category})=> {
    const params = {}

    if (nickname?.trim()) {
        params.nickname = nickname.trim()
    }
    if(category && category.length > 0) {
        params.category = category;
    }
    // console.log(params)
    const res = await api.get('/users/search', { 
        params,
        paramsSerializer: {
            indexes: null,
        } 
    })
    console.log('검색결과는', res.users)
    return res.users
}

// 팔로워 리스트
export const getFollowers = async (userId) => {
    const res = await api.get(`/follows/followers/${userId}`)
    return res
}

// 팔로잉 리스트
export const getFollowings = async (userId) => {
    const res = await api.get(`/follows/followings/${userId}`)
    return res
}

// 팔로워 개수 체크
export const getFollowersCount = async (userId) => {
    const res = await api.get(`/follows/${userId}/follower-count`)
    return res
}

// 팔로잉 개수 체크
export const getFollowingCount = async (userId) => {
    const res = await api.get(`/follows/${userId}/following-count`)
    return res
}


// 개인 팔로우 여부 확인
export const isFollowing = async (userId) => {
    try {
        const res = await api.get(`/follows/${userId}`)
        return res
    } catch (error) {
        throw error
    }
}

// 팔로우
export const followUser = async (userId) => {
    const res = await api.post(`/follows/${userId}`)
    return res
}

// 언팔로우
export const unfollowUser = async (userId) => {
    const res = await api.delete(`/follows/${userId}`)
    return res
}

// 로그인한 유저 확인
export const checkMe = async () => {
    const res = await api.get('/users/me')
    return res
}