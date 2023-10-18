import { customStyles } from '../utils/Style'
import { useState } from 'react'
import { View, Pressable } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { SearchVideo } from '../Interface'

interface SearchBarProps {
  isLoading: boolean,
  setIsLoading: (isLoading: boolean) => void,
  setResults: (results: SearchVideo[]) => void,
}

const SearchBar: React.FC<SearchBarProps> = ({ setResults, isLoading, setIsLoading }) => {
  const [query, setQuery] = useState<string>("");

  const handleSearch = async (): Promise<void> => {
    if (query) {
      setIsLoading(true);
      try {
        const url = `https://youtube138.p.rapidapi.com/search/?q=${query}`;
        const options = {
          method: "GET",
          headers: {
            "X-RapidAPI-Key": "33a38a48e2msh345936a2215c570p1a003cjsn277d5a16ce04",
            "X-RapidAPI-Host": "youtube138.p.rapidapi.com",
          },
        };
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result.contents);
        setResults(result.contents);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <View style={customStyles.form}>
      <TextInput placeholder="Chercher une vidéo..." style={customStyles.input} value={query} onChangeText={setQuery} />
      <Pressable
        style={({ pressed }) => [customStyles.button, { backgroundColor: pressed ? "#2a64e0" : "#4287f5" }]}
        onPress={handleSearch} disabled={isLoading}>
        <FontAwesome name="search" size={20} style={customStyles.sliderLabel} />
      </Pressable>
    </View>
  )
}

export default SearchBar;