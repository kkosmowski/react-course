import GoogleMapReact from 'google-map-react';
import styled from 'styled-components';
import { emit } from '../pages/map/mediator';

const gdanskPosition = {
  lat: 54.3478088,
  lng: 18.6598646,
};

const defaultZoom = 11;

export function GoogleMap() {
  // useEffect(() => {
  //   emit('mapLoaded', gdanskPosition);
  // }, [])

  return (
    <MapsWrapper>
      <GoogleMapReact
        bootstrapURLKeys={ { key: process.env.REACT_APP_GOOGLE_API_KEY } }
        defaultCenter={ gdanskPosition }
        defaultZoom={ defaultZoom }
        onChange={ event => emit('mapDragged', event.center) }
      >
      </GoogleMapReact>
    </MapsWrapper>
  )
}

const MapsWrapper = styled.div`
  width: 100%;
  height: 100%;
`;