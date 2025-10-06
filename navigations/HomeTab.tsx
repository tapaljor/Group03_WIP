import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome6 } from '@expo/vector-icons';

import HomeStack from "./HomeStack";
import AddItemStack from "./AddItemStack";
import TransactionStack from "./TransactionStack";
import SettingsStack from "./SettingsStack";
import ChatStack from "./ChatStack";
import { View, TouchableOpacity } from "react-native";

const Tab = createBottomTabNavigator()

function AddFabButton({ onPress, accessibilityState }: any) {
    const focused = accessibilityState?.selected;
    return (
        <TouchableOpacity
            activeOpacity={0.9}
            onPress={onPress}
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
            style={{
                top: -10,                   // <- bulge upward
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <View
                style={{
                    width: 60,
                    height: 60,
                    borderRadius: 30,
                    backgroundColor: focused ? "#facc15" : "#fff", // yellow when active
                    borderWidth: 4,
                    borderColor: "#800080",       
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <FontAwesome6 name="plus" size={18} />
            </View>
        </TouchableOpacity>
    );
}

const HomeTabs = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => {
                const iconName =
                    route.name === "AddItem" ? "plus-square" :
                    route.name === "HomeStack" ? "plug" :
                    route.name === "TransactionStack" ? "money-check-dollar" :
                    route.name === "Settings" ? "gear" :
                    route.name === "ChatStack" ? "message" : "face-smile"; 

                return {
                    headerShown: false,

                    // icon/label colors
                    tabBarActiveTintColor: "yellow",
                    tabBarInactiveTintColor: "#ffffff",

                    tabBarLabelStyle: { fontSize: 11 },

                    // if you use per-item backgrounds, keep the bar bg transparent
                    tabBarStyle: {
                        backgroundColor: "#94a3b8",
                        height: 80,
                        paddingBottom: 8,
                        borderTopColor: "transparent",
                    },

                    tabBarIcon: ({ color }) => (
                        <FontAwesome6 name={iconName} size={16} color={color} />
                    ),
                };
            }}
        >
            <Tab.Screen
                options={{
                    title: "Items",
                }}
                name="HomeStack"
                component={HomeStack}
            />
            <Tab.Screen
                options={{
                    title: "Chat",
                }}
                name="ChatStack"
                component={ChatStack}
            />
            <Tab.Screen
                options={{
                    title: "Post",
                    tabBarButton: (props) => <AddFabButton { ...props} />,
                }}
                name="AddItemStack"
                component={AddItemStack}
            />
            <Tab.Screen
                options={{
                    title: "Transactions",
                }}
                name="TransactionStack"
                component={TransactionStack}
            />
            <Tab.Screen
                options={{
                    title: "Settings",
                }}
                name="Settings"
                component={SettingsStack}
            />
        </Tab.Navigator>
    )
}

export default HomeTabs 