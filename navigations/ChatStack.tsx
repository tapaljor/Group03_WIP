import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import ChatHomeScreen2 from "../screens/ChatHomeScreen2";

const Stack = createNativeStackNavigator<RootStackParamList>()

const ChatStack = () => {
    return (
        <Stack.Navigator initialRouteName="ChatHomeScreen2">
            <Stack.Screen
                options={{ title: "Chat Using Ollama" }}
                name="ChatHomeScreen2"
                component={ChatHomeScreen2} />
        </Stack.Navigator >
    )
}

export default ChatStack