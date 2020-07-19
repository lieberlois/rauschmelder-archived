import axios, { AxiosResponse } from "axios";
import { IDrinkForUser, IDrink } from "../models/drink";
import { IUserRegister } from "../models/user";
import qs from "qs";
import { getBearerToken } from "./auth";

axios.defaults.baseURL =
  process.env.REACT_APP_BASE_URL ?? "http://localhost:8000";

axios.interceptors.request.use((config) => {
  config.headers["Authorization"] = `Bearer ${getBearerToken()}`;
  return config;
});

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

export const Auth = {
  register: (user: IUserRegister) => requests.post("/auth/register", user),
  login: (username: string, password: string) =>
    requests.post("/auth/token", qs.stringify({ username, password }), {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    }),
  me: () => requests.get("/auth/me"),
};

export default Drinks;
