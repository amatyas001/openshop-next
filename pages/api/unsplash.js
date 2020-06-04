import Unsplash, { toJson } from 'unsplash-js';

export default (req, res) => {
  const unsplash = new Unsplash({
    accessKey: process.env.UNSPLASH_ACCESS_TOKEN,
    headers: {
      'X-Custom-Header': 'foo',
    },
  });
};
