export interface VideoChunkDTO {
  quality: string;
  sequenceNo: number;
  chunkUrl: string;
  contentLength: number;
}

export interface VideoDTO {
  id: string;
  userId: string;
  channelId: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  videoUrl: string;
  tags: Array<string>;
  category: string;
  totalChunk: number;
  chunkDetail: VideoChunkDTO[];
  duration: number;
  mimeType: string;
  codec: string;
  supprtedQuality: Array<string>;
  isLive: boolean;
  liveStartDate: Date;
  liveEndDate: Date;
  createdBy: string;
  createdDate?: Date;
  updatedBy: string;
  updatedDate?: Date;
  deleted?: boolean;
}
