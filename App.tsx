import PostItemToRent from './components/postItem';
import Home from './components/home';
import RentalPostDetails from './components/rentalPostDetails';
import Profile from './components/profile';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View } from 'react-native';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M3 10C3 6.22876 3 4.34315 4.17157 3.17157C5.34315 2 7.22876 2 11 2H13C16.7712 2 18.6569 2 19.8284 3.17157C21 4.34315 21 6.22876 21 10V14C21 17.7712 21 19.6569 19.8284 20.8284C18.6569 22 16.7712 22 13 22H11C7.22876 22 5.34315 22 4.17157 20.8284C3 19.6569 3 17.7712 3 14V10Z" stroke="#1C274C" stroke-width="1.5"></path> <path d="M6 12C6 10.5858 6 9.87868 6.43934 9.43934C6.87868 9 7.58579 9 9 9H15C16.4142 9 17.1213 9 17.5607 9.43934C18 9.87868 18 10.5858 18 12V16C18 17.4142 18 18.1213 17.5607 18.5607C17.1213 19 16.4142 19 15 19H9C7.58579 19 6.87868 19 6.43934 18.5607C6 18.1213 6 17.4142 6 16V12Z" stroke="#1C274C" stroke-width="1.5"></path> <path d="M7 6H12" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"></path> </g></svg>

function BottomTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          title: 'Feed',
          tabBarIconStyle: { display: "none" },
          headerTitleAlign: "center",
          headerTitleStyle: {
            color: "white",
          },
          tabBarIcon: () => {
            //not working
            return <View><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M3 10C3 6.22876 3 4.34315 4.17157 3.17157C5.34315 2 7.22876 2 11 2H13C16.7712 2 18.6569 2 19.8284 3.17157C21 4.34315 21 6.22876 21 10V14C21 17.7712 21 19.6569 19.8284 20.8284C18.6569 22 16.7712 22 13 22H11C7.22876 22 5.34315 22 4.17157 20.8284C3 19.6569 3 17.7712 3 14V10Z" stroke="#1C274C" stroke-width="1.5"></path> <path d="M6 12C6 10.5858 6 9.87868 6.43934 9.43934C6.87868 9 7.58579 9 9 9H15C16.4142 9 17.1213 9 17.5607 9.43934C18 9.87868 18 10.5858 18 12V16C18 17.4142 18 18.1213 17.5607 18.5607C17.1213 19 16.4142 19 15 19H9C7.58579 19 6.87868 19 6.43934 18.5607C6 18.1213 6 17.4142 6 16V12Z" stroke="#1C274C" stroke-width="1.5"></path> <path d="M7 6H12" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"></path> </g></svg></View>
          },
          headerStyle: {
            backgroundColor: "#d64161",
          },
        }}
      />
      <Tab.Screen
        name="PostItem"
        component={PostItemToRent}
        options={{
          title: 'Post Item',
          tabBarIconStyle: { display: "none" },
          headerTitleAlign: "center",
          headerTitleStyle: {
            color: "white",
          },
          headerStyle: {
            backgroundColor: "#d64161",
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          title: 'Profile',
          tabBarIconStyle: { display: "none" },
          headerTitleAlign: "center",
          headerTitleStyle: {
            color: "white",
          },
          tabBarLabelStyle: {
            fontWeight: "700",
            fontSize: 15
          },
          headerStyle: {
            backgroundColor: "#d64161",
          },
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Tabs"
          component={BottomTabs}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="RentalItemPost"
          component={RentalPostDetails}
          options={{
            title: 'Rental Post Details',
            headerTitleAlign: "center",
            headerTitleStyle: {
              color: "white"
            },
            headerStyle: {
              backgroundColor: "#d64161",
            }
          }}
        />
      </Stack.Navigator>
    </NavigationContainer >
  );
}