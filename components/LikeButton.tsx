import React, { useEffect, useState } from "react";
import { MdFavorite } from "react-icons/md";
import { useAuthStore } from "../store/authStore";

interface IProps {
  handleLike: () => void;
  handleDisLike: () => void;
  likes: any[];
}

const LikeButton = ({ handleLike, handleDisLike, likes }: IProps) => {
  const [alreadyLiked, setAlreadyLiked] = useState(false);
  const { userProfile }: any = useAuthStore();
  const filteredLikes = likes?.find((item) => item._ref === userProfile?._id);

  useEffect(() => {
    if (filteredLikes) {
      setAlreadyLiked(true);
    } else {
      setAlreadyLiked(false);
    }
  }, [filteredLikes, likes]);

  return (
    <div className="flex gap-6">
      <div className="mt-4 flex flex-col justify-center items-center cursor-pointer  ">
        {alreadyLiked ? (
          <div
            className="bg-primary rounded-full p-2 md:p-4 text-[#f51997]"
            onClick={handleDisLike}
          >
            <MdFavorite className="text-lg md:text-2xl" />
          </div>
        ) : (
          <div
            className="bg-primary rounded-full p-2 md:p-4 text-black"
            onClick={handleLike}
          >
            <MdFavorite className="text-lg md:text-2xl" />
          </div>
        )}

        <p className="text-md font-semibold">{likes?.length || 0} </p>
      </div>
    </div>
  );
};

export default LikeButton;
