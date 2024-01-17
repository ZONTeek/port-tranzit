import axios, { AxiosPromise, AxiosResponse } from "axios";
import { Vehicle } from "../types";

const URL = process.env.EXPO_PUBLIC_API_URL;

const instance = axios.create({
    baseURL: URL
})

export const getVehicles = (): AxiosPromise<Vehicle[]> => {
    return instance.get('/vehicles');
}

export const getVehicle = (id: string): AxiosPromise<Vehicle> => {
    return instance.get(`/vehicles/${id}`);
}