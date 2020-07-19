import axios, { AxiosResponse } from "axios";
import { IDrinkForUser, IDrink } from "../models/drink";

axios.defaults.baseURL = "http://localhost:8000";

const responseBody = (response: AxiosResponse<any>) => response.data;

const requests = {
  get: (url: string) => axios.get(url).then(responseBody),
  post: (url: string, body: {} | string, extraConfig?: {}) =>
    axios.post(url, body, extraConfig).then(responseBody),
  put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
  delete: (url: string) => axios.delete(url).then(responseBody),
  upload: (url: string, formData: FormData, config: {}) =>
    axios.post(url, formData, config).then(responseBody),
};

const Drinks = {
  drinksForUser: (username: string): Promise<IDrinkForUser[]> =>
    requests.get(`/drinks/${username}`),

  create: (drink: IDrink): Promise<IDrink> => requests.post(`/drinks`, drink),
};

export default Drinks;
