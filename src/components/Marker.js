import styled from 'styled-components';
import { Tooltip } from 'antd';

export default function Marker({ title }) {
  return (
    <Tooltip title={ title }>
      <Circle />
    </Tooltip>
  );
}

const Circle = styled.div`
  background-image: radial-gradient(#32a8f6dd, #0978c3);
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid #fff;
  box-shadow: 0 0 8px 0 #0006, 0 0 3px 0 #0002;
  opacity: 0.7;
  cursor: pointer;
  transition: transform 0.15s ease-in-out;
  will-change: transform;

  &:hover {
    transform: scale(1.25);
  }
`;