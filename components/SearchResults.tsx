import { customStyles } from "../utils/Style";
import { storage } from "../utils/DB";
import { useContext, useState } from "react";
import { FavoritesContext, UpdateFavoritesContext, UpdateVideoContext } from "../App";
import { View, Text, Image, FlatList, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LongPressGestureHandler } from "react-native-gesture-handler";
import VideoModal from "./FavoriteModal";
import { SavedVideo, SearchVideo } from "../Interface";

interface SearchResultsProps { results: SearchVideo[] }

const SearchResults: React.FC<SearchResultsProps> = ({ results }) => {
  const [isModalVisible, setFavoriteModalVisible] = useState(false);
  const onModalClose = () => {
    setFavoriteModalVisible(false);
  };

  const favoriteVideos: SavedVideo[] = useContext<SavedVideo[]>(FavoritesContext);
  const updateFavoriteVideos: (updatedFavorites: SavedVideo[]) => void = useContext(UpdateFavoritesContext);

  const [selectedVideoId, setSelectedVideoId] = useState<string>("yhy335g2Wu8");
  const [videoTitle, setVideoTitle] = useState<string>();
  const [videoChannel, setVideoChannel] = useState<string>("Chaîne");
  const [videoThumbnail, setVideoThumbnail] = useState<string>("URL");

  const navigation = useNavigation()
  const updatePlayingVideo: (newVideoId: string) => void = useContext(UpdateVideoContext);

  const playVideo = async (videoId: string): Promise<void> => {
    navigation.navigate("Player" as never);
    updatePlayingVideo(videoId)
  }

  const onLongPress = (videoToAdd: SearchVideo): void => {
    setSelectedVideoId(videoToAdd.video.videoId)
    setVideoTitle(videoToAdd.video.title)
    setVideoChannel(videoToAdd.video.author.title)
    setVideoThumbnail(videoToAdd.video.thumbnails[0].url)
    setFavoriteModalVisible(true)
  }

  const addToFavorites = () => {
    // Avoid erros -- storage.clearAll()
    if (!videoTitle) return // Wait if no video has loaded yet
    console.log("Initial favorites", storage.getString("Favorites"));
    if (!storage.getAllKeys().includes("mmkv.default\\Favorites")) storage.set("Favorites", "[]"); // Initialize favorites if empty
    // Check if video is already in favorites
    const favorites: SavedVideo[] = favoriteVideos;
    const videoToAdd: SavedVideo = { id: selectedVideoId, title: videoTitle, channel: videoChannel, thumbnailUrl: videoThumbnail }
    for (const video of favorites) {
      if (video.id === selectedVideoId) return alert("Cette vidéo est déjà ajoutée aux favoris.")
    }
    // Save to local storage and ContextAPI
    favorites.push(videoToAdd)
    const favoritesJson: string = JSON.stringify(favorites);
    updateFavoriteVideos(favorites)
    storage.set("Favorites", favoritesJson);
    setFavoriteModalVisible(false)
  };


  return (
    <FlatList
      data={results.filter((item) => item.type === "video")}
      contentContainerStyle={customStyles.list}
      renderItem={({ item }) => (
        <LongPressGestureHandler onGestureEvent={() => onLongPress(item)} minDurationMs={500}>
          <Pressable
            style={({ pressed }) => [customStyles.row, { backgroundColor: pressed ? "grey" : "lightgrey" }]}
            onPress={() => playVideo(item.video.videoId)}>
            <Image source={{ uri: item.video.thumbnails[0].url }} style={customStyles.image} />
            <View>
              <Text style={customStyles.title}>{item.video.title}</Text>
              <Text style={customStyles.info}>{item.video.author.title + " - " + item.video.publishedTimeText}</Text>
            </View>
            <VideoModal isVisible={isModalVisible} onClose={onModalClose} onClick={addToFavorites} title={videoTitle!} />
          </Pressable>
        </LongPressGestureHandler>
      )}
    />
  );
};

export default SearchResults;
