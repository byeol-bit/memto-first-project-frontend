import api from "./axios-basic";

/*
  리뷰 등록
  POST /visits
*/
export const createReview = async ({
  userId,
  restaurantId,
  visitDate,
  review,
}) => {
  return await api.post("/visits", {
    userId,
    restaurantId,
    visitDate,
    review,
  });
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
