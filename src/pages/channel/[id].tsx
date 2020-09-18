import { useRouter } from 'next/dist/client/router';

const ChannelPage = () => {
  const router = useRouter();
  return <div>Channel {router.query.id}</div>;
};

export default ChannelPage;
