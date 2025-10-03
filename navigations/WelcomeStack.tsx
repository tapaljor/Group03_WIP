import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignInScreen from "../screens/SignInScreen";
import SignUpScreen from "../screens/SignUpScreen";

const Stack = createNativeStackNavigator();

const WelcomeStack = () => {
    return (
        <Stack.Navigator initialRouteName="SignInScreen">
            <Stack.Screen
                options={{ title: "Sign In" }}
                name="SignInScreen"
                component={SignInScreen} />

            <Stack.Screen
                options={{ title: "Sign up" }}
                name="SignUpScreen"
                component={SignUpScreen} />

        </Stack.Navigator >
    )
}

export default WelcomeStack