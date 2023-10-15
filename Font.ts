import { useFonts } from "expo-font";

export function callFont() {
  const [fontsLoaded] = useFonts({
    "Poppins-Medium": require("./assets/fonts/Poppins-Medium.ttf"),
  });
}
