import WikipediaAPI from '../../services/api/wikipedia';
import { useMapStore } from './store';

const listeners = {};
let map;

export function emit(event, ...args) {
  console.log(event, args);

  listeners[event](...args);
}

function attachListener(eventName, listener) {
  listeners[eventName] = listener;
}

function mapWikipediaArticlesToMarkers(articles) {
  return articles.map(({ lat, lon, pageid, title }) => ({
    lat,
    lng: lon,
    pageId: pageid,
    title,
  }));
}

function useMapMediator() {
  const [, { addMarkers, setGoogleApiLoaded }] = useMapStore();

  async function mapViewportChanged(center) {
    console.log('useMapMediator mapViewportChanged');
    const response = await WikipediaAPI.getArticles({ coords: center });
    const articles = mapWikipediaArticlesToMarkers(response.query.geosearch);
    addMarkers(articles);
  }

  async function mapLoaded(mapInstance) {
    map = mapInstance;
    console.log('useMapMediator mapLoaded', mapInstance);
    setGoogleApiLoaded(true);
  }

  async function searchBoxPlacesSelected(location) {
    console.log('useMapMediator searchBoxPlacesSelected', location);
    map.setCenter(location);
    // TODO: Set zoom to default level
    // map.setZoom(15);
  }

  attachListener('mapViewportChanged', mapViewportChanged);
  attachListener('mapLoaded', mapLoaded);
  attachListener('searchBoxPlacesSelected', searchBoxPlacesSelected);
}

export function MapMediator() {
  useMapMediator();

  return null;
}