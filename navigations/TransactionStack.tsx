import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../types";
import TransactionHomeScreen from "../screens/TransactionHomeScreen";

const Stack = createNativeStackNavigator<RootStackParamList>()

const TransactionStack= () => {

    const navigation = useNavigation()

    return (
        <Stack.Navigator initialRouteName="TransactionHomeScreen">
            <Stack.Screen
                options={{ title: "Home" }}
                name="TransactionHomeScreen"
                component={TransactionHomeScreen} />
        </Stack.Navigator >
    )
}

export default TransactionStack