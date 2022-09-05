import {search} from 'services/search.js'


export default async function handler(req, res) {
  const { query: { q } } = req;
  
  const {results} = await search({query: q})
  
  res.status(200).json(results);
}
