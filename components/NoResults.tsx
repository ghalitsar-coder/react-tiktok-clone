import React from "react";
import { MdOutlineVideocamOff } from "react-icons/md";
import { BiCommentX } from "react-icons/bi";
import { useAuthStore } from "../store/authStore";
interface IProps {
  text: string;
  type: string;
}

const NoResults = ({ text, type }: IProps) => {
  return (
    <div className="grid place-items-center w-full h-full">
      <p className="text-8xl">
        {type === "comments" ? <BiCommentX /> : <MdOutlineVideocamOff />}
      </p>
      <p className="text-2xl text-center">{text}</p>
    </div>
  );
};

export default NoResults;
