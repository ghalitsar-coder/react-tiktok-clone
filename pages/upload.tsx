import { SanityAssetDocument } from "@sanity/client";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { useAuthStore } from "../store/authStore";
import { BASE_URL } from "../utils";
import { client } from "../utils/client";
import { topics } from "../utils/constants";

const Upload = () => {
  const { userProfile }: { userProfile: any } = useAuthStore();
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [videoAsset, setVideoAsset] = useState<SanityAssetDocument | undefined>(
    undefined
  );
  const [wrongFileType, setWrongFileType] = useState<Boolean>(false);
  const [caption, setCaption] = useState("");
  const [category, setCategory] = useState(topics[0].name);
  const [savingPost, setSavingPost] = useState<Boolean>(false);

  const router = useRouter();
  const uploadVideo = async (e: any) => {
    const selectedFile = e.target.files[0];
    const fileTypes = ["video/mp4", "video/webm", "video/ogg"];
    setIsLoading(true);

    if (!fileTypes.includes(selectedFile.type)) {
      setWrongFileType(true);
    } else {
      client.assets
        .upload("file", selectedFile, {
          contentType: selectedFile.type,
          filename: selectedFile.name,
        })
        .then((res) => {
          setVideoAsset(res);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handlePost = async (e: any) => {
    if (caption && videoAsset?._id && category) {
      setSavingPost(true);
      const document = {
        _type: "post",
        caption,
        video: {
          _type: "file",
          asset: {
            _type: "reference",
            _ref: videoAsset?._id,
          },
        },
        userId: userProfile?._id,
        postedBy: {
          _type: "postedBy",
          _ref: userProfile?._id,
        },
        topic: category,
      };

      await axios.post(`${BASE_URL}/api/post`, document);
      alert("heelo");
      router.push("/");
    }
  };

  const handleDiscard = () => {
    setSavingPost(false);
    setVideoAsset(undefined);
    setCaption("");
    setCategory("");
  };
  return (
    <div className="flex w-full h-full absolute left-0 top-[60px] mb-10 pt-10 lg:pt-20 bg-[#f8f8f8] justify-center ">
      <div className="bg-white rounded-lg xl:h-[80vh] flex gap-6 flex-wrap w-[60%] justify-between  p-14 pt-6 items-center ">
        <div className="">
          <div className="">
            <p className="text-2xl font-bold">Upload Video</p>
            <p className="text-md text-gray-400 mt-1">
              Post a video to your account
            </p>
          </div>
          <div className="border-dashed rounded-xl border-4 border-gray-200 flex flex-col justify-center items-center outline-none mt-10 w-[260px] h-[460px] p-10 cursor-pointer hover:border-red-300 hover:bg-gray-100 ">
            {isLoading ? (
              <div className="flex">
                <p className="m-auto text-2xl font-semibold font-[Poppins]">
                  Uploading...
                </p>
              </div>
            ) : (
              <div className="">
                {videoAsset ? (
                  <div className="">
                    <video
                      src={videoAsset.url}
                      loop
                      controls
                      className="rounded-xl h-[450px] mt-16 bg-black "
                    ></video>
                  </div>
                ) : (
                  <label htmlFor="upload-video" className="cursor-pointer">
                    <div className="flex flex-col items-center justify-center h-full min-h-max ">
                      <div className="flex flex-col items-center justify-center ">
                        <p className="font-bold text-xl">
                          <FaCloudUploadAlt className="text-gray-300 text-6xl" />
                        </p>
                        <p className="text-xl font-semibold">Upload video</p>
                      </div>
                      <p className="text-gray-400 text-center mt-10 text-sm leading-10">
                        MP4 or WebM or ogg <br />
                        720x1280 or higher <br />
                        Up to 10 minutes <br />
                        Less than 2gb
                      </p>
                      <p className="bg-[#f51997] text-center mt-10 rounded text-white text-md font-medium p-2 w-52 outline-none ">
                        Select file
                      </p>
                    </div>
                    <input
                      type="file"
                      name="upload-video"
                      className="w-0 h-0"
                      onChange={uploadVideo}
                      id="upload-video"
                    />
                  </label>
                )}
              </div>
            )}
            {wrongFileType && (
              <p className="text-center text-xl text-red-400 font-semibold mt-4 w-[250px]">
                Please select a video file
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-3 pb-10">
          <label htmlFor="" className="text-md font-medium">
            Caption
          </label>
          <input
            type="text"
            value={caption}
            name="caption"
            onChange={(e) => setCaption(e.target.value)}
            className="rounded text-md border-2 border-gray-200 p-2 "
          />
          <label htmlFor="" className="text-md font-medium">
            Choose a Category
          </label>
          <select
            name="category"
            value={category}
            id=""
            onChange={(e) => setCategory(e.target.value)}
            className="outline-none border-2 border-gray-200 text-md capitalize lg:p-4 p-2 rounded cursor-pointer "
          >
            {topics.map((topic) => (
              <option
                key={topic.name}
                className="outline-none capitalize bg-white text-gray-400 text-md p-2 hover:bg-slate-300 "
                value={topic.name}
              >
                {topic.name}
              </option>
            ))}
          </select>
          <div className="flex gap-6 mt-10">
            <button
              onClick={() => {}}
              type="button"
              className="border-gray-300 border-2 text-md font-medium p-2 rounded w-28 lg:w-44 outline-none"
            >
              Discard
            </button>
            <button
              onClick={handlePost}
              type="button"
              className="bg-[#f51997] text-white text-md font-medium p-2 rounded w-28 lg:w-44 outline-none"
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;
