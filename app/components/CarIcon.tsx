import React from "react";
import { Image, ImageStyle, StyleSheet } from "react-native";

import Bus from "../../assets/bus.png";
import Tractor from "../../assets/tractor.png";
import Truck from "../../assets/truck.png";
import { VehicleType } from "../../src/types";

export const CarIcon = ({
  type,
  style,
}: {
  type: VehicleType;
  style?: ImageStyle;
}): JSX.Element => {
  if (type === "special") {
    return <Image source={Tractor} style={[styles.img, style]} />;
  }
  if (type === "cargo") {
    return <Image source={Truck} style={[styles.img, style]} />;
  }
  return <Image source={Bus} style={[styles.img, style]} />;
};

const styles = StyleSheet.create({
  img: {
    width: 40,
    height: 30,
  },
});
