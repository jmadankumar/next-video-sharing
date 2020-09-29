import styled from 'styled-components';

const ChannelCoverImage = styled.div<{ src: string }>`
  height: 300px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  background-image: url(${(props) => props.src});
`;

export default ChannelCoverImage;
