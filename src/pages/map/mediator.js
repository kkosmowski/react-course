import WikipediaAPI from '../../services/api/wikipedia';

const listeners = {};

export function emit(event, ...args) {
  console.log(event, args);

  listeners[event](...args);
}

function attachListener(eventName, listener) {
  listeners[eventName] = listener;
}

function useMapMediator() {
  async function mapDragged(center) {
    console.log('useMapMediator map dragged', center);

    const articles = await WikipediaAPI.getArticles({
      coords: center,
      radius: 10000,
      limit: 10,
    });
    console.log(articles);
  }

  async function mapLoaded(center) {
    console.log('useMapMediator map loaded', center)

    const articles = await WikipediaAPI.getArticles({
      coords: center,
      radius: 10000,
      limit: 10,
    });
    console.log(articles);
  }

  attachListener('mapDragged', mapDragged);
  attachListener('mapLoaded', mapLoaded);
}

export function MapMediator() {
  useMapMediator();

  return null;
}