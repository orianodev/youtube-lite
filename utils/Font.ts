import { useFonts } from "expo-font";

export const callFont = (): void => {
  const [fontsLoaded] = useFonts({
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
  });
};
