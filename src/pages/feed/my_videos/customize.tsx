import {
  Avatar,
  Button,
  FormGroup,
  LinearProgress,
  TextField,
  Typography,
} from '@material-ui/core';
import { NextPage } from 'next';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import BackgroundImage from '../../../components/common/BackgroundImage';
import FileUploadButton from '../../../components/common/FileUploadButton';
import MainLayout from '../../../components/MainLayout';
import { readFile } from '../../../helper/file';
import getAuthenticationToken from '../../../helper/getAuthenticationToken';
import { redirect } from '../../../helper/route';
import withAuth from '../../../hocs/withAuth';
import LoggedUserService from '../../../service/logged-user.service';
import { RootState } from '../../../store';
import { setFeedChannel } from '../../../store/feed/actions';
import { FeedState } from '../../../store/feed/types';

const CustomizeChannelWrapper = styled.div`
  .profile-pic {
    width: 120px;
    height: 120px;
  }
  .cover-image {
    width: 400px;
    height: 225px;
  }
`;
interface FileField {
  url?: string | null;
  changed?: boolean | null;
  file?: File | null;
  upload?: boolean;
  uploadPercent?: number;
}
const CustomizeChannel: NextPage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { channel } = useSelector<RootState, FeedState>((state) => state.feedState);
  const [channelName, setChannelName] = useState('');
  const [profileImage, setProfileImage] = useState<FileField>({
    url: '',
    changed: false,
    file: null,
  });
  const [coverImage, setCoverImage] = useState<FileField>({
    url: '',
    changed: false,
    file: null,
  });

  useEffect(() => {
    if (channel) {
      setChannelName(channel.name);
      setProfileImage({
        ...profileImage,
        url: channel.imageUrl,
      });
      setCoverImage({ ...coverImage, url: channel.coverImageUrl });
    }
  }, [channel, setChannelName]);

  const onChannelNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChannelName(event.target.value);
  };

  const updateChannel = async () => {
    const { message, error } = await LoggedUserService.updateMyChannel({ name: channelName });
    if (message) {
      enqueueSnackbar(message);
    } else if (error) {
      enqueueSnackbar(error, { variant: 'error' });
    }
  };

  const handleProfileImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = event.target.files?.[0];
      if (file) {
        const result = await readFile(file);
        setProfileImage({
          url: result,
          changed: true,
          file,
        });
      }
    } catch (error) {}
  };

  const handleCoverImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = event.target.files?.[0];
      if (file) {
        const result = await readFile(file);
        setCoverImage({
          url: result,
          changed: true,
          file,
        });
      }
    } catch (error) {}
  };

  const updateProfileImage = async () => {
    const { changed, file } = profileImage;
    if (changed && file) {
      const { message, error } = await LoggedUserService.uploadProfileImage({
        file,
        onUploadProgress: (percent) => {
          console.log(percent);
          setProfileImage({ ...profileImage, upload: true, uploadPercent: percent });
        },
      });
      setProfileImage({
        ...profileImage,
        upload: false,
        uploadPercent: 0,
        changed: false,
        file: null,
      });
      if (message) {
        enqueueSnackbar(message);
      } else if (error) {
        enqueueSnackbar(error, { variant: 'error' });
      }
    }
  };

  const updateCoverImage = async () => {
    const { changed, file } = coverImage;
    if (changed && file) {
      const { message, error } = await LoggedUserService.uploadCoverImage({
        file,
        onUploadProgress: (percent) => {
          console.log(percent);
          setCoverImage({ ...coverImage, upload: true, uploadPercent: percent });
        },
      });
      setCoverImage({
        ...profileImage,
        upload: false,
        uploadPercent: 0,
        changed: false,
        file: null,
      });
      if (message) {
        enqueueSnackbar(message);
      } else if (error) {
        enqueueSnackbar(error, { variant: 'error' });
      }
    }
  };

  return (
    <MainLayout>
      <CustomizeChannelWrapper className="bg-white py-8 px-8">
        <div className="flex justify-between items-center">
          <Typography variant="h5" className="mb-5">
            Customize Channel
          </Typography>
        </div>
        <form>
          <FormGroup className="mb-5">
            <Typography className="font-bold mb-2" variant="subtitle2">
              Channel Name
            </Typography>
            <div className="flex flex-row items-center mb-5">
              <TextField
                variant="outlined"
                // label="Channel name"
                className="w-4/12 mr-5"
                id="channelName"
                name="channelName"
                value={channelName}
                onChange={onChannelNameChange}
              />
              <Button color="primary" variant="outlined" disableElevation onClick={updateChannel}>
                Save
              </Button>
            </div>
          </FormGroup>
          <FormGroup className="mb-5">
            <Typography className="font-bold mb-2" variant="subtitle2">
              Profile Pic
            </Typography>
            <div className="flex flex-row items-center">
              <Avatar src={profileImage.url || ''} className="profile-pic mr-5" />
              <div>
                {!profileImage.changed && (
                  <FileUploadButton
                    color="primary"
                    variant="outlined"
                    disableElevation
                    accept="image/*"
                    id="profile-image"
                    onChange={handleProfileImageChange}
                  >
                    Upload
                  </FileUploadButton>
                )}
                {profileImage.changed && (
                  <Button
                    color="primary"
                    variant="outlined"
                    disableElevation
                    onClick={updateProfileImage}
                  >
                    Save
                  </Button>
                )}
              </div>
            </div>
            {profileImage.upload && (
              <div>
                Uploading
                <LinearProgress variant="determinate" value={profileImage.uploadPercent} />{' '}
              </div>
            )}
          </FormGroup>
          <FormGroup className="mb-5">
            <Typography className="font-bold mb-2" variant="subtitle2">
              Cover image
            </Typography>
            <div className="flex flex-row items-center">
              <BackgroundImage src={coverImage.url || ''} className="cover-image mr-5" />
              <div>
                {!coverImage.changed && (
                  <FileUploadButton
                    color="primary"
                    variant="outlined"
                    disableElevation
                    accept="image/*"
                    id="cover-image"
                    onChange={handleCoverImageChange}
                  >
                    Upload
                  </FileUploadButton>
                )}
                {coverImage.changed && (
                  <Button
                    color="primary"
                    variant="outlined"
                    disableElevation
                    onClick={updateCoverImage}
                  >
                    Save
                  </Button>
                )}
              </div>
            </div>
            {coverImage.upload && (
              <div>
                Uploading
                <LinearProgress variant="determinate" value={coverImage.uploadPercent} />{' '}
              </div>
            )}
          </FormGroup>
        </form>
      </CustomizeChannelWrapper>
    </MainLayout>
  );
};

export default withAuth(CustomizeChannel, '/login');

CustomizeChannel.getInitialProps = async ({ req, res, store }) => {
  try {
    const authenticationToken = getAuthenticationToken(req);
    const { channel, error } = await LoggedUserService.getMyChannel(authenticationToken);
    if (!error && channel) {
      await store.dispatch(setFeedChannel(channel));
    }
  } catch (error) {
    redirect(res);
  }
};
