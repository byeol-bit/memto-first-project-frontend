import FollowButton from "./followButton";
import { useToggleFollow } from "../../hooks/mutations/use-create-user-mutation";
import { useContext } from "react";
import { DetailStateContext } from "../layout/map-layout";
import { useLoginState } from "../loginstate";
import { useNavigate } from "react-router";
import { userImg } from "../../api/user.api";
import { useCountFollower, useIsFollowing } from "../../hooks/queries/use-users-data";
import { useUserReviews } from "../../hooks/queries/use-reviews-data";

const FollowUserCard = ({ user }) => {

  const context = useContext(DetailStateContext);
  const navigate = useNavigate();

  const { isLoggedIn, user: isMe } = useLoginState();
  const { mutate: toggleFollow } = useToggleFollow();
  const { data: followerCount } = useCountFollower(user.id);
  const { data: isFollow } = useIsFollowing(user.id, isLoggedIn);
  const { data: userReview = [] } = useUserReviews(user.id)
  const handleFollowToggle = (e) => {
    if (!isLoggedIn) {
      alert("로그인이 필요합니다.");
      navigate("/sign-in");
      return;
    }

    toggleFollow({
      userId: user.id,
      isFollowing: isFollow,
    });
  };

  const handleCardClick = (selectedUser) => {
    context.setSelectedUser(selectedUser);
    context.setUserDetailView("detail");
  };
  // console.log(user, userImg(user.id), userImg);
  return (
  <div
    className="max-w-4xl mx-auto px-3 py-3 border-y border-gray-100 hover:bg-gray-50 cursor-pointer"
    onClick={() => handleCardClick(user)}
  >
    <div className="flex items-center gap-4">
      <img
        className="w-16 h-16 rounded-full object-cover shrink-0 shadow-md"
        src={userImg(user.id)}
        alt=""
      />

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 min-w-0">
          <span className="min-w-0 flex-1 font-semibold text-gray-900 truncate">
            {user.nickname}
          </span>
          <span className="shrink-0 whitespace-nowrap px-2 border border-red-400 rounded-full text-xs text-red-400">
            {user.category}
          </span>
        </div>

        <div className="mt-1 flex items-center gap-4 text-sm text-gray-400 whitespace-nowrap">
          <span>
            리뷰 <span className="font-medium">{userReview?.length ?? 0}</span>
          </span>
          <span>
            팔로워 <span className="font-medium">{followerCount ?? 0}</span>
          </span>
        </div>
      </div>

      <div className="shrink-0 whitespace-nowrap w-15">

        {user?.id !== isMe?.id && (
          <FollowButton
            isFollowing={isFollow}
            onToggle={handleFollowToggle}
          />
        )}
      </div>
      
    </div>
  </div>
);
};
export default FollowUserCard;