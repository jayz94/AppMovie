import { ScrollView, Text, StyleSheet, View, Image,Button } from "react-native";
import {useNavigation } from '@react-navigation/native';
import React,{ FC } from "react";

const MovieDetail : FC =(props) => {
    const {pId, title, date, poster, overview,isList } = props;
    const navigation = useNavigation();

    return (
        <ScrollView> 
            <View style={myStyle.card}>
                <View style={myStyle.spacing}>
                    <View onPress={ () => more(pId)}>
                        <Image source={{ uri: 'https://www.themoviedb.org/t/p/w300_and_h450_bestv2/' + poster }}  style={myStyle.img} />
                        <Text  style={myStyle.title}>{title}</Text>
                        <Text>{date}</Text>
                        <Text>{overview}</Text>
                        {isList && 
                        <Button style={myStyle.button} title='More' onPress={ () => {
                            navigation.navigate("MovieDetailAll",{
                                id:pId
                            });
                        }}></Button>
                        }
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}
export default MovieDetail ;

const myStyle = StyleSheet.create({
    card:
    {
        flex: 1,
        height: "1%",
    },
    img: {
        height:150,
        width: 60,
    },
    title:{
        fontWeight:'bold'
    }
});