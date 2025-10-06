import { Item } from './models/ItemDoc';

export type RootStackParamList = {
    WelcomeScreen: undefined;
    SignInScreen: undefined;
    SignUpScreen: undefined;
    HomeScreen: undefined;
    DashboardScreen: undefined;
    ItemDetailScreen: { itemDetail: Item };
    EditItemScreen: { itemDetail: Item };
    AuctionModal: { itemDetail: Item; visible: boolean };
    About: undefined;
    FAQ: undefined;
    Profile: undefined;
    TechnologyUsed: undefined;   
    What: undefined;
    Settings: undefined;
    TransactionHomeScreen: undefined;
    ChatHomeScreen: undefined;
}
