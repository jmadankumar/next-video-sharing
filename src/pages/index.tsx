import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import VideoCard from '../components/VideoCard';
import VideoService from '../service/video.service';
import { VideoDTO } from '../types/video';

interface HomeProps {
  videos: VideoDTO[];
}
const Home: React.FC<HomeProps> = ({ videos }) => {
  console.log(videos);
  return (
    <div>
      <Head>
        <title>Next Video Sharing</title>
      </Head>
      <div className="flex flex-wrap -mx-2">
        {videos.map((video) => (
          <div className="xs:w-full sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4 px-3" key={video.id}>
            <Link href={`/watch?v=${video.id}`}>
              <VideoCard videoDetail={video} className="cursor-pointer mb-8" />
            </Link>
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
