// 목업 데이터

export const mockUsers = [
  {
    id: 1,
    name: "김맛집",
    email: "kim@example.com",
    profileImage: "https://via.placeholder.com/60",
    specialty: "한식 전문가",
    rating: 4.8,
    location: "서울 강남구",
    description: "20년 경력의 한식 전문가입니다. 전통 한식부터 퓨전 한식까지 다양한 요리를 다룹니다.",
    followerCount: 1250,
    reviewCount: 342
  },
  {
    id: 2,
    name: "이일식",
    email: "lee@example.com",
    profileImage: "https://via.placeholder.com/60",
    specialty: "일식 전문가",
    rating: 4.9,
    location: "서울 서초구",
    description: "일본에서 10년간 수학한 일식 요리사입니다. 정통 일식 요리를 선보입니다.",
    followerCount: 2100,
    reviewCount: 456
  },
  {
    id: 3,
    name: "박양식",
    email: "park@example.com",
    profileImage: "https://via.placeholder.com/60",
    specialty: "양식 전문가",
    rating: 4.7,
    location: "서울 마포구",
    description: "프랑스 요리학교를 졸업한 양식 전문가입니다. 정통 프랑스 요리를 제공합니다.",
    followerCount: 980,
    reviewCount: 234
  },
  {
    id: 4,
    name: "최중식",
    email: "choi@example.com",
    profileImage: "https://via.placeholder.com/60",
    specialty: "중식 전문가",
    rating: 4.6,
    location: "서울 송파구",
    description: "중국 본토에서 수학한 중식 요리사입니다. 사천요리부터 광동요리까지 다룹니다.",
    followerCount: 1560,
    reviewCount: 389
  },
  {
    id: 5,
    name: "정디저트",
    email: "jung@example.com",
    profileImage: "https://via.placeholder.com/60",
    specialty: "디저트 전문가",
    rating: 4.9,
    location: "서울 강동구",
    description: "파티시에 자격증을 보유한 디저트 전문가입니다. 케이크와 마카롱을 전문으로 합니다.",
    followerCount: 3200,
    reviewCount: 567
  }
];

export const mockRestaurants = [
  {
    id: 1,
    name: "맛있는 한식당",
    category: "한식",
    address: "서울 강남구 테헤란로 123",
    image: "https://via.placeholder.com/80",
    rating: 4.7,
    location: { lat: 37.5665, lon: 126.9780 },
    description: "정통 한식을 제공하는 레스토랑입니다.",
    reviewCount: 234,
    priceRange: "중",
    openingHours: "11:00 - 22:00"
  },
  {
    id: 2,
    name: "스시야",
    category: "일식",
    address: "서울 서초구 서초대로 456",
    image: "https://via.placeholder.com/80",
    rating: 4.8,
    location: { lat: 37.4837, lon: 127.0324 },
    description: "신선한 재료로 만드는 정통 일식 레스토랑입니다.",
    reviewCount: 189,
    priceRange: "상",
    openingHours: "12:00 - 21:00"
  },
  {
    id: 3,
    name: "파리지앵",
    category: "양식",
    address: "서울 마포구 홍대입구로 789",
    image: "https://via.placeholder.com/80",
    rating: 4.6,
    location: { lat: 37.5563, lon: 126.9236 },
    description: "프랑스 정통 요리를 제공하는 레스토랑입니다.",
    reviewCount: 156,
    priceRange: "상",
    openingHours: "18:00 - 23:00"
  },
  {
    id: 4,
    name: "중화요리",
    category: "중식",
    address: "서울 송파구 올림픽로 321",
    image: "https://via.placeholder.com/80",
    rating: 4.5,
    location: { lat: 37.5145, lon: 127.1058 },
    description: "정통 중화요리를 맛볼 수 있는 레스토랑입니다.",
    reviewCount: 278,
    priceRange: "중",
    openingHours: "11:30 - 22:30"
  },
  {
    id: 5,
    name: "달콤한 디저트카페",
    category: "카페/디저트",
    address: "서울 강동구 천호대로 654",
    image: "https://via.placeholder.com/80",
    rating: 4.9,
    location: { lat: 37.5301, lon: 127.1238 },
    description: "수제 디저트와 커피를 제공하는 카페입니다.",
    reviewCount: 412,
    priceRange: "하",
    openingHours: "10:00 - 22:00"
  },
  {
    id: 6,
    name: "맛있는 치킨집",
    category: "치킨",
    address: "서울 종로구 종로 987",
    image: "https://via.placeholder.com/80",
    rating: 4.4,
    location: { lat: 37.5735, lon: 126.9788 },
    description: "바삭한 치킨과 다양한 소스를 제공하는 치킨 전문점입니다.",
    reviewCount: 523,
    priceRange: "중",
    openingHours: "16:00 - 02:00"
  }
];
