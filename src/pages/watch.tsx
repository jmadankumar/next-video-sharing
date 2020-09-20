import { GetServerSideProps } from 'next';
import Head from 'next/head';
import MainLayout from '../components/MainLayout';
import VideoPlayer from '../components/VideoPlayer/VideoPlayer';
import VideoService from '../service/video.service';
import { VideoDTO } from '../types/video';

interface WatchPageProps {
  video: VideoDTO;
}

const WatchPage: React.FC<WatchPageProps> = ({ video }) => {
  return (
    <MainLayout floatSideBar>
      <Head>
        <title>Watch</title>
      </Head>
      <div className="flex">
        <div className="xs:w-full sm:w-full md:w-full lg:w-8/12">
          <VideoPlayer src={video.videoUrl} poster={video.thumbnailUrl} />
        </div>
        <div></div>
      </div>
    </MainLayout>
  );
};

export default WatchPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { v: id } = context.query;
  const video = await VideoService.getVideoById(id as string);
  return {
    props: { video },
  };
};
