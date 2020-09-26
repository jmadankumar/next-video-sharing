export interface ChannelDTO {
  id: string;
  name: string;
  description: string;
  coverImageUrl?: string;
  imageUrl?: string;
  createdBy: string;
  updatedBy: string;
  ownerId: string;
}
