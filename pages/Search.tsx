import { customStyles } from "../utils/Style";
import { useState } from "react";
import { View, ActivityIndicator } from "react-native";
import SearchBar from "../components/SearchBar";
import SearchResults from "../components/SearchResults";
import Router from "../components/Router";
import { SearchVideo } from "../Interface";

const Search: React.FC = () => {
  const [results, setResults] = useState<SearchVideo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <View style={customStyles.container}>
      <SearchBar setResults={setResults} isLoading={isLoading} setIsLoading={setIsLoading} />
      {isLoading && <ActivityIndicator size="large" color="#0000ff" />}
      <SearchResults results={results} />
      <Router />
    </View>
  );
}
export default Search;