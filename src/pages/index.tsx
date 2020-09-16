import { GetServerSideProps } from 'next';
import Head from 'next/head';
import VideoCard from '../components/VideoCard';
import VideoThumbnail from '../components/VideoThumbnail';
import VideoService from '../service/video.service';
import styles from '../styles/Home.module.css';
import { VideoDTO } from '../types/video';

interface HomeProps {
  videos: VideoDTO[];
}
const Home: React.FC<HomeProps> = ({ videos }) => {
  console.log(videos);
  return (
    <div className="p-5 mt-16">
      <Head>
        <title>Next Video Sharing</title>
      </Head>
      <div className="flex -mx-4">
        {videos.map((video) => (
          <div className="w-1/4 px-2">
            <VideoCard videoDetail={video} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const videos = await VideoService.getAllVideo();
  return {
    props: { videos },
  };
};
