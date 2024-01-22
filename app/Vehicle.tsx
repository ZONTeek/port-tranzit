import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useRef } from "react";
import {
  ActivityIndicator,
  Button,
  Linking,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import MapView, { Marker } from "react-native-maps";

import { useVehicles } from "../src/hooks/useVehicles";
import { CarIcon } from "./components/CarIcon";
import { useLanguage } from "./components/LanguageProvider";

function Vehicle(): JSX.Element {
  const mapRef = useRef<MapView>();
  const { getVehicleInfo } = useVehicles();
  const { id } = useLocalSearchParams();
  const { t } = useLanguage();

  const { data } = getVehicleInfo(id as string);

  useEffect(() => {
    moveToVehicle();
  }, [data]);

  const moveToVehicle = () => {
    mapRef.current?.animateToRegion({
      latitude: Number(data.coords[0]),
      longitude: Number(data.coords[1]),
      latitudeDelta: 0.001,
      longitudeDelta: 0.001,
    });
  };

  const call = () => {
    Linking.openURL(`tel:${data.number}`);
  };

  const openWhatsApp = () => {
    Linking.openURL(
      `https://wa.me/${data.number}?text=Добрый день, подскажите пожалуйста, какой номер заказа у вас сейчас в работе`
    );
  };

  if (!data) {
    return <ActivityIndicator />;
  }

  return (
    <View style={styles.wrapper}>
      <MapView ref={mapRef} style={styles.map}>
        <Marker
          coordinate={{
            latitude: Number(data.coords[0]),
            longitude: Number(data.coords[1]),
          }}
        />
      </MapView>
      <View style={styles.container}>
        <Pressable onPress={moveToVehicle}>
          <CarIcon type={data.vehicleType} style={styles.icon} />
        </Pressable>
        <VehicleInfoRow left={t("vehicleType")} right={data.vehicleType} />
        <VehicleInfoRow left={t("driver")} right={data.driver} />
        <VehicleInfoRow left={t("phone")} right={data.number} />
        <View style={styles.actionBtns}>
          <Button title={t("write")} onPress={openWhatsApp} />
          <Button title={t("call")} onPress={call} />
        </View>
      </View>
    </View>
  );
}

const VehicleInfoRow = ({
  left,
  right,
}: {
  left: string;
  right: string;
}): JSX.Element => {
  return (
    <View style={styles.vehicleInfo}>
      <Text style={styles.vehicleInfoText}>{left}</Text>
      <Text style={styles.vehicleInfoText}>{right}</Text>
    </View>
  );
};

export default Vehicle;

const styles = StyleSheet.create({
  wrapper: { flex: 1 },
  container: {
    marginHorizontal: 20,
    flex: 1,
  },
  map: { width: "100%", height: "50%" },
  actionBtns: {
    position: "absolute",
    bottom: 40,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  vehicleInfo: {
    fontSize: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  vehicleInfoText: {
    fontSize: 16,
  },
  icon: { alignSelf: "center", width: 80, height: 80 },
});
