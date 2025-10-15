import { Text, View, Image, Modal, TouchableOpacity } from "react-native"
import { styles } from "../g03CSS"

type Props = {
    image: string;
    visible: boolean;
    onClose: () => void;
}
const ClickedImageModal = ({ image, visible, onClose }: Props) => {

    return (
        <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
            <View style={{ width: "100%", height: "100%",}}>
                <Image style={{ width: "100%", height: "100%", borderRadius: 15}} source={{ uri: image }} resizeMode="cover"/>
                <TouchableOpacity
                    onPress={onClose}
                    style={{
                        position: 'absolute',
                        top: 40,
                        right: 20,
                        backgroundColor: '#fff',
                        padding: 10,
                        borderRadius: 8,
                    }}
                >
                    <Text style={{ fontWeight: 'bold' }}>Close</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    )
}

export default ClickedImageModal 