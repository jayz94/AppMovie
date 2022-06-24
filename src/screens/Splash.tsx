import { SafeAreaView, StyleSheet } from 'react-native';
import React,{FC} from 'react';
import * as Animatable from 'react-native-animatable';
import Lottie from 'lottie-react-native';

const Splash : FC =() => {
    return (
        <SafeAreaView>
           <Animatable.Text style={styles.title} animation="slideInDown" iterationCount={5} direction="alternate">Bienvenido</Animatable.Text>
           <Lottie source={require('../../assets/smile.json')} autoPlay loop />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 60,
        textAlign:'center',
        height:'100%'
    },
});

export default Splash ;