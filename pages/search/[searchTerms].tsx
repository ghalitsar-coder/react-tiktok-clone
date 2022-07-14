import axios from "axios";
import { NoResults } from "../../components";
import React, { useState } from "react";
import { IUser, Video } from "../../types";
import { BASE_URL } from "../../utils";
import { useRouter } from "next/router";
import VideoCard from "../../components/VideoCard";
import { useAuthStore } from "../../store/authStore";
import Link from "next/link";
import Image from "next/image";
import { GoVerified } from "react-icons/go";

const Search = ({ data }: { data: Video[] }) => {
  const [currentActive, setCurrentActive] = useState("Accounts");
  const tab = ["Accounts", "Videos"];
  const activeTab = "border-b-2 border-black text-slate-900";
  const router = useRouter();
  const { searchTerms }: any = router.query;

  const { allUsers } = useAuthStore();
  const searchedAccounts = allUsers.filter((user: IUser) =>
    user.userName.toLowerCase().includes(searchTerms.toLowerCase())
  );

  return (
    <div className="w-full">
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
      {currentActive === "Accounts" ? (
        <div className="md:my-16">
          {searchedAccounts.length ? (
            searchedAccounts.map((user: IUser, idx: number) => (
              <Link
                key={idx}
                href={`/profile/${user._id}`}
                className="cursor-pointer"
              >
                <div className="flex items-center shadow-md rounded-lg p-3 my-7 gap-x-2 cursor-pointer">
                  <div>
                    <Image
                      src={user.image}
                      width={50}
                      height={50}
                      className="rounded-full"
                      alt="user profile"
                    />
                  </div>
                  <div className="">
                    <p className="flex gap-1 items-center text-md font-bold text-primary lowercase ">
                      {user.userName.replaceAll(" ", "")}
                      <GoVerified className="text-sky-400" />
                    </p>
                    <p className=" capitalize text-gray-400 text-xs">
                      {user.userName}
                    </p>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <NoResults
              text={`No ${currentActive} Results for ${searchTerms} `}
              type="search"
            />
          )}
        </div>
      ) : (
        <div className="md:mt-16 flex flex-wrap gap-6 md:justify-start  ">
          {data.length ? (
            data.map((item: Video, idx: number) => (
              <VideoCard post={item} key={idx} />
            ))
          ) : (
            <NoResults
              text={`No ${currentActive} results for ${searchTerms} `}
              type="videos"
            />
          )}
        </div>
      )}
    </div>
  );
};

export const getServerSideProps = async ({
  params: { searchTerms },
}: {
  params: { searchTerms: string };
}) => {
  const res = await axios.get(`${BASE_URL}/api/search/${searchTerms}`);
  return {
    props: { data: res.data },
  };
};

export default Search;
