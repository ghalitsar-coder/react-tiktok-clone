import React, { useEffect, useState } from "react";

import Image from "next/image";
import VideoCard from "../../components/VideoCard";
import { NoResults } from "../../components";
import { BASE_URL } from "../../utils";
import axios from "axios";
import { IUser, Video } from "../../types";
import { GoVerified } from "react-icons/go";

interface IProps {
  data: {
    user: IUser;
    userVideos: Video[];
    userLikedVideos: Video[];
  };
}

const Profile = ({ data }: IProps) => {
  const { user, userVideos, userLikedVideos } = data;
  const [videosList, setVideosList] = useState<Video[]>([]);
  const [currentActive, setCurrentActive] = useState("Videos");
  const tab = ["Videos", "Liked Videos"];
  const activeTab = "border-b-2 border-black text-slate-900";
  useEffect(() => {
    if (currentActive === "Videos") {
      setVideosList(userVideos);
    } else {
      setVideosList(userLikedVideos);
    }
  }, [currentActive, userLikedVideos, userVideos]);

  console.log(videosList);
  return (
    <div className="w-full">
      <div className="flex items-center gap-2 md:gap-5 mb-4 bg-white w-full ">
        <div className="w-16 h-16 md:w-24 md:h-24 ">
          <Image
            src={user?.image}
            width={100}
            height={100}
            className="rounded-full"
            alt="user profile"
            layout="responsive"
          />
        </div>
        <div className="">
          <p className=" text-2xl flex gap-1 items-center text-md font-bold text-primary lowercase tracking-wider">
            {user?.userName.replaceAll(" ", "")}
            <GoVerified className="text-sky-400" />
          </p>
          <p className="capitalize  md:text-lg text-gray-400 text-xs">
            {user?.userName}
          </p>
        </div>
      </div>
      <div className="">
        <div className="flex gap-6 mb-10 mt-10 border-b-2 border-gray-200 bg-white w-full ">
          {tab.map((item) => (
            <p
              key={item}
              className={`text-xl font-semibold cursor-pointer mt-2 ${
                item === currentActive && activeTab
              } text-gray-500 `}
              onClick={() => setCurrentActive(item)}
            >
              {item}
            </p>
          ))}
        </div>

        <div className="flex flex-col gap-6 flex-wrap md:justify-start">
          {videosList.length ? (
            videosList.map((video: Video, idx: number) => (
              <VideoCard post={video} key={idx} />
            ))
          ) : (
            <NoResults text={`No ${currentActive} Yet`} type="videos" />
          )}
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const res = await axios.get(`${BASE_URL}/api/profile/${id}`);
  return {
    props: { data: res.data },
  };
};

export default Profile;
