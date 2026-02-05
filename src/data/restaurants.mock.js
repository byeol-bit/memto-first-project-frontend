// src/data/mockData.js

// ----------------------------------------------------------------------
// 1. Users (사용자)
// ----------------------------------------------------------------------
export const mockUsers = [
  {
    id: 1,
    nickname: "맛집탐험가",
    profileImage:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
    introduction: "서울 곳곳의 숨은 맛집을 찾아다니는 맛집 전문가입니다.",
    category: "동네맛집고수",
    createdAt: "2024-01-01T10:00:00Z",
    updatedAt: "2024-01-01T10:00:00Z",
  },
  {
    id: 2,
    nickname: "먹방러버",
    profileImage:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
    introduction: "유튜브에서 먹방을 하는 푸드 크리에이터입니다.",
    category: "먹방유투버",
    createdAt: "2024-01-02T10:00:00Z",
    updatedAt: "2024-01-02T10:00:00Z",
  },
  {
    id: 3,
    nickname: "푸드파이터",
    profileImage:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop",
    introduction: "대식가로서 다양한 음식을 도전하는 푸드파이터입니다.",
    category: "푸드파이터",
    createdAt: "2024-01-03T10:00:00Z",
    updatedAt: "2024-01-03T10:00:00Z",
  },
];

// ----------------------------------------------------------------------
// 2. Restaurants (맛집)
// ----------------------------------------------------------------------
export const mockRestaurants = [
  {
    id: 1,
    name: "맛있는 파스타집",
    address: "서울특별시 강남구 테헤란로 123",
    phoneNumber: "02-1234-5678",
    category: "양식",
    latitude: 37.5665,
    longitude: 126.978,
    kakaoPlaceId: "12345678",
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-20T10:00:00Z",
    thumbnail:
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80",
    visitCount: 15,
    expertCount: 3,
    tags: ["데이트코스", "파스타맛집", "분위기좋은"],
    likeCount: 24,
  },
  {
    id: 2,
    name: "전통 한정식",
    address: "서울특별시 종로구 인사동길 45",
    phoneNumber: "02-2345-6789",
    category: "한식",
    latitude: 37.5715,
    longitude: 126.985,
    kakaoPlaceId: "12345679",
    createdAt: "2024-01-10T10:00:00Z",
    updatedAt: "2024-01-22T10:00:00Z",
    thumbnail:
      "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&q=80",
    visitCount: 23,
    expertCount: 5,
    tags: ["상견례", "가성비", "회식장소"],
    likeCount: 20,
  },
  {
    id: 3,
    name: "신선한 회집",
    address: "서울특별시 마포구 홍대입구역 2번 출구",
    phoneNumber: "02-3456-7890",
    category: "일식",
    latitude: 37.5563,
    longitude: 126.923,
    kakaoPlaceId: "12345680",
    createdAt: "2024-01-05T10:00:00Z",
    updatedAt: "2024-01-21T10:00:00Z",
    thumbnail:
      "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80",
    visitCount: 31,
    expertCount: 7,
    tags: ["신선함", "제철방어", "모임장소"],
    likeCount: 0,
  },
];

// ----------------------------------------------------------------------
// 3. RestaurantImages (맛집 이미지)
// * ID 1번에 이미지 7장을 넣어 (+1) 테스트 가능하게 설정함
// ----------------------------------------------------------------------
export const mockRestaurantImages = [
  // --- 맛집 ID: 1 (총 7장) ---
  {
    id: 1,
    restaurantId: 1,
    imageUrl:
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80", // 대표
    displayOrder: 1,
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z",
  },
  {
    id: 2,
    restaurantId: 1,
    imageUrl:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80", // 내부
    displayOrder: 2,
    createdAt: "2024-01-15T10:05:00Z",
    updatedAt: "2024-01-15T10:05:00Z",
  },
  {
    id: 3,
    restaurantId: 1,
    imageUrl:
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80", // 디저트
    displayOrder: 3,
    createdAt: "2024-01-15T10:10:00Z",
    updatedAt: "2024-01-15T10:10:00Z",
  },
  {
    id: 7,
    restaurantId: 1,
    imageUrl:
      "https://images.unsplash.com/photo-1608755728617-aefab37d2512?w=800&q=80", // 파스타 상세
    displayOrder: 4,
    createdAt: "2024-01-15T10:12:00Z",
    updatedAt: "2024-01-15T10:12:00Z",
  },
  {
    id: 8,
    restaurantId: 1,
    imageUrl:
      "https://images.unsplash.com/photo-1579631542720-3a99724f058e?w=800&q=80", // 피자
    displayOrder: 5,
    createdAt: "2024-01-15T10:14:00Z",
    updatedAt: "2024-01-15T10:14:00Z",
  },
  {
    id: 9,
    restaurantId: 1,
    imageUrl:
      "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&q=80", // 와인/칵테일
    displayOrder: 6,
    createdAt: "2024-01-15T10:16:00Z",
    updatedAt: "2024-01-15T10:16:00Z",
  },
  {
    id: 10,
    restaurantId: 1,
    imageUrl:
      "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=800&q=80", // 7번째 이미지 (+1 대상)
    displayOrder: 7,
    createdAt: "2024-01-15T10:18:00Z",
    updatedAt: "2024-01-15T10:18:00Z",
  },

  // --- 맛집 ID: 2 ---
  {
    id: 4,
    restaurantId: 2,
    imageUrl:
      "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&q=80",
    displayOrder: 1,
    createdAt: "2024-01-10T10:00:00Z",
    updatedAt: "2024-01-10T10:00:00Z",
  },
  {
    id: 5,
    restaurantId: 2,
    imageUrl:
      "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800&q=80",
    displayOrder: 2,
    createdAt: "2024-01-10T10:00:00Z",
    updatedAt: "2024-01-10T10:00:00Z",
  },

  // --- 맛집 ID: 3 ---
  {
    id: 6,
    restaurantId: 3,
    imageUrl:
      "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80",
    displayOrder: 1,
    createdAt: "2024-01-20T12:00:00Z",
    updatedAt: "2024-01-20T12:00:00Z",
  },
];

// ----------------------------------------------------------------------
// 4. VisitImages (방문 인증샷)
// ----------------------------------------------------------------------
export const mockVisitImages = [
  {
    id: 1,
    visitId: 1,
    imageUrl: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600",
    displayOrder: 1,
    createdAt: "2024-01-20T12:30:00Z",
    updatedAt: "2024-01-20T12:30:00Z",
  },
  {
    id: 2,
    visitId: 1,
    imageUrl:
      "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=600",
    displayOrder: 2,
    createdAt: "2024-01-20T12:30:00Z",
    updatedAt: "2024-01-20T12:30:00Z",
  },
  {
    id: 3,
    visitId: 2,
    imageUrl: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600",
    displayOrder: 1,
    createdAt: "2024-01-18T18:30:00Z",
    updatedAt: "2024-01-18T18:30:00Z",
  },
  {
    id: 4,
    visitId: 3,
    imageUrl:
      "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=600",
    displayOrder: 1,
    createdAt: "2024-01-22T13:30:00Z",
    updatedAt: "2024-01-22T13:30:00Z",
  },
  {
    id: 5,
    visitId: 3,
    imageUrl: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600",
    displayOrder: 2,
    createdAt: "2024-01-22T13:30:00Z",
    updatedAt: "2024-01-22T13:30:00Z",
  },
];

// ----------------------------------------------------------------------
// 5. Visits (방문 기록)
// ----------------------------------------------------------------------
export const mockVisits = [
  {
    id: 1,
    userId: 1,
    restaurantId: 1,
    visitDate: "2024-01-20T12:00:00Z",

    // 내용도 조금 더 길게 수정해서 "더보기" 테스트하기 좋게 만듦
    review:
      "사진 많이 찍어왔어요! 📸\n여기 크림 파스타 진짜 꾸덕하고 맛있습니다. 분위기도 좋아서 데이트 강추!\n직원분들도 너무 친절하시고 매장도 청결해서 기분 좋게 식사했습니다. 재방문 의사 200% 입니다!",

    createdAt: "2024-01-20T12:30:00Z",
    updatedAt: "2024-01-20T12:30:00Z",
    user: mockUsers[0],
    restaurant: mockRestaurants[0],

    // [중요] 아까 만든 6장짜리 이미지들(mockVisitImages)을 여기서 가져옴
    visitImages: mockVisitImages.filter((img) => img.visitId === 1),
    // [신규] 네이버 스타일 태그 카운트
    reactions: {
      tasty: 12, // 음식이 맛있어요
      mood: 5, // 분위기가 좋아요
      cost: 3, // 가성비가 좋아요
      kind: 8, // 친절해요
    },
    likeCount: 5,
  },
  {
    id: 2,
    userId: 2,
    restaurantId: 1,
    visitDate: "2024-01-18T18:00:00Z",
    review:
      "저녁에 갔는데 조명이 예뻐요. 웨이팅이 좀 있었지만 기다릴만 합니다. 데이트 코스로 완벽해요!",
    createdAt: "2024-01-18T18:30:00Z",
    updatedAt: "2024-01-18T18:30:00Z",
    user: mockUsers[1],
    restaurant: mockRestaurants[0],
    // 이미지 4장 연결
    visitImages: mockVisitImages.filter((img) => img.visitId === 2),
    reactions: {
      mood: 8,
      kind: 2,
    },
    likeCount: 7,
  },
  {
    id: 3,
    userId: 3,
    restaurantId: 2,
    visitDate: "2024-01-22T13:00:00Z",
    review: "부모님 모시고 가기 딱 좋습니다. 반찬이 정갈하네요.",
    createdAt: "2024-01-22T13:30:00Z",
    updatedAt: "2024-01-22T13:30:00Z",
    user: mockUsers[2],
    restaurant: mockRestaurants[1],
    // 이미지 1장 연결
    visitImages: mockVisitImages.filter((img) => img.visitId === 3),
    reactions: {
      fresh: 10,
      clean: 7,
    },
    likeCount: 3,
  },
];
// ----------------------------------------------------------------------
// 6. Comments (댓글)
// ----------------------------------------------------------------------
export const mockComments = [
  {
    id: 1,
    visitId: 1,
    userId: 2,
    content: "와 여기 분위기 진짜 좋아보이네요! 가격대는 어떤가요?",
    createdAt: "2024-01-20T13:00:00Z",
  },
  {
    id: 2,
    visitId: 1,
    userId: 1,
    content: "가격도 파스타 하나에 1.8만원 정도라 꽤 합리적이에요!",
    createdAt: "2024-01-20T13:10:00Z",
  },
  {
    id: 3,
    visitId: 1,
    userId: 3,
    content: "오 저도 이번 주말에 가봐야겠네요. 정보 감사합니다.",
    createdAt: "2024-01-20T14:00:00Z",
  },
  {
    id: 4,
    visitId: 2,
    userId: 1,
    content: "여기 웨이팅 길지 않나요?",
    createdAt: "2024-01-18T19:00:00Z",
  },
];
