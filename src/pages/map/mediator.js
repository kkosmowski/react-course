import WikipediaAPI from '../../services/api/wikipedia';
import { useMapStore } from './store';

const listeners = {};

export function emit(event, ...args) {
  console.log(event, args);

  listeners[event](...args);
}

function attachListener(eventName, listener) {
  listeners[eventName] = listener;
}

function mapWikipediaArticlesToMarkers(articles) {
  return articles.map(({ lat, lon, pageid }) => ({
    lat,
    lng: lon,
    pageId: pageid,
  }));
}

function useMapMediator() {
  const [, { addMarkers }] = useMapStore();

  async function mapDragged(center) {
    const response = await WikipediaAPI.getArticles({ coords: center });
    const articles = mapWikipediaArticlesToMarkers(response.query.geosearch);
    addMarkers(articles);
  }

  async function mapLoaded(center) {
    console.log('useMapMediator map loaded', center)

    const articles = await WikipediaAPI.getArticles({ coords: center });
    console.log(articles);
  }

  attachListener('mapDragged', mapDragged);
  attachListener('mapLoaded', mapLoaded);
}

export function MapMediator() {
  useMapMediator();

  return null;
}