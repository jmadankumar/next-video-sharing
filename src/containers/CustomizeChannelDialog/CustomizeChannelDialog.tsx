import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  FormGroup,
  FormLabel,
  TextField,
  Typography,
} from '@material-ui/core';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import BackgroundImage from '../../components/common/BackgroundImage';
import DialogTitle from '../../components/common/Dialog/DialogTitle';
import { RootState } from '../../store';
import { hideCustomizeChannelDialog } from '../../store/feed/actions';
import { FeedState } from '../../store/feed/types';

const CustomizeChannelDialogWrapper = styled(Dialog)`
  .profile-pic {
    width: 120px;
    height: 120px;
  }
  .cover-image {
    width: 400px;
    height: 225px;
  }
`;
const CustomizeChannelDialog: React.FC = () => {
  const dispatch = useDispatch();
  const { openCustomizeChannelDialog, channel } = useSelector<RootState, FeedState>(
    (state) => state.feedState,
  );

  const handleClose = () => {
    dispatch(hideCustomizeChannelDialog());
  };

  return (
    <CustomizeChannelDialogWrapper
      open={openCustomizeChannelDialog}
      onClose={handleClose}
      fullWidth
      maxWidth="md"
    >
      <DialogTitle title=" Cutomize Channel" onClose={handleClose} />
      <DialogContent>
        <form>
          <FormGroup className="mb-5">
            <Typography className="font-bold mb-2" variant="subtitle2">
              Channel Name
            </Typography>
            <TextField
              variant="outlined"
              // label="Channel name"
              className="w-4/12 mb-5"
              id="channelName"
              name="channelName"
              value={channel?.name}
            />
          </FormGroup>
          <FormGroup className="mb-5">
            <Typography className="font-bold mb-2" variant="subtitle2">
              Profile Pic
            </Typography>
            <div className="flex flex-row items-center">
              <Avatar src={channel?.imageUrl} className="profile-pic mr-5" />
              <div>
                <Button color="primary" variant="outlined" disableElevation>
                  Upload
                </Button>
              </div>
            </div>
          </FormGroup>
          <FormGroup className="mb-5">
            <Typography className="font-bold mb-2" variant="subtitle2">
              Cover image
            </Typography>
            <div className="flex flex-row items-center">
              <BackgroundImage src={channel?.coverImageUrl || ''} className="cover-image mr-5" />
              <div>
                <Button color="primary" variant="outlined" disableElevation>
                  Upload
                </Button>
              </div>
            </div>
          </FormGroup>
        </form>
      </DialogContent>
      <DialogActions className="p-4">
        <Button color="primary" disableElevation>
          Cancel
        </Button>
        <Button color="primary" disableElevation>
          Upload
        </Button>
      </DialogActions>
    </CustomizeChannelDialogWrapper>
  );
};

export default CustomizeChannelDialog;
