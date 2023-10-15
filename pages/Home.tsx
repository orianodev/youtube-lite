import { View, Text, StyleSheet } from "react-native";
import { callFont } from "../Font";
import { customStyles } from "../Style";

export default function Home() {
  callFont();

  return (
    <View style={customStyles.container}>
      <Text style={customStyles.text}>Home</Text>
    </View>
  );
}
const styles = StyleSheet.create({});
  