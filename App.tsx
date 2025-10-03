import { NavigationContainer } from '@react-navigation/native';
import { userAuthentication } from './config/userAuthentication';
import HomeTab from './navigations/HomeTab';
import WelcomeStack from './navigations/WelcomeStack';

/*
npm install @react-navigation/native
npm install @react-navigation/bottom-tabs
npx expo install react-native-screens react-native-safe-area-context
npm install @react-navigation/native-stack
npm install --save react-native-vector-icons
*/

export default function App() {
    const { user } = userAuthentication()

    return (
            <NavigationContainer>
                {
                    user ? <HomeTab /> : <WelcomeStack />
                }
            </NavigationContainer>
    )
}

