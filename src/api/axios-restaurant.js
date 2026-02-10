import api from "./axios-basic";

/* 
  식당 등록
  POST /restaurants 
*/
export const createRestaurant = async ({
  name,
  address,
  phone_number,
  category,
  latitude,
  longitude,
  kakao_place_id,
}) => {
  const payload = {
    name,
    address,
    phone_number,
    category,
    kakao_place_id,
  };

  if (latitude !== "" && latitude != null) {
    payload.latitude = Number(latitude);
  }

  if (longitude !== "" && longitude != null) {
    payload.longitude = Number(longitude);
  }

  const res = await api.post("/restaurants", payload);
  return res;
};

/*
  모든 식당 조회
  GET /restaurants
*/
export const fetchRestaurants = async () => {
  return await api.get("/restaurants");
};

/*
  식당 검색
  GET /restaurants/search?q=&category=
*/
export const searchRestaurants = async ({ q, category }) => {
  const params = {};
  if (q) params.q = q;
  if (category) params.category = category;

  return await api.get("/restaurants/search", { params });
};

/*
  카카오 API 맛집 검색
  GET /restaurants/kakao?q=
*/
export const searchKakaoRestaurants = async (q) => {
  return await api.get("/restaurants/kakao", { params: { q } });
};

/*
  특정 식당 조회 (⚠️ kakaoId 사용)
  GET /restaurants/{id}
*/
export const fetchRestaurantKakaoId = async (kakaoId) => {
  return await api.get(`/restaurants/${kakaoId}`);
};

/*
  좋아요 등록
  POST /restaurants/likes
*/
export const likeRestaurant = async ({ userId, restaurantId }) => {
  return await api.post("/restaurants/likes", { userId, restaurantId });
};

/*
  좋아요 삭제
  DELETE /restaurants/likes
*/
export const unlikeRestaurant = async ({ userId, restaurantId }) => {
  return await api.delete("/restaurants/likes", {
    data: { userId, restaurantId },
  });
};

/*
  좋아요 상태 확인
  GET /restaurants/likes/status
*/
export const fetchLikeStatus = async ({ userId, restaurantId }) => {
  return await api.get("/restaurants/likes/status", {
    params: { userId, restaurantId },
  });
};
