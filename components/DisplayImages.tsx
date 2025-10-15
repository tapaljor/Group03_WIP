import React, { useRef, useState } from "react";
import { View, Image, Animated, useWindowDimensions, TouchableOpacity, Modal, Pressable } from "react-native";
import ClickedImageModal from "../modals/ClickedImageModal";

type Props = { images: string[] };

export default function DisplayImages({ images = [] }: Props) {
    const { width } = useWindowDimensions();
    const H = 200;
    const data = images.length ? images : ["https://placehold.co/600x400/EEE/31343C"];
    const scrollX = useRef(new Animated.Value(0)).current;

    // slider sizes/colors
    const DOT = 6;
    const TRACK_W = Math.min(width * 0.4, 120);
    const trackBg = "rgba(0,0,0,0.35)";
    const dotBg = "#fff";

    const [clickImageVisible, setClickImageVisible] = useState(false)
    const [clickedImage, setClickedImage] = useState("https://placehold.co/600x400/EEE/31343C")

    // move dot from left→right as you scroll pages
    const translateX = scrollX.interpolate({
        inputRange: [0, (data.length - 1) * width],
        outputRange: [0, TRACK_W - DOT],
        extrapolate: "clamp",
    });
    return (
        <View style={{ height: H, overflow: "hidden", marginBottom: 10 }}>
            <Animated.FlatList
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                data={data}
                keyExtractor={(u, i) => `${i}-${u}`}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => {
                            setClickImageVisible(true)
                            setClickedImage(item)
                        }}
                    >
                        <Image style={{ width, height: H }} source={{ uri: item }} resizeMode="cover" />
                    </TouchableOpacity>
                )}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    { useNativeDriver: true }
                )}
                scrollEventThrottle={16}
            />

            {data.length > 1 && (
                <View style={{ position: "absolute", bottom: 8, left: 0, right: 0, alignItems: "center" }}>
                    <View
                        style={{
                            width: TRACK_W,
                            height: 10,
                            borderRadius: 5,
                            backgroundColor: trackBg,
                            justifyContent: "center",
                            padding: 5,
                        }}
                    >
                        <Animated.View
                            style={{
                                width: DOT,
                                height: DOT,
                                borderRadius: DOT / 2,
                                backgroundColor: dotBg,
                                transform: [{ translateX }],
                            }}
                        />
                    </View>
                </View>
            )}
            <ClickedImageModal
                image={clickedImage} 
                visible={clickImageVisible}
                onClose={() => setClickImageVisible(false)}
            />
        </View>
    )
}
