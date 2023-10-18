import { customStyles } from "../utils/Style";
import { useContext } from "react";
import { UpdateVideoContext } from "../App";
import { View, Text, Image, FlatList, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SearchVideo } from "../Interface";

interface SearchResultsProps { results: SearchVideo[] }

const SearchResults: React.FC<SearchResultsProps> = ({ results }) => {
  const navigation = useNavigation()
  const updatePlayingVideo: (newVideoId: string) => void = useContext(UpdateVideoContext);

  const playVideo = async (videoId: string): Promise<void> => {
    navigation.navigate("Player" as never);
    updatePlayingVideo(videoId)
  }

  return (
    <FlatList
      data={results.filter((item) => item.type === "video")}
      contentContainerStyle={customStyles.list}
      renderItem={({ item }) => (
        <Pressable
          style={({ pressed }) => [customStyles.row, { backgroundColor: pressed ? "grey" : "lightgrey" }]} 
          onPress={() => playVideo(item.video.videoId)}>
          <Image source={{ uri: item.video.thumbnails[0].url }} style={customStyles.image} />
          <View>
            <Text style={customStyles.title}>{item.video.title}</Text>
            <Text style={customStyles.info}>{item.video.author.title + " - " + item.video.publishedTimeText}</Text>
          </View>
        </Pressable>
      )}
    />
  );
};

export default SearchResults;
