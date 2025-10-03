import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SettingHomeScreen from "../screens/SettingHomeScreen";
import { RootStackParamList } from "../types";
import AboutMenuScreen from "../footers/AboutMenuScreen";
import FaqScreen from "../footers/FaqScreen";
import ProfileScreen from "../footers/ProfileScreen";
import WhatScreen from "../footers/WhatScreen";
import TechnologyUsedScreen from "../footers/TechnologyUsedScreen";

const Stack = createNativeStackNavigator<RootStackParamList>()

const SettingsStack = () => {

    return (
        <Stack.Navigator initialRouteName="Settings" >
            <Stack.Screen
                options={{ title: "Settings" }}
                name="Settings"
                component={SettingHomeScreen} />
            <Stack.Screen
                options={{ title: "About" }}
                name="About"
                component={AboutMenuScreen} />
            <Stack.Screen
                options={{ title: "FAQ" }}
                name="FAQ"
                component={FaqScreen} />
            <Stack.Screen
                options={{ title: "Profile" }}
                name="Profile"
                component={ProfileScreen} />
            <Stack.Screen
                options={{ title: "What is Electronics Auction?" }}
                name="What"
                component={WhatScreen} />
            <Stack.Screen
                options={{ title: "Technology Used" }}
                name="TechnologyUsed"
                component={TechnologyUsedScreen} />
        </Stack.Navigator >
    )
}

export default SettingsStack 