// src/data/mockData.js

// 1. Users (사용자)
export const mockUsers = [
  {
    id: 1,
    nickname: "맛집탐험가",
    profileImage:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
    introduction: "서울 곳곳의 숨은 맛집을 찾아다니는 맛집 전문가입니다.",
    category: "동네맛집고수",
    createdAt: "2024-01-01T10:00:00Z",
    updatedAt: "2024-01-01T10:00:00Z",
  },
  {
    id: 2,
    nickname: "먹방러버",
    profileImage:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
    introduction: "유튜브에서 먹방을 하는 푸드 크리에이터입니다.",
    category: "먹방유투버",
    createdAt: "2024-01-02T10:00:00Z",
    updatedAt: "2024-01-02T10:00:00Z",
  },
  {
    id: 3,
    nickname: "푸드파이터",
    profileImage:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100",
    introduction: "대식가로서 다양한 음식을 도전하는 푸드파이터입니다.",
    category: "푸드파이터",
    createdAt: "2024-01-03T10:00:00Z",
    updatedAt: "2024-01-03T10:00:00Z",
  },
];

// 2. Restaurants (맛집) - ERD 컬럼명 반영 (phoneNumber, latitude 등)
export const mockRestaurants = [
  {
    id: 1,
    name: "맛있는 파스타집",
    address: "서울특별시 강남구 테헤란로 123",
    phoneNumber: "02-1234-5678", // phone -> phoneNumber
    category: "양식",
    latitude: 37.5665, // lat -> latitude
    longitude: 126.978, // lng -> longitude
    kakaoPlaceId: "12345678",
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-20T10:00:00Z",
    // [Frontend 편의용] 실제 DB 컬럼은 아니지만, 목록에 뿌릴 때 썸네일이 필요하므로 Join된 결과라고 가정
    thumbnail:
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400",
    visitCount: 15,
    expertCount: 3,
    tags: ["데이트코스", "파스타맛집"],
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
      "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=400",
    visitCount: 23,
    expertCount: 5,
    tags: ["상견례", "가성비", "회식장소"],
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
      "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400",
    visitCount: 31,
    expertCount: 7,
    tags: ["신선함", "가성비", "회식장소"],
  },
];

// 3. RestaurantImages (맛집 이미지) - 별도 테이블 분리
export const mockRestaurantImages = [
  {
    id: 1,
    restaurantId: 1,
    imageUrl: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400",
    displayOrder: 1,
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z",
  },
  {
    id: 2,
    restaurantId: 2,
    imageUrl:
      "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=400",
    displayOrder: 1,
    createdAt: "2024-01-10T10:00:00Z",
    updatedAt: "2024-01-10T10:00:00Z",
  },
];

// 4. Visits (방문 기록) - ERD 컬럼명 반영 (visitDate, review 등)
export const mockVisits = [
  {
    id: 1,
    userId: 1,
    restaurantId: 1,
    visitDate: "2024-01-20T12:00:00Z", // visitedAt -> visitDate
    review: "정말 맛있는 파스타였어요! 크림 파스타가 특히 일품이었습니다.", // content -> review
    createdAt: "2024-01-20T12:30:00Z",
    updatedAt: "2024-01-20T12:30:00Z",
    // [Frontend 편의용] Join된 데이터 포함
    user: mockUsers[0],
    restaurant: mockRestaurants[0],
    visitImages: [
      // 아래 mockVisitImages에서 가져온 것이라고 가정
      {
        id: 1,
        imageUrl:
          "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400",
      },
      {
        id: 2,
        imageUrl:
          "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400",
      },
    ],
  },
  {
    id: 2,
    userId: 2,
    restaurantId: 1,
    visitDate: "2024-01-18T18:00:00Z",
    review:
      "데이트 코스로 완벽한 곳이에요! 로맨틱한 분위기와 맛있는 음식이 조화를 이뤄서 정말 만족스러웠습니다.",
    createdAt: "2024-01-18T18:30:00Z",
    updatedAt: "2024-01-18T18:30:00Z",
    user: mockUsers[1],
    restaurant: mockRestaurants[0],
    visitImages: [
      {
        id: 3,
        imageUrl:
          "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400",
      },
    ],
  },
  {
    id: 3,
    userId: 3,
    restaurantId: 2,
    visitDate: "2024-01-22T13:00:00Z",
    review:
      "전통 한정식의 진수를 맛볼 수 있는 곳입니다. 각 반찬 하나하나가 정성스럽고 맛있어서 놀랐어요.",
    createdAt: "2024-01-22T13:30:00Z",
    updatedAt: "2024-01-22T13:30:00Z",
    user: mockUsers[2],
    restaurant: mockRestaurants[1],
    visitImages: [
      {
        id: 4,
        imageUrl:
          "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=400",
      },
      {
        id: 5,
        imageUrl:
          "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400",
      },
    ],
  },
];

// 5. VisitImages (방문 인증샷) - 별도 테이블 분리
export const mockVisitImages = [
  {
    id: 1,
    visitId: 1,
    imageUrl: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400",
    displayOrder: 1,
    createdAt: "2024-01-20T12:30:00Z",
    updatedAt: "2024-01-20T12:30:00Z",
  },
  {
    id: 2,
    visitId: 1,
    imageUrl:
      "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400",
    displayOrder: 2,
    createdAt: "2024-01-20T12:30:00Z",
    updatedAt: "2024-01-20T12:30:00Z",
  },
  // ... 나머지 이미지들
];
