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
  const [, { addMarkers, setGoogleApiLoaded, setModalVisible, setCurrentArticle }] = useMapStore();

  async function mapViewportChanged(center) {
    console.log('useMapMediator mapViewportChanged');
    const response = await WikipediaAPI.getArticles({ coords: center });
    const articles = mapWikipediaArticlesToMarkers(response.query.geosearch);
    addMarkers(articles);
  }

  function mapLoaded(mapInstance) {
    map = mapInstance;
    console.log('useMapMediator mapLoaded', mapInstance);
    setGoogleApiLoaded(true);
  }

  function searchBoxPlacesSelected(location) {
    console.log('useMapMediator searchBoxPlacesSelected', location);
    map.setCenter(location);
    // TODO: Set zoom to default level
    // map.setZoom(15);
  }

  async function markerClicked(title) {
    const { query: { pages } } = await WikipediaAPI.getArticle({ title });
    const article = Object.values(pages)[0];

    setCurrentArticle({
      url: article.fullurl,
      title,
    })
    setModalVisible(true);
  }


  attachListener('mapViewportChanged', mapViewportChanged);
  attachListener('mapLoaded', mapLoaded);
  attachListener('searchBoxPlacesSelected', searchBoxPlacesSelected);
  attachListener('markerClicked', markerClicked);
}

export function MapMediator() {
  useMapMediator();

  return null;
}