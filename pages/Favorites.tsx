import { customStyles } from "../utils/Style";
import { storage } from "../utils/DB";
import { useContext, useState } from "react";
import { FavoritesContext, UpdateFavoritesContext, UpdateVideoContext } from "../App";
import Router from "../components/Router";
import { View, Text, FlatList, Pressable, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LongPressGestureHandler } from "react-native-gesture-handler";
import DeleteModal from "../components/DeleteModal";
import { SavedVideo } from "../Interface";

const Favorites: React.FC = () => {
  const [isModalVisible, setDeleteModalVisible] = useState(false);
  const onModalClose = () => {
    setDeleteModalVisible(false);
  };
  
  const favoriteVideos: SavedVideo[] = useContext<SavedVideo[]>(FavoritesContext);
  const updateFavoriteVideos: (updatedFavorites: SavedVideo[]) => void = useContext(UpdateFavoritesContext);

  const [selectedVideoId, setSelectedVideoId] = useState<string>("yhy335g2Wu8");
  const [videoTitle, setVideoTitle] = useState<string>();

  const navigation = useNavigation()
  const updatePlayingVideo: (newVideoId: string) => void = useContext(UpdateVideoContext);

  const playVideo = async (videoId: string): Promise<void> => {
    navigation.navigate("Player" as never);
    updatePlayingVideo(videoId)
  }

  const onLongPress = (videoToAdd: SavedVideo): void => {
    setSelectedVideoId(videoToAdd.id)
    setVideoTitle(videoToAdd.title)
    setDeleteModalVisible(true)
  }

  const deleteFromFavorites = (): void => {
    const updatedFavorites = favoriteVideos.filter((favoriteVideo) => favoriteVideo.id !== selectedVideoId)
    updateFavoriteVideos(updatedFavorites);
    storage.set("Favorites", JSON.stringify(updatedFavorites));
    setDeleteModalVisible(false)
  };

  return (
    <View style={customStyles.container}>
      <Text style={customStyles.heading}>Vidéos favorites</Text>
      <FlatList
        data={favoriteVideos}
        contentContainerStyle={customStyles.list}
        renderItem={({ item }) => (
          <LongPressGestureHandler onGestureEvent={() => onLongPress(item)} minDurationMs={500}>
          <Pressable
              style={({ pressed }) => [customStyles.row, { backgroundColor: pressed ? "grey" : "lightgrey" }]} 
              onPress={() => playVideo(item.id)}>
              <Image source={{ uri: item.thumbnailUrl }} style={customStyles.image} />
              <View>
                <Text style={customStyles.title}>{item.title}</Text>
                <Text style={customStyles.info}>
                  {item.channel}
                  <DeleteModal isVisible={isModalVisible} onClose={onModalClose} onClick={deleteFromFavorites} title={videoTitle!} />
                </Text>
              </View>
            </Pressable>
        </LongPressGestureHandler>
          )}
      />
      <Router />
    </View>
  );
}

export default Favorites;