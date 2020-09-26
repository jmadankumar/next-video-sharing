import API from '../helper/api';
import { ChannelDTO } from '../types/channel';
import qs from 'qs';
import { VideoDTO } from '../types/video';

interface SearchResultResponse {
  channels: ChannelDTO[];
  videos: VideoDTO[];
}

interface SearchResultOption {
  query?: string;
  page?: number;
  size?: number;
}

const getSearchResult = async (options: SearchResultOption): Promise<SearchResultResponse> => {
  const queryString = qs.stringify({
    query: options.query,
    p: options.page,
    s: options.size,
  });
  const response = await API.get<SearchResultResponse>(`/search?${queryString}`);
  return response.data;
};

const SearchService = {
  getSearchResult,
};

export default SearchService;
