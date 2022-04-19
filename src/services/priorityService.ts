import {Priority} from "../types/Priority";

const getAll = () : Promise<Priority[]> => {
  return fetch(`${ process.env.REACT_APP_VERCEL_ENV ? 'https://toodle-backend.vercel.app': 'http://localhost:3001' }/priorities`).then(resp => resp.json())
}

export default {getAll}