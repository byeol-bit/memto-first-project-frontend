import api from "./axios-basic";

/*
  리뷰 등록
  POST /visits
*/
export const createReview = async ({
  userId,
  restaurantId,
  visitDate,
  visit_date,
  review,
  images = [],
}) => {
  const date = visit_date ?? visitDate ?? new Date().toISOString().slice(0, 10);
  const form = new FormData();
  if (userId != null) form.append("userId", String(userId));
  if (restaurantId != null) form.append("restaurantId", String(restaurantId));
  form.append("visit_date", date);
  if (review != null) form.append("review", review);

  if (Array.isArray(images)) {
    images.forEach((file) => {
      if (file) form.append("image", file);
    });
  }

  return await api.post("/visits", form);
};

/*
  모든 리뷰 조회
  GET /visits
*/
export const fetchReviews = async (params) => {
  return await api.get("/visits", { params: params || {} });
};

/*
  유저 기반 리뷰 조회
  GET /visits/:userId
*/
export const fetchUserReviews = async (userId) => {
  // console.log("API", userId, cursor)
  return await api.get("/visits", { params: { userId } });
};

/*
  식당 기반 리뷰 조회
  GET /visits/:restaurantId
*/
export const fetchRestaurantReviews = async (restaurantId) => {
  return await api.get("/visits", {
    params: { restaurant_id: restaurantId },
  });
};

/*
  리뷰 좋아요
  POST /visits/likes
*/
export const likeReview = async ({ userId, visitId }) => {
  return await api.post("/visits/likes", { userId, visitId });
};

/*
  리뷰 좋아요 취소
  DELETE /visits/likes
*/
export const unlikeReview = async ({ userId, visitId }) => {
  return await api.delete("/visits/likes", {
    data: { userId, visitId },
  });
};

/*
  리뷰 좋아요 상태
  GET /visits/likes/status
*/
export const fetchReviewLikeStatus = async ({ userId, visitId }) => {
  return await api.get("/visits/likes/status", {
    params: { userId, visitId },
  });
};

/*
  리뷰 수정 (내용만)
  PATCH /visits/{id}
  수정 가능: visit_date, review, image_urls — 여기서는 review(텍스트)만 전송
*/
export const updateReview = async (visitId, { review }) => {
  const res = await api.patch(`/visits/${visitId}`, { review });
  return res;
};

/*
  리뷰 삭제
  DELETE /visits/{id}
*/
export const deleteReview = async (visitId) => {
  const res = await api.delete(`/visits/${visitId}`);
  return res;
};

/*
  리뷰 이미지 목록
  GET /visits/{id}/image
  응답 예시:
  { success: true, images: ["https://.../a.webp", "..."] }
*/
export const fetchReviewImages = async (visitId) => {
  const res = await api.get(`/visits/${visitId}/image`);
  const payload = res?.data ?? res;
  const list = payload?.images ?? [];
  return Array.isArray(list)
    ? list.filter((url) => url != null && String(url).trim())
    : [];
};
