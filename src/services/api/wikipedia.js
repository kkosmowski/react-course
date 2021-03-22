import ky from 'ky';

const client = ky.create({
  prefixUrl: 'https://pl.wikipedia.org/w',
  headers: {
    'content-type': 'application/json',
  }
});

const WikipediaAPI = {
  getArticles({ coords, radius = 10000, limit = 100 } = {}) {
    const params = {
      action: 'query',
      list: 'geosearch',
      format: 'json',
      origin: '*'
    }

    if (!coords) {
      console.error('Wikipedia API: no coord passed to get')
    }

    return client.get(
      `api.php?`,
      {
        searchParams: {
          ...params,
          gscoord: coords.lat + '|' + coords.lng,
          gsradius: radius,
          gslimit: limit,
        }
      }
    ).json();
  }
}

export default WikipediaAPI;