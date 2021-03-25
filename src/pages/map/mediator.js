import WikipediaAPI from '../../services/api/wikipedia';
import { useMapStore } from './store';
import ArticlesDatabase from '../../services/ArticlesDatabase';

const listeners = {};
let map;

const defaultArticleColor = 'orange';
const readArticleColor = 'blue';

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

function mapReadArticles(articles) {
  return articles.map(({ title, ...rest }) => ({
    ...rest,
    title,
    color: ArticlesDatabase.isArticleRead(title) ? readArticleColor : defaultArticleColor,
  }));
}

function useMapMediator() {
  const [, { addMarkers, setGoogleApiLoaded, setModalVisible, setCurrentArticle, setMarkerColor }] = useMapStore();

  async function mapViewportChanged(center) {
    console.log('useMapMediator mapViewportChanged');
    const response = await WikipediaAPI.getArticles({ coords: center });
    let articles = mapWikipediaArticlesToMarkers(response.query.geosearch);
    articles = mapReadArticles(articles);
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
    if (!ArticlesDatabase.isArticleRead(title)) {
      ArticlesDatabase.setArticleAsRead(title);
    }
    setMarkerColor(title, readArticleColor);
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