import { Link } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useVehicles } from "../../src/hooks/useVehicles";
import { CarIcon } from "./CarIcon";
import { Filter } from "./Filter";
import { useLanguage } from "./LanguageProvider";

export const VehiclesList = (): JSX.Element => {
  const {
    vehicles: { data, isLoading, isError },
    filters,
    setFilters,
  } = useVehicles();
  const { t } = useLanguage();

  const toggleFilter = (filter: string) => {
    setFilters((prev) => ({ ...prev, [filter]: !prev[filter] }));
  };

  const renderItem = ({ item }) => {
    return (
      <Link href={{ pathname: "/Vehicle", params: { id: item.id } }} asChild>
        <TouchableOpacity style={styles.listItem}>
          <View>
            <Text>
              {t("driver")}: {item.driver}
            </Text>
            <Text>
              {t("vehicleType")}: {t([item.vehicleType])}
            </Text>
          </View>
          <CarIcon type={item.vehicleType} />
        </TouchableOpacity>
      </Link>
    );
  };

  if (isLoading) {
    return <ActivityIndicator size={"large"} style={styles.placeholder} />;
  }

  if (isError || !data) {
    return <Text>{t("error")}</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.filters}>
        {Object.keys(filters).map((filter) => (
          <Filter
            key={filter}
            isActive={filters[filter]}
            title={t(filter)}
            value={filter}
            onPress={toggleFilter}
          />
        ))}
      </View>
      {data.length === 0 ? (
        <Text style={styles.placeholder}>{t("noData")}</Text>
      ) : (
        <FlatList data={data} renderItem={renderItem} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  filters: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#fff",
    padding: 20,
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: "#f5f5f5",
    marginVertical: 10,
    marginHorizontal: 5,
    borderRadius: 16,
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: 0.1,
    shadowRadius: 20,
  },
  placeholder: {
    textAlign: "center",
    fontSize: 20,
    marginTop: 30,
  },
});
