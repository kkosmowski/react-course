import { Input, Layout as AntLayout } from 'antd';
import { useEffect } from 'react';
import styled from 'styled-components';
import { useMapStore } from '../pages/map/store';
import { emit } from '../pages/map/mediator';

const { Header: AntHeader } = AntLayout;

export function Header() {
  const [{ googleApiLoaded }] = useMapStore();

  useEffect(() => {
    if (googleApiLoaded) {
      const input = document.getElementById('search-box');
      const searchBox = new window.google.maps.places.SearchBox(input);

      searchBox.addListener('places_changed', () => {
        const { location } = searchBox.getPlaces()[0].geometry;
        // TODO: Set the address as the input value
        emit('searchBoxPlacesSelected', location.toJSON());
      });
    }
  }, [googleApiLoaded]);

  return (
    <StyledHeader>
      <Logo>Wikipedia Map</Logo>
      <StyledInput />
    </StyledHeader>
  );
}

const StyledHeader = styled(AntHeader)`
  display: flex;
`;

const StyledInput = styled(Input).attrs({
  id: 'search-box',
  placeholder: 'Search address...',
  type: 'text',
})`
  margin: 10px;
  min-width: 200px;
  width: 30%;
  max-width: 400px;
`;

const Logo = styled.div`
  color: #fff;
`;
