import axios, { AxiosResponse } from "axios";
import { IDrink, IDrinksForEvent } from "../models/drink";
import { IUserRegister } from "../models/user";
import qs from "qs";
import { getBearerToken } from "./localStorage";
import { IEvent } from "../models/event";

axios.defaults.baseURL =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_BACKEND_URL
    : "http://localhost:8000";

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

export const Drinks = {
  drinksForEvent: (): Promise<IDrinksForEvent[]> => requests.get(`/drinks`),
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

export const Events = {
  getCurrent: (): Promise<IEvent[]> => requests.get("/events"),
  validateEvent: (id: number): Promise<IEvent> =>
    requests.get(`/events/validate/${id}`),
  list: (): Promise<IEvent[]> => requests.get("/events/list"),
  create: (event: IEvent): Promise<IEvent> => requests.post("/events", event),
  delete: (event_id: number) => requests.delete(`/events/${event_id}`),
};

export const Admin = {
  acquireAdminStatus: (secret: string) =>
    requests.post("/admin/acquireadmin", { secret: secret }),
};
