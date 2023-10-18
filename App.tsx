import { SavedVideo } from "./Interface";
import { storage } from "./utils/DB";
import { createContext, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Playlist from "./pages/Playlist";
import Player from "./pages/Player";

export const VideoContext: React.Context<string> = createContext("");
export const UpdateVideoContext: React.Context<(newVideoId: string) => void> = createContext((newVideoId: string): void => { });

export const FavoritesContext: React.Context<SavedVideo[]> = createContext([{id: 0, youtubeId: "", title: "", channel: "", thumbnailUrl: ""}]);
export const UpdateFavoritesContext: React.Context<(updatedFavorites: SavedVideo[]) => void> = createContext((updatedFavorites: SavedVideo[]): void => { });

const Stack = createNativeStackNavigator();

const App: React.FC = () => {
  const [videoId, setVideoId] = useState<string>("qmqtiVgtMcI");
  const [savedVideos, setSavedVideos] = useState<SavedVideo[]>(JSON.parse(storage.getString("Favorites")!));

  return (
    <VideoContext.Provider value={videoId}>
      <UpdateVideoContext.Provider value={setVideoId}>
        <FavoritesContext.Provider value={savedVideos}>
          <UpdateFavoritesContext.Provider value={setSavedVideos}>
            <NavigationContainer >
              <Stack.Navigator initialRouteName="Player" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Home" component={Home} options={{ title: "Vidéos favorites" }} />
                <Stack.Screen name="Player" component={Player} options={{ title: "Regarder une vidéo" }} />
                <Stack.Screen name="Search" component={Search} options={{ title: "Recherche" }} />
                <Stack.Screen name="Playlist" component={Playlist} />
              </Stack.Navigator>
            </NavigationContainer>
          </UpdateFavoritesContext.Provider>
        </FavoritesContext.Provider>
      </UpdateVideoContext.Provider>
    </VideoContext.Provider>
  );
}

export default App;