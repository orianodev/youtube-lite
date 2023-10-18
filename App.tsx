import { SavedVideo } from "./Interface";
import { storage } from "./utils/DB";
import { Context, createContext, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Favorites from "./pages/Favorites";
import Search from "./pages/Search";
import Playlist from "./pages/Playlist";
import Player from "./pages/Player";

export const VideoContext: Context<string> = createContext("");
export const UpdateVideoContext: Context<(newVideoId: string) => void> = createContext((newVideoId: string): void => { });

export const FavoritesContext: Context<SavedVideo[]> = createContext([{id: "", title: "", channel: "", thumbnailUrl: ""}]);
export const UpdateFavoritesContext: Context<(updatedFavorites: SavedVideo[]) => void> = createContext((updatedFavorites: SavedVideo[]): void => { });

const Stack = createNativeStackNavigator();

const App: React.FC = () => {
  const [videoId, setVideoId] = useState<string>("");
  if (!storage.getAllKeys().includes("mmkv.default\\Favorites")) storage.set("Favorites", "[]");
  const [savedVideos, setSavedVideos] = useState<SavedVideo[]>(JSON.parse(storage.getString("Favorites")!));

  return (
    <VideoContext.Provider value={videoId}>
      <UpdateVideoContext.Provider value={setVideoId}>
        <FavoritesContext.Provider value={savedVideos}>
          <UpdateFavoritesContext.Provider value={setSavedVideos}>
            <NavigationContainer >
              <Stack.Navigator initialRouteName="Player" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Favorites" component={Favorites} options={{ title: "Vidéos favorites" }} />
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