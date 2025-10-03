import { TouchableOpacity, Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DashboardScreen from "../screens/DashboardScreen";
import ItemDetailScreen from "../screens/ItemDetailScreen";
import EditItemScreen from "../screens/EditItemScreen";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../types";

const Stack = createNativeStackNavigator<RootStackParamList>()

const HomeStack = () => {

    const navigation = useNavigation()

    return (
        <Stack.Navigator initialRouteName="DashboardScreen" >
            <Stack.Screen
                options={{ title: "Home" }}
                name="DashboardScreen"
                component={DashboardScreen} />
            <Stack.Screen
                options={{ title: "Detail" }}
                name="ItemDetailScreen"
                component={ItemDetailScreen} />
            <Stack.Screen
                options={{ title: "Edit" }}
                name="EditItemScreen"
                component={EditItemScreen} />
        </Stack.Navigator >
    )
}

export default HomeStack 