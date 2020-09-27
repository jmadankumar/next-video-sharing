import { AppBar, Avatar, Button, Paper, Tab, Tabs, Typography } from '@material-ui/core';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import styled from 'styled-components';
import VideoCard from '../../components/VideoCard';
import ChannelService from '../../service/channel.service';
import { ChannelDTO } from '../../types/channel';

const ChannelViewWrapper = styled.div`
  .channel-cover-image {
    height: 300px;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
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
    <ChannelViewWrapper className="flex flex-col">
      <div
        className="channel-cover-image"
        style={{
          backgroundImage: `url(${channel.coverImageUrl})`,
        }}
      ></div>
      <div className="channel-info flex flex-row p-6 bg-white">
        <Avatar src={channel.imageUrl} className="channel-image" />
        <div className="flex flex-grow flex-col justify-center pl-8">
          <Typography variant="h5">{channel.name}</Typography>
          <Typography variant="subtitle2" color="textSecondary">
            {channel.subscribers || 0} subscribers
          </Typography>
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
      <div className="channel-videos">
        <Paper square>
          <Tabs value={0} indicatorColor="primary" textColor="primary">
            <Tab label="Videos" />
          </Tabs>
        </Paper>

        <div className="flex flex-wrap p-8">
          {channel?.videos &&
            channel.videos.map((video) => (
              <div className="xs:w-full sm:w-1/3 md:w-1/4 lg:w-1/4 xl:w-1/6 px-3" key={video.id}>
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
