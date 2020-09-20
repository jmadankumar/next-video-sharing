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

interface GeVideoByIdResponse {
  video: VideoDTO;
}

const getVideoById = async (videoId: string): Promise<VideoDTO> => {
  const response = await API.get<GeVideoByIdResponse>(`/video/${videoId}`);
  return response.data.video;
};

const VideoService = {
  getAllVideo,
  getVideoById
};

export default VideoService;
