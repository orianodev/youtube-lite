import { callFont } from "../utils/Font";  // Import font family from all pages
import { customStyles } from "../utils/Style";
import { View, Pressable } from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const Router: React.FC = () => {
  callFont();
  const navigation: NavigationProp<ReactNavigation.RootParamList> = useNavigation();

  return (
    <View style={customStyles.router}>
      <Pressable onPress={(): void => navigation.navigate("Favorites" as never)}>
        <FontAwesome name="list" size={20} />
      </Pressable>
      <Pressable onPress={(): void => navigation.navigate("Player" as never)}>
        <FontAwesome name="play" size={20} />
      </Pressable>
      <Pressable onPress={(): void => navigation.navigate("Search" as never)}>
        <FontAwesome name="search" size={20} />
      </Pressable>
    </View>
  );
}
export default Router;