import { useRouter } from 'next/dist/client/router';

const Watch = () => {
  const router = useRouter();
  return <div>Watch {router.query.v}</div>;
};

export default Watch;
