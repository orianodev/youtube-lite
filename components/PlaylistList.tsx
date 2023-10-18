// NOT INTEGRATED YET //
import { useState } from "react";
import { StyleSheet, FlatList, Platform, Pressable, Text } from "react-native";

interface PlaylistListProps {
    onSelect: any,
    onCloseModal: () => void
}
const PlaylistList: React.FC<PlaylistListProps> = ({ onSelect, onCloseModal }) => {
    const [playlist] = useState(["A", "B", "C"]);

    return (
        <FlatList
            horizontal
            showsHorizontalScrollIndicator={Platform.OS === "web"}
            data={playlist}
            contentContainerStyle={styles.listContainer}
            renderItem={({ item, index }) => {
                return (
                    <Pressable
                        onPress={() => {
                            onSelect(item);
                            onCloseModal();
                        }}
                    >
                        <Text style={styles.text}>{item}</Text>
                    </Pressable>
                );
            }}
        />
    );
}
export default PlaylistList;

const styles = StyleSheet.create({
    listContainer: {
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        paddingHorizontal: 20,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    text: {
        fontSize: 40,
        textAlign: "center",
        color: "white",
    },
});