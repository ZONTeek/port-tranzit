import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import i18n from "../src/localization";
import { useLanguage } from "./components/LanguageProvider";

export default function Settings(): JSX.Element {
  const { lang, setLang, t } = useLanguage();

  const changeLang = () => {
    setLang(i18n.locale === "en" ? "ru" : "en");
  };

  return (
    <View>
      <TouchableOpacity onPress={changeLang} style={styles.setting}>
        <Text style={styles.settingText}>{t("lang")}</Text>
        <Text style={styles.settingValueText}>{lang}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  setting: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#f5f5f5",
    marginTop: 40,
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 16,
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: 0.1,
    shadowRadius: 20,
  },
  settingText: {
    fontSize: 16,
  },
  settingValueText: {
    fontSize: 16,
    color: "#3366f5",
  },
});
