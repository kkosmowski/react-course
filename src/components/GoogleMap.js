import GoogleMapReact from 'google-map-react';
import styled from 'styled-components';
import { emit } from '../pages/map/mediator';
import Marker from './Marker';
import { useMapStore } from '../pages/map/store';

const gdanskPosition = {
  lat: 54.3478088,
  lng: 18.6598646,
};

const defaultZoom = 15;

export function GoogleMap() {
  const [{ markers }] = useMapStore();

  return (
    <MapsWrapper>
      <GoogleMapReact
        bootstrapURLKeys={ {
          key: process.env.REACT_APP_GOOGLE_API_KEY,
          libraries: ['places'],
        } }
        defaultCenter={ gdanskPosition }
        defaultZoom={ defaultZoom }
        onChange={ event => emit('mapViewportChanged', event.center) }
        onGoogleApiLoaded={ ({ map, maps }) => emit('mapLoaded', map) }
      >
        { markers.map(marker =>
          <Marker
            key={ marker.pageId }
            lat={ marker.lat }
            lng={ marker.lng }
            title={ marker.title }
            onClick={ () => emit('markerClicked', marker.title) }
          />)
        }
      </GoogleMapReact>
    </MapsWrapper>
  )
}

const MapsWrapper = styled.div`
  width: 100%;
  height: 100%;
`;