import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Link, Stack } from "expo-router";
import { Button } from "react-native";
import { LanguageProvider, useLanguage } from "./components/LanguageProvider";

export const queryClient = new QueryClient();

export default function () {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <WrappedStack />
      </LanguageProvider>
    </QueryClientProvider>
  );
}

const WrappedStack = () => {
  const { t } = useLanguage();

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: t("vehiclesList"),
          headerRight: () => (
            <Link href={"/Settings"} asChild>
              <Button title={t("settings")} />
            </Link>
          ),
        }}
      />
      <Stack.Screen name="Settings" options={{ title: t("settings") }} />
      <Stack.Screen name="Vehicle" options={{ title: t("vehicle") }} />
    </Stack>
  );
};
