import {Priority} from "../types/Priority";

const getAll = () : Promise<Priority[]> => {
  return fetch(`${ process.env.API_URL || 'http://localhost:3001' }/priorities`).then(resp => resp.json())
}

export default {getAll}