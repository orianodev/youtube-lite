import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Home from './pages/Home';
import Search from './pages/Search';
import Playlist from './pages/Playlist';
import Player from './pages/Player';
import Router from './components/Router';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="Playlist" component={Playlist} />
      <Stack.Screen name="Player" component={Player} />
    </Stack.Navigator>
    <Router />
  </NavigationContainer>
  )
}