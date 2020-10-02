import styled from 'styled-components';

const BackgroundImage = styled.div<{ src: string }>`
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  background-image: url(${(props) => props.src});
`;

export default BackgroundImage;
