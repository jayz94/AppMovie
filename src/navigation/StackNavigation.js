import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import {useNavigation} from "@react-navigation/native";
import Login from "../screens/Login";
import Splash from "../screens/Splash";
import ListMovies from "../screens/ListMovies";
import movieDetailAll from "../screens/movieDetailAll";

const Stack = createStackNavigator();
export default function StackNavigation(){
    const navigation = useNavigation();
    setTimeout(() => { navigation.navigate('Login')}, 6000);
   
    return(
        <Stack.Navigator> 
        <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false}}/>
            <Stack.Screen name="Login" component={Login}  options={{ headerShown: false}}/>
            <Stack.Screen name="ListMovies" component={ListMovies}  options={{ headerShown: false}}/>
            <Stack.Screen name="MovieDetailAll" component={movieDetailAll}/>
        </Stack.Navigator>
    );
}