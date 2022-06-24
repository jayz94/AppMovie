import { View, Text, TextInput, Button, StyleSheet,AsyncStorage } from 'react-native';
import { useFormik } from 'formik';
import React,{ useState, FC  } from 'react';
import { login } from '../api/MovieApi';
import {useNavigation,useFocusEffect } from '@react-navigation/native';

const Login : FC =() => {
    const [token,setToken] = useState("");
    const [error,setError] = useState("");

    useFocusEffect(
        React.useCallback(() => {
            AsyncStorage.getItem("token").then((value) => {
                const data = value;
              console.log(value);
                if (value !== null){
                    navigation.navigate('ListMovies');
                }
              });
          return () => {
          };
        }, []));

        
    const navigation = useNavigation();
    const formi = useFormik({
        initialValues: initValues(),
        onSubmit:(form)=> {
            const {user,password} = form;
                 login(user,password).then(r =>{ 
                if(r !== undefined){
                    setToken(r);
        AsyncStorage.setItem('token', token);
                    navigation.navigate('ListMovies');
                }else{
                    setError("Datos invalidos");}
                 });

        }
    });

    return (
        <View>
            <Text style={miEstilo.title}>Login</Text>
            <TextInput
                style={miEstilo.input}
                placeholder="Usuario"
                autoCapitalize='words'
                value={formi.values.user}
                onChangeText={(iUser)=> formi.setFieldValue("user",iUser)}></TextInput>
            <TextInput
                style={miEstilo.input}
                placeholder="Password"
                secureTextEntry={true}
                value={formi.values.password}
                onChangeText={(iPass)=> formi.setFieldValue("password",iPass)}
                ></TextInput>
            <Button style={miEstilo.button} title='Entrar' onPress={ formi.handleSubmit}></Button>
            <Text>{formi.errors.user}</Text>
            <Text>{formi.errors.password}</Text>
            <Text style={miEstilo.error}>{error}</Text>
        </View>
    );
}
export default Login ;
//start region function
function initValues(){
    return{
        user:"eve.holt@reqres.in",
        password:"cityslicka",
    }
}

const miEstilo = StyleSheet.create({
    title: {
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 20,
        marginTop: 20,
        marginBottom: 20,
    },
    input: {
        height: 40,
        marginTop: 5,
        marginHorizontal: 10,
        borderColor: "red",
    },
    button:{
        marginTop:25
    },
    error:{
        color:"red",
        fontSize: 20,
    }
});