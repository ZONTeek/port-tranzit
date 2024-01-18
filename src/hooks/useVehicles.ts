import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getVehicle, getVehicles } from "../api/api";

const VEHICLES_QUERY_KEY = "vehicles";
const VEHICLE_QUERY_KEY = "vehicle";
const INITIAL_FILTERS = {
  cargo: true,
  passenger: true,
  special: true,
};

export const useVehicles = () => {
  const [filters, setFilters] = useState(INITIAL_FILTERS);

  const vehicles = useQuery({
    queryKey: [VEHICLES_QUERY_KEY, filters],
    queryFn: async () => {
      const vehicles = await getVehicles();

      if (!filters.cargo || !filters.passenger || !filters.special) {
        return vehicles.data.filter((vehicle) => filters[vehicle.vehicleType]);
      }
      return vehicles.data;
    },
    placeholderData: keepPreviousData,
  });

  const getVehicleInfo = (id: string) =>
    useQuery({
      queryKey: [VEHICLE_QUERY_KEY, id],
      queryFn: async () => {
        const vehicleInfo = await getVehicle(id);

        return vehicleInfo.data;
      },
    });

  return { vehicles, getVehicleInfo, filters, setFilters };
};
