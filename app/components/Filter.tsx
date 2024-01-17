import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

type FilterProps = {
    isActive: boolean;
    title: string;
    value: string;
    onPress: (arg: string) => void;
}

export const Filter = ({ isActive, title, value, onPress }: FilterProps): JSX.Element => {
  const handlePress = () => {
    onPress(value);
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <Text style={[styles.title, isActive && styles.active]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
  },
  active: {
    color: "#3366f5",
  },
});
