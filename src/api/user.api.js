import api from './axios'

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