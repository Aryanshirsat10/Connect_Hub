import {
    createMaterialTopTabNavigator,
    MaterialTopTabNavigationOptions,
    MaterialTopTabNavigationEventMap,
} from '@react-navigation/material-top-tabs';
import{ withLayoutContext } from 'expo-router';
import {TabNavigationState,ParamListBase} from '@react-navigation/native';
const {Navigator} = createMaterialTopTabNavigator();

// export const MaterialTopTabs = withLayoutContext<
// MaterialTopTabNavigationOptions,
// typeof Navigator,
// TabNavigationState<ParamListBase>,
// MaterialTopTabNavigationEventMap
// >(Navigator);
export const MaterialTopTabs = withLayoutContext(Navigator);

const Layout = () =>{
    return(
        <MaterialTopTabs screenOptions={{
            tabBarActiveTintColor: '#131620',
            tabBarIndicatorStyle: { backgroundColor: '#1C87ED'},
            tabBarLabelStyle: { fontSize: 14, fontWeight: 'bold', textTransform: 'capitalize'}
        }}>
            <MaterialTopTabs.Screen name='messages' options={{ title : "Directmessages"}} />
            <MaterialTopTabs.Screen name='groupmessages' options={{ title : "Groupchats"}} />
        </MaterialTopTabs>
    );
};
export default Layout;