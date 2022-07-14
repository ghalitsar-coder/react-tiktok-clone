import React, { Dispatch, FormEvent, SetStateAction, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { GoVerified } from "react-icons/go";
import { NoResults } from "./";
import { useAuthStore } from "../store/authStore";
import { IUser } from "../types";

interface IProps {
  comment: string;
  isPostingComment: boolean;
  comments: IComment[];
  setComment: Dispatch<SetStateAction<string>>;
  addComment: (e: FormEvent) => void;
}

interface IComment {
  comments: any[];
  comment: string;
  length?: number;
  _key: string;
  postedBy: { _ref: string; _id: string };
}

const Comments = ({
  comments,
  comment,
  isPostingComment,
  setComment,
  addComment,
}: IProps) => {
  const { userProfile, allUsers } = useAuthStore();

  return (
    <div className="border-t-2 border-gray-200 pt-4 px-10 bg-[#f8f8f8] border-b-2 lg:pb-0 pb-[100px] w-full ">
      <div className="overflow-scroll lg:h-[475px] ">
        {comments?.length ? (
          comments.map((item, idx) => (
            <div key={idx}>
              {allUsers.map(
                (user: IUser) =>
                  user._id === (item.postedBy._id || item.postedBy._ref) && (
                    <div
                      className="p-2 items-center bg-white rounded-lg shadow-lg my-2 "
                      key={idx}
                    >
                      <Link
                        href={`/profile/${user._id}`}
                        className="cursor-pointer"
                      >
                        <div className="flex items-start gap-2 cursor-pointer">
                          <div className="w-8 h-8">
                            <Image
                              src={user.image}
                              width={34}
                              height={34}
                              className="rounded-full"
                              alt="user profile"
                              layout="responsive"
                            />
                          </div>
                          <div className="">
                            <p className="flex gap-1 items-center text-md font-bold text-primary lowercase ">
                              {user.userName.replaceAll(" ", "")}
                              <GoVerified className="text-sky-400" />
                            </p>
                            <p className=" hidden xl:block capitalize text-gray-400 text-xs">
                              {user.userName}
                            </p>
                          </div>
                        </div>
                      </Link>

                      <div className="mt-2">
                        <p className="font-[Poppins]">{item.comment}</p>
                      </div>
                    </div>
                  )
              )}
            </div>
          ))
        ) : (
          <NoResults text="No comments yet" type="comments" />
        )}
      </div>
      {userProfile && (
        <div className="absolute bottom-0 left-0 pb-6 px-2 md:px-10 w-full mt-3">
          <form onSubmit={addComment} className="flex gap-x-4 ">
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add Comment..."
              className="bg-primary px-6 py-4 text-md font-medium border-2 w-[250px] md:w-[400px] lg:w-[350px] border-gray-100 focus:outline-none focus:border-2 focus:border-gray-300  rounded-lg flex-[3] "
            />
            <button
              type="submit"
              className="text-md flex-1 px-2 rounded-lg text-gray-400 bg-slate-700"
            >
              {isPostingComment ? "Commenting..." : "Comment"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Comments;
