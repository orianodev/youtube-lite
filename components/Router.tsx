import { View, Button, StyleSheet, Pressable, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { customStyles } from "../Style";

export default function Router() {
  const navigation = useNavigation();

  return (
    <View>
      <Pressable style={styles.button} onPress={() => navigation.navigate("Home" as never)}>
        <Text style={customStyles.text}>Home</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={() => navigation.navigate("Search" as never)}>
        <Text style={customStyles.text}>Search</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={() => navigation.navigate("Playlist" as never)}>
        <Text style={customStyles.text}>Playlist</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={() => navigation.navigate("Player" as never)}>
        <Text style={customStyles.text}>Player</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#44f",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderRadius: 3,
    margin: 1
  },
});
