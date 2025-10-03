import { NavigationContainer } from '@react-navigation/native';
import { userAuthentication } from './config/userAuthentication';
import HomeTab from './navigations/HomeTab';
import WelcomeStack from './navigations/WelcomeStack';
import { StripeProvider } from '@stripe/stripe-react-native';

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
        <StripeProvider publishableKey='pk_test_51SDo3o2HtvBgi4wsaWtmeJOIfLYGAwVISAwIgcJbrj4bOXAZbLzUhd4DL0wQT8825aAlUXGNsCEwAJ4hIGld7ZyR00c0cMyvOm'>
            <NavigationContainer>
                {
                    user ? <HomeTab /> : <WelcomeStack />
                }
            </NavigationContainer>
        </StripeProvider >
    )
}

