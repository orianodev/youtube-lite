// NOT INTEGRATED YET //
import { Modal, View, Text, Pressable, StyleSheet } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { customStyles } from "../utils/Style";

interface DeleteModalProps {
    isVisible: boolean,
    onClose: () => void,
    onClick: () => void,
    title: string,
}

const DeleteModal: React.FC<DeleteModalProps> = ({ isVisible, onClose, onClick, title }) => {
    return (
        <Modal animationType="slide" transparent={true} visible={isVisible}>
            <View style={customStyles.modalContent}>
                <View style={customStyles.titleContainer}>
                    <Text style={customStyles.modalTitle}>Retirer cette vidéo des favoris ?</Text>
                    <Pressable onPress={onClose}>
                        <MaterialIcons name="close" color="#fff" size={22} />
                    </Pressable>
                </View>
                <Pressable onPress={onClick}>
                    <Text style={customStyles.heading}>
                        <MaterialIcons name="delete" color="#fff" size={22} />
                        Retirer des favoris : {title}
                    </Text>
                </Pressable>
            </View>
        </Modal>
    );
}
export default DeleteModal;