import React, { useMemo, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import Like from "../common/like";

import { useContext } from "react";
import { DetailStateContext } from "../layout/map-layout";

import { useLoginState } from "../loginstate";
import { useRestaurantLikeStatus } from "../../hooks/queries/use-restaurants-data";
import {
  useLikeRestaurantMutation,
  useUnlikeRestaurantMutation,
} from "../../hooks/mutations/use-create-restaurant-mutation";

const RestaurantListCard = ({ restaurant }) => {
  const context = useContext(DetailStateContext);
  const navigate = useNavigate();
  const { user, isLoggedIn, isMe } = useLoginState();

  const { id, name, category, expertCount, address, thumbnail } = restaurant;
  const restaurantId = Number(id);

  const { data: isLikedFromApi = false } = useRestaurantLikeStatus({
    userId: isLoggedIn ? user?.id : null,
    restaurantId: restaurantId || null,
  });

  const [isLike, setIsLike] = useState(isLikedFromApi);

  useEffect(() => {
    setIsLike(isLikedFromApi);
  }, [isLikedFromApi]);

  const { mutate: likeRestaurant } = useLikeRestaurantMutation();
  const { mutate: unlikeRestaurant } = useUnlikeRestaurantMutation();

  const onLike = async (e) => {
    e?.stopPropagation?.();
    const isUser = await isMe();
    if (!isUser) {
      alert("로그인이 필요합니다.");
      navigate("/sign-in");
      return;
    }
    const userId = isUser.id;
    const newIsLike = !isLike;
    setIsLike(newIsLike);
    if (newIsLike) {
      likeRestaurant(
        { userId, restaurantId },
        {
          onError: () => {
            setIsLike(false);
            alert("좋아요 등록에 실패했습니다.");
          },
        },
      );
    } else {
      unlikeRestaurant(
        { userId, restaurantId },
        {
          onError: () => {
            setIsLike(true);
            alert("좋아요 취소에 실패했습니다.");
          },
        },
      );
    }
  };

  const displayIsLike = isLoggedIn ? isLike : false;

  const onRestaurantDetailClick = () => {
    context.setSelectedRestaurant(restaurant);
  };

  const getShortAddress = (address) => {
    if (!address) return "";
    const splitAddress = address.split(" ");
    return splitAddress.slice(0, 3).join(" ");
  };

  const Res_card = (
    <div className="flex max-w-sm bg-white rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
      {/* 🖼 썸네일 */}
      <div className="w-28 flex-shrink-0">
        <img
          src={
            thumbnail ||
            "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=400&q=80"
          }
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* 📄 내용 */}
      <div className="px-5 py-4 flex flex-col justify-center">
        {/* 카테고리 */}
        <div className="text-xs text-red-400 font-bold mb-1">{category}</div>

        {/* 이름 */}
        <div className="font-bold text-lg mb-1 text-gray-900">{name}</div>

        {/* 주소 + 고수 추천 */}
        <p className="text-gray-700 text-sm">
          📍 {getShortAddress(restaurant.address)}
          <br />
          <span className="inline-block mt-1 text-xs text-gray-500">
            🏆 고수 <b>{expertCount}명</b>이 인정했어요!
          </span>
        </p>
      </div>
    </div>
  );

  return (
    <div className="block w-full mb-6 relative">
      <div
        className="absolute top-2 right-2 z-10"
        onClick={(e) => e.stopPropagation()}
      >
        <Like isLike={displayIsLike} onLike={onLike} className="w-6 h-6" />
      </div>
      {!context ? (
        /* context가 없을 때: 상세 페이지로 이동하는 Link 사용 */
        <Link to={`/restaurants/${id}`} className="block w-full">
          {Res_card}
        </Link>
      ) : (
        /* context가 있을 때: 클릭 시 상태만 변경하는 div 사용 */
        <div onClick={onRestaurantDetailClick} className="cursor-pointer">
          {Res_card}
        </div>
      )}
    </div>
  );
};

export default RestaurantListCard;
