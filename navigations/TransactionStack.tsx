import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import TransactionHomeScreen from "../screens/TransactionHomeScreen";
import ItemDetailScreen from "../screens/ItemDetailScreen";

const Stack = createNativeStackNavigator<RootStackParamList>()

const TransactionStack = () => {
    return (
        <Stack.Navigator initialRouteName="TransactionHomeScreen">
            <Stack.Screen
                options={{ title: "Transactions" }}
                name="TransactionHomeScreen"
                component={TransactionHomeScreen} />
            <Stack.Screen
                options={{ title: "Detail" }}
                name="ItemDetailScreen"
                component={ItemDetailScreen} />
        </Stack.Navigator >
    )
}

export default TransactionStack