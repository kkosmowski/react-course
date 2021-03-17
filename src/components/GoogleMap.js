import GoogleMapReact from 'google-map-react';
import styled from 'styled-components';
import WikipediaAPI from '../services/api/wikipedia';
import { useEffect } from 'react';

const gdanskPosition = {
  lat: 54.3478088,
  lng: 18.6598646,
};

const defaultZoom = 11;

export function GoogleMap() {
  useEffect(() => {
    async function fetchArticles() {
      const articles = await WikipediaAPI.getArticles({
        coords: gdanskPosition,
        radius: 10000,
        limit: 10,
      });
      console.log(articles);
    }

    fetchArticles();
  }, []);

  return (
    <MapsWrapper>
      <GoogleMapReact
        bootstrapURLKeys={ { key: process.env.REACT_APP_GOOGLE_API_KEY } }
        defaultCenter={ gdanskPosition }
        defaultZoom={ defaultZoom }
      >
      </GoogleMapReact>
    </MapsWrapper>
  )
}

const MapsWrapper = styled.div`
  width: 100%;
  height: 100%;
`;