import { Avatar, Button, Tab, Tabs, Typography } from '@material-ui/core';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import styled from 'styled-components';
import VideoCard from '../../components/VideoCard';
import ChannelService from '../../service/channel.service';
import { ChannelDTO } from '../../types/channel';
import ChannelCoverImage from './ChannelCoverImage';

const ChannelViewWrapper = styled.div`
  .channel-cover-image {
  }
  .channel-image {
    width: 80px;
    height: 80px;
  }
`;
interface ChannelViewProps {
  channel: ChannelDTO;
  isOwnChannel: boolean;
}

const ChannelView: React.FC<ChannelViewProps> = ({ channel, isOwnChannel }) => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const subscribe = (channelId: string) => async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();

    const { message, error } = await ChannelService.subscribe(channelId);

    if (error) {
      enqueueSnackbar(error);
    } else if (message) {
      enqueueSnackbar(message);
      router.push(`/channel/${channelId}`);
    }
  };

  return (
    <ChannelViewWrapper className="flex flex-col -m-6">
      <ChannelCoverImage src={channel.coverImageUrl || ''} />
      <div className="channel-info bg-white border-b border-gray-200">
        <div className="channel-info-container flex flex-row p-6  w-3/4 m-auto">
          <Avatar src={channel.imageUrl} className="channel-image" />
          <div className="flex flex-grow flex-col justify-center pl-8">
            <Typography variant="h5">{channel.name}</Typography>
            <div className="mb-2">
              <Typography
                variant="subtitle2"
                color="textSecondary"
                component="span"
                className="mr-3"
              >
                {channel.subscribers || 0} subscribers
              </Typography>
              <Typography variant="subtitle2" color="textSecondary" component="span">
                {channel.totalVideo || 0} videos
              </Typography>
            </div>

            {isOwnChannel && (
              <div>
                <Link href={`/feed/my_videos/customize`} passHref>
                  <Button
                    color="primary"
                    variant="contained"
                    disableElevation
                    size="small"
                    className="mr-3"
                    component="a"
                  >
                    Cutomize channel
                  </Button>
                </Link>
                <Link href={`/feed/my_videos/upload`} passHref>
                  <Button
                    color="primary"
                    variant="contained"
                    disableElevation
                    size="small"
                    component="a"
                  >
                    Upload Video
                  </Button>
                </Link>
              </div>
            )}
          </div>
          {!isOwnChannel && (
            <div className="flex items-center p-4">
              <Button
                color="secondary"
                variant="contained"
                disableElevation
                onClick={subscribe(channel.id)}
              >
                Subscribe
              </Button>
            </div>
          )}
        </div>
      </div>
      <div className="channel-videos w-3/4 m-auto">
        <Tabs value={0} indicatorColor="primary" textColor="primary" className="bg-white">
          <Tab label="Videos" />
        </Tabs>

        <div className="flex flex-wrap -mx-2 py-6">
          {channel?.videos &&
            channel.videos.map((video) => (
              <div className="xs:w-full sm:w-1/3 md:w-1/4 lg:w-1/4 xl:w-1/4 mx-4" key={video.id}>
                <Link href={`/watch?v=${video.id}`} passHref>
                  <a>
                    <VideoCard videoDetail={video} className="cursor-pointer mb-8" />
                  </a>
                </Link>
              </div>
            ))}
        </div>
      </div>
    </ChannelViewWrapper>
  );
};

export default ChannelView;
