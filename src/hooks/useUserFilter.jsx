import { useState, useEffect, useMemo } from 'react';
import { tags } from '../data/users.mock'
import { useQuery } from '@tanstack/react-query';
import { getUsers } from '../api/user.api';
import { QUERY_KEYS } from '../lib/constants';

const useUserFilter = () => {
  const [keyword, setKeyword] = useState("");
  // 선택된 태그 저장(다중 선택 가능하게 하기 위해 []로)
  const [tag, setTag] = useState([]);
  
  const [searchKeyword, setSearchKeyword] = useState("")

  const {data: users = [], isLoading, error} = useQuery({
    queryKey: QUERY_KEYS.user.list,
    queryFn: getUsers,
  })

  // 디바운싱
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchKeyword(keyword)
    }, 500)
    
    return () => clearTimeout(timer)    
  }, [keyword])


  // 유저 필터링
  const filteredUsers = useMemo (() => {
    let filtered = users

    // 선택된 등급(태그)과 비교
    if (tag.length > 0) {
        // 내가 선택한 tag 목록에 user.tag가 있으면 해당항목 남김
        filtered = filtered.filter((user) => tag.includes(user.category))
    }
     
    if (searchKeyword.trim() !== ""){
      const query = searchKeyword.toLowerCase()
      filtered = filtered.filter((user) => user.nickname?.toLowerCase().includes(query))
    }

    return filtered
  }, [users, searchKeyword, tag])
  return {
    users: filteredUsers,
    keyword,
    setKeyword,
    tag,
    setTag,
    tags: tags,
    isLoading,
    error
  
  }
}

export default useUserFilter