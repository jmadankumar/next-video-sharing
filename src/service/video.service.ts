import API from '../helper/api';
import { VideoDTO } from '../types/video';

interface GetAllVideoResponse {
    videos: VideoDTO[];
    count: number;
  }

const getAllVideo = async (): Promise<VideoDTO[]> => {
  const response = await API.get<GetAllVideoResponse>('/video');
  return response.data.videos;
};

const VideoService = {
  getAllVideo,
};

export default VideoService;
