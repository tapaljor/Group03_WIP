import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import ChatHomeScreen from "../screens/ChatHomeScreen";

const Stack = createNativeStackNavigator<RootStackParamList>()

const ChatStack = () => {
    return (
        <Stack.Navigator initialRouteName="ChatHomeScreen">
            <Stack.Screen
                options={{ title: "Chat" }}
                name="ChatHomeScreen"
                component={ChatHomeScreen} />
        </Stack.Navigator >
    )
}

export default ChatStack