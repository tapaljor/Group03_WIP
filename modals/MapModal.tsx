import React, { useEffect, useState } from 'react';
import { Modal, View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { performForwardGeocoding } from '../utils/LocationHelper'; 
import { styles } from '../g03CSS';

type ScreenProps = {
    address: string;
    visible: boolean;
    onClose: () => void;
};

const MapModal = ({ visible, onClose, address }: ScreenProps) => {
    const [location, setLocation] = useState({latitude: 0.0, longitude: 0.0});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchLocation = async () => {
            if (!address) return;

            setLoading(true);
            try {
                const result = await performForwardGeocoding(address);
                if (result?.latitude && result?.longitude) {
                    setLocation({
                        latitude: result.latitude,
                        longitude: result.longitude,
                    });
                }
            } catch (error) {
                console.error('Geocoding failed:', error);
            } finally {
                setLoading(false);
            }
        };

        if (visible) fetchLocation();
    }, [visible, address]);

    return (
        <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
            <View style={styles.modal}>
                {loading ? (
                    <ActivityIndicator size="large" color="blue" style={{ flex: 1 }} />
                ) : location ? (
                    <MapView
                        style={{ flex: 1 }}
                        initialRegion={{
                            ...location,
                            latitudeDelta: 0.01,
                            longitudeDelta: 0.01,
                        }}
                    >
                        <Marker coordinate={location} title="Vehicle Location" />
                    </MapView>
                ) : (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text>Location not found</Text>
                    </View>
                )}

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
    );
};

export default MapModal;
