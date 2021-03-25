import GoogleMapReact from 'google-map-react';
import styled from 'styled-components';
import { emit } from '../pages/map/mediator';
import Marker from './Marker';
import { useMapStore } from '../pages/map/store';
import mapStyles from './mapStyles';

const startingPosition = {
  lat: 52.231998,
  lng: 20.9773951,
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
        defaultCenter={ startingPosition }
        defaultZoom={ defaultZoom }
        onGoogleApiLoaded={ ({ map, maps }) => emit('mapLoaded', map) }
        options={ { styles: mapStyles } }
      >
        { markers.map(marker =>
          <Marker
            key={ marker.pageId }
            lat={ marker.lat }
            lng={ marker.lng }
            title={ marker.title }
            onClick={ () => emit('markerClicked', marker.title) }
            color={ marker.color }
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