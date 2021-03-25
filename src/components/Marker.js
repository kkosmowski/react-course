import styled from 'styled-components';
import { Tooltip } from 'antd';

export default function Marker({ title, onClick, color }) {
  return (
    <Tooltip title={ title }>
      <Circle onClick={ onClick } color={ color } />
    </Tooltip>
  );
}

Marker.defaultProps = {
  color: 'orange'
}

const colors = {
  orange: '#ff7b23e0',
  blue: '#23deffe0',
};

const Circle = styled.div`
  background-color: ${ ({ color }) => colors[color] };
  width: 28px;
  height: 28px;
  border-radius: 50%;
  box-shadow: 0 0 8px 0 #0006, 0 0 4px 0 #0002, inset 0 0 4px 0 #0004;
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