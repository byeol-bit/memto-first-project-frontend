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
  const hasImages = Array.isArray(images) && images.length > 0;

  if (hasImages) {
    const form = new FormData();
    form.append("userId", userId ?? "");
    form.append("restaurantId", String(restaurantId));
    form.append("visit_date", date);
    form.append("review", review ?? "");
    images.forEach((file, i) => form.append("images", file));
    // axios가 FormData를 감지해서 boundary 포함한 Content-Type을 자동으로 세팅하도록 둔다
    return await api.post("/visits", form);
  }

  return await api.post("/visits", {
    userId,
    restaurantId,
    visit_date: date,
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
