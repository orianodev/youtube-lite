import { customStyles } from "../utils/Style";
// import { storage } from "../utils/DB";
import { useContext } from "react";
import { View, Text, FlatList, Pressable, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
// import FontAwesome from "@expo/vector-icons/FontAwesome";
import { FavoritesContext, UpdateFavoritesContext, UpdateVideoContext } from "../App";
import Router from "../components/Router";
import { SavedVideo } from "../Interface";

const Favorites: React.FC = () => {
  const navigation = useNavigation();
  const updatePlayingVideo: (newVideoId: string) => void = useContext(UpdateVideoContext);
  const favoriteVideos: SavedVideo[] = useContext<SavedVideo[]>(FavoritesContext);
  // const updateFavoriteVideos: (updatedFavorites: SavedVideo[]) => void = useContext(UpdateFavoritesContext);

  const playVideo = async (videoId: string): Promise<void> => {
    navigation.navigate("Player" as never);
    updatePlayingVideo(videoId)
  }

  // const deleteFromFavorites = (id: number): void => {
  //   const updatedFavorites = favoriteVideos;
  //   updatedFavorites.splice(id, 1);
  //   updateFavoriteVideos(updatedFavorites);
  //   storage.set("Favorites", JSON.stringify(updatedFavorites));
  //   alert("Removed from favorites");
  //   navigation.navigate("Player" as never);
  // };

  return (
    <View style={customStyles.container}>
      <Text style={customStyles.heading}>Vidéos favorites</Text>
      <FlatList
        data={favoriteVideos}
        contentContainerStyle={customStyles.list}
        renderItem={({ item }) => {
          return (
            <Pressable
              style={({ pressed }) => [
                customStyles.row,
                { backgroundColor: pressed ? "grey" : "lightgrey" },
              ]} onPress={() => playVideo(item.youtubeId)}>
              <Image
                source={{ uri: item.thumbnailUrl }}
                style={customStyles.image}
              />
              <View>
                <Text style={customStyles.title}>{item.title}</Text>
                <Text style={customStyles.info}>
                  {item.channel}
                  {/* <Pressable onPress={() => deleteFromFavorites(item.id)}>
                    <FontAwesome name="trash" size={12} color={"black"} style={{ marginLeft: 5 }} />
                  </Pressable> */}
                </Text>
              </View>
            </Pressable>
          );
        }}
      />
      <Router />
    </View>
  );
}
export default Favorites;