import { TouchableOpacity, Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FirebaseAuth } from "../config/firebaseConfig";
import { signOut } from "firebase/auth";
import AddItemScreen from "../screens/AddItemScreen";
import EditItemScreen from "../screens/EditItemScreen";

const Stack = createNativeStackNavigator();

const AddItemStack = () => {
    return (
        <Stack.Navigator initialRouteName="AddItem" >
            <Stack.Screen
                options={{ title: "Add Item" }}
                name="AddItem"
                component={AddItemScreen} />
            <Stack.Screen
                options={{ title: "Edit" }}
                name="EditItemScreen"
                component={EditItemScreen} />
        </Stack.Navigator >
    )
}

export default AddItemStack 