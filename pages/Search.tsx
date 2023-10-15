import { View, Text } from "react-native";
import { callFont } from "../Font";
import { customStyles } from "../Style";

export default function Search() {
  callFont()
  return (
    <View style={customStyles.container}>
      <Text style={customStyles.text}>Search</Text>
    </View>
  );
}
