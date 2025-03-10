import { customStyles } from "../utils/Style";
import { storage } from "../utils/DB";
import React, { useEffect, useRef, useState, useContext } from "react";
import { FavoritesContext, UpdateFavoritesContext, VideoContext } from "../App";
import Router from "../components/Router";
import { View, Text, Pressable } from "react-native";
import { Video, ResizeMode } from "expo-av";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Slider } from "@react-native-assets/slider";
import { SavedVideo } from "../Interface";

const Player: React.FC = () => {
  const playingVideo: any = useRef(null);
  const [status, setStatus] = useState<any>({});
  const [volume, setVolume] = useState<number>(0.7);
  const [speed, setSpeed] = useState<number>(1.0);

  const [videoUrl, setVideoUrl] = useState<string>("yhy335g2Wu8");
  const [videoUrls, setVideoUrls] = useState<any[]>([]);
  const [videoTitle, setVideoTitle] = useState<string>();
  const [videoChannel, setVideoChannel] = useState<string>("Chaîne");
  const [videoViews, setVideoViews] = useState<string>("1");
  const [videoThumbnail, setVideoThumbnail] = useState<string>("URL");

  const videoId: string = useContext<string>(VideoContext);
  const favoriteVideos: SavedVideo[] = useContext<SavedVideo[]>(FavoritesContext);
  const updateFavoriteVideos: (updatedFavorites: SavedVideo[]) => void = useContext(UpdateFavoritesContext);


  const addToFavorites = (): void => {
    // Avoid erros -- storage.clearAll()
    if (!videoTitle) return // Wait if no video has loaded yet
    console.log("Initial favorites", storage.getString("Favorites"));
    if (!storage.getAllKeys().includes("mmkv.default\\Favorites")) storage.set("Favorites", "[]"); // Initialize favorites if empty
    // Check if video is already in favorites
    const favorites: SavedVideo[] = favoriteVideos;
    const videoToAdd: SavedVideo = { id: videoId, title: videoTitle, channel: videoChannel, thumbnailUrl: videoThumbnail }
    for (const video of favorites) {
      if (video.id === videoId) return alert("Cette vidéo est déjà ajoutée aux favoris.")
    }
    // Save to local storage and ContextAPI
    favorites.push(videoToAdd)
    const favoritesJson: string = JSON.stringify(favorites);
    storage.set("Favorites", favoritesJson);
    updateFavoriteVideos(favorites)
  };

  const changeVideoSource = (index: number): void => {
    console.log("videoUrl :", videoUrl, "videoUrls :", videoUrls);

    setVideoUrl(videoUrls[index].url)
  }

  const onPause = (): void => {
    if (videoId !== "") status.isPlaying ? playingVideo.current.pauseAsync() : playingVideo.current.playAsync()
  }

  useEffect(() => {
    const loadVideo = async (): Promise<void> => {
      if (videoId === "") return
      console.log("Vidéos favorites :", favoriteVideos);
      const url: string = `https://youtube-search-and-download.p.rapidapi.com/video?id=${videoId}`;
      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key": "33a38a48e2msh345936a2215c570p1a003cjsn277d5a16ce04",
          "X-RapidAPI-Host": "youtube-search-and-download.p.rapidapi.com",
        },
      };
      try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);
        setVideoUrls(result.streamingData.formats);
        setVideoUrl(result.streamingData.formats[1].url);
        setVideoTitle(result.videoDetails.title);
        setVideoChannel(result.videoDetails.author);
        setVideoViews(result.videoDetails.viewCount);
        setVideoThumbnail(result.videoDetails.thumbnail.thumbnails[1].url);
      } catch (error) {
        console.error(error);
      }
    };
    loadVideo();
  }, [videoId]);

  useEffect(() => { playingVideo.current.setVolumeAsync(volume) }, [volume]); // update player volume in real time
  useEffect(() => { playingVideo.current.setRateAsync(speed, false) }, [speed]); // update player speed rate in real time

  return (
    <View style={customStyles.container}>
      {videoId ? (
        <React.Fragment>
          <Text style={customStyles.heading}>{videoTitle}</Text>
          <Text style={[customStyles.text, { marginBottom: 20 }]}>{videoChannel} - {parseInt(videoViews).toLocaleString()} vues</Text>
        </React.Fragment>
      ) : null}
      <View style={customStyles.videoContainer}>
        <Video
          ref={playingVideo} onPlaybackStatusUpdate={setStatus}
          style={customStyles.video} useNativeControls
          source={{ uri: videoUrl }} isLooping shouldPlay={true}
          resizeMode={ResizeMode.CONTAIN} videoStyle={{ width: 320, height: 180 }}
        />
      </View>
      <View style={{ display: "flex", flexDirection: "row", columnGap: 20, marginVertical: 20 }}>
        <Pressable
          style={({ pressed }) => [customStyles.button, { backgroundColor: pressed ? "#2a64e0" : "#4287f5" }]}
          onPress={() => addToFavorites()}>
          <FontAwesome name="heart" size={20} style={customStyles.sliderLabel} />
        </Pressable>
        <Pressable
          style={({ pressed }) => [customStyles.button, { backgroundColor: pressed ? "#2a64e0" : "#4287f5" }]}
          onPress={() => onPause()}>
          <FontAwesome name={status.isPlaying ? "pause" : "play"} size={20} style={customStyles.sliderLabel} />
        </Pressable>
      </View>
      <View style={{ display: "flex", flexDirection: "row", columnGap: 20, marginBottom: 20 }}>
        {videoUrls.map(((item, index) => (
          <Pressable
            key={item.qualityLabel}
            style={({ pressed }) => [customStyles.button, { backgroundColor: pressed ? "#2a64e0" : "#4287f5" }]}
            onPress={() => changeVideoSource(index)}>
            <View>
              <FontAwesome name={item.mimeType.includes("video/mp4") ? "film" : "music"} size={20} style={customStyles.sliderLabel} />
              <Text style={customStyles.title}>{item.qualityLabel}</Text>
            </View>
          </Pressable>
        )))}
      </View>
      <View>
        <View style={customStyles.sliderRow}>
          <FontAwesome name="volume-up" size={20} style={customStyles.sliderLabel} />
          <Slider
            style={customStyles.slider} step={0.1}
            minimumValue={0.0} maximumValue={1.0}
            value={volume} onValueChange={setVolume}
          />
          <Text style={customStyles.sliderLabel}>{volume}</Text>
        </View>
        <View style={customStyles.sliderRow}>
          <FontAwesome name="clock-o" size={20} style={customStyles.sliderLabel} />
          <Slider
            style={customStyles.slider} step={0.25}
            minimumValue={0.25} maximumValue={3.0}
            value={speed} onValueChange={setSpeed}
          />
          <Text style={customStyles.sliderLabel}>{speed}</Text>
        </View>
      </View>
      <Router />
    </View>
  );
};

export default Player;
