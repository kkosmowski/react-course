import styled from 'styled-components';
import { Tooltip } from 'antd';

export default function Marker({ title, onClick }) {
  return (
    <Tooltip title={ title }>
      <Circle onClick={ onClick } />
    </Tooltip>
  );
}

const Circle = styled.div`
  background-image: radial-gradient(#32a8f6dd, #0978c3);
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 3px solid #fff;
  box-shadow: 0 0 8px 0 #0006, 0 0 4px 0 #0002;
  opacity: 0.7;
  cursor: pointer;
  transform: scale(0.85);
  transition: transform 0.075s ease-in-out, opacity 0.075s ease-in-out;
  will-change: transform, opacity;

  &:hover {
    transform: scale(1);
    opacity: 1;
  }
`;