import React from "react";
import { Image, ImageStyle, StyleSheet } from "react-native";

import Bus from "../../assets/bus.png";
import Tractor from "../../assets/tractor.png";
import Truck from "../../assets/truck.png";
import { VehicleType } from "../../src/types";

const IMAGES = {
  cargo: Truck,
  passenger: Bus,
  special: Tractor,
};

export const CarIcon = ({
  type,
  style,
}: {
  type: VehicleType;
  style?: ImageStyle;
}): JSX.Element => {
  return <Image source={IMAGES[type]} style={[styles.img, style]} />;
};

const styles = StyleSheet.create({
  img: {
    width: 40,
    height: 30,
  },
});
