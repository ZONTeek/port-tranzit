import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";

import { VehiclesList } from "./components/VehiclesList";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <VehiclesList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
