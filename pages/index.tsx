import axios from "axios";
import type { NextPage } from "next";
import NoResults from "../components/NoResults";
import VideoCard from "../components/VideoCard";
import { Video } from "../types";
import { BASE_URL } from "../utils";

interface IProps {
  videos: Video[];
}

const Home = ({ videos }: IProps) => {
  return (
    <div className="flex flex-col gap-10 videos h-full">
      {videos.length ? (
        videos.map((video: Video) => <VideoCard post={video} key={video._id} />)
      ) : (
        <NoResults text="No Videos" type="videos" />
      )}
    </div>
  );
};
export const getServerSideProps = async ({
  query: { topic },
}: {
  query: { topic: string };
}) => {
  const { data } = await axios.get(
    topic ? `${BASE_URL}/api/discover/${topic}` : `${BASE_URL}/api/post`
  );
  return {
    props: {
      videos: data,
      fallback: false,
    },
  };
};

export default Home;
