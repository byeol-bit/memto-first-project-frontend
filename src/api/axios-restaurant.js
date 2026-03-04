import api from "./axios-basic";

/*
  식당 등록
  POST /restaurants (formData: name, address, ..., image 최대 5장)
*/
export const createRestaurant = async ({
  name,
  address,
  phone_number,
  category,
  latitude,
  longitude,
  kakao_place_id,
  images = [],
}) => {
  const form = new FormData();
  if (name != null) form.append("name", String(name));
  if (address != null) form.append("address", String(address));
  if (phone_number != null) form.append("phone_number", String(phone_number));
  if (category != null) form.append("category", String(category));
  if (kakao_place_id != null)
    form.append("kakao_place_id", String(kakao_place_id));
  if (latitude !== "" && latitude != null) {
    form.append("latitude", Number(latitude));
  }
  if (longitude !== "" && longitude != null) {
    form.append("longitude", Number(longitude));
  }

  const fileList = Array.isArray(images) ? images.slice(0, 5) : [];
  fileList.forEach((file) => {
    if (file && typeof file === "object" && file instanceof File) {
      form.append("image", file);
    }
  });

  const res = await api.post("/restaurants", form);
  return res;
};

/*
  모든 식당 조회
  GET /restaurants
*/
export const fetchRestaurants = async (params) => {
  const rawParams = params || {};

  const cleanedEntries = Object.entries(rawParams).filter(
    ([, value]) => value != null && value !== "",
  );

  if (cleanedEntries.length > 0) {
    const cleanedParams = Object.fromEntries(cleanedEntries);
    return await api.get("/restaurants", { params: cleanedParams });
  }

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

/*
  내가 좋아요한 맛집 목록
  GET /restaurants/liked?userId=
*/
export const fetchLikedRestaurants = async (userId) => {
  const res = await api.get("/restaurants/liked", {
    params: { userId },
  });
  return res;
};

/*
  맛집 이미지 목록 (파일 경로 전체 반환)
  GET /restaurants/{id}/image
*/
export const fetchRestaurantImages = async (restaurantId) => {
  try {
    const res = await api.get(`/restaurants/${restaurantId}/image`);
    const payload = res?.data ?? res;
    const list = Array.isArray(payload)
      ? payload
      : (payload?.images ?? payload?.data ?? []);

    return Array.isArray(list)
      ? list.filter((url) => url != null && String(url).trim())
      : [];
  } catch (error) {
    if (error?.response?.status !== 404) {
      console.error("맛집 이미지 조회 실패:", error);
    }
    return [];
  }
};
