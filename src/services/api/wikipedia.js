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
  },
  getArticle({ title }) {
    const params = {
      action: 'query',
      format: 'json',
      titles: title,
      prop: 'info',
      inprop: 'url',
      origin: '*',
    }

    if (!title) {
      console.error('Wikipedia API: no title passed to getArticle');
    }

    return client
      .get('api.php?', {
        searchParams: {
          ...params
        }
      })
      .json();
  }
}

export default WikipediaAPI;