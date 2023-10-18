import { customStyles } from "../utils/Style";
import { View, Text } from "react-native";
import Router from "../components/Router";

const Playlist: React.FC = () => {  
  return (
    <View style={customStyles.container}>
      <Text style={customStyles.text}>Playlist</Text>
      <Router />
    </View>
  );
}

export default Playlist;