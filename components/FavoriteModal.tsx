// NOT INTEGRATED YET //
import { Modal, View, Text, Pressable, StyleSheet } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { customStyles } from "../utils/Style";

interface VideoModalProps {
    isVisible: boolean,
    onClose: () => void,
    onClick: () => void,
    title: string
}

const VideoModal: React.FC<VideoModalProps> = ({ isVisible, onClose, onClick, title }) => {
    return (
        <Modal animationType="slide" transparent={true} visible={isVisible}>
            <View style={customStyles.modalContent}>
                <View style={customStyles.titleContainer}>
                    <Text style={customStyles.modalTitle}>Ajouter cette vidéo aux favoris ?</Text>
                    <Pressable onPress={onClose}>
                        <MaterialIcons name="close" color="#fff" size={22} />
                    </Pressable>
                </View>
                <Pressable onPress={onClick}>
                        <Text style={customStyles.heading}>
                            <MaterialIcons name="add" color="#fff" size={22} />
                            Ajouter aux favoris : {title}
                        </Text>
                    </Pressable>
            </View>
        </Modal>
    );
}
export default VideoModal;