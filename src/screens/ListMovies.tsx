import { View, Text,TextInput,Button, StyleSheet, FlatList, ActivityIndicator  } from 'react-native';
import React, { useState, useEffect, FC  } from 'react';
import { useFormik } from 'formik';
import { getMovies,searchApi } from '../api/MovieApi';
import MovieDetail from "../screens/MovieDetail";

const ListMovies : FC =() => {
    const [movies, setMovies] = useState([]);
    const [next, setNext] = useState(null);

    const loadMore = () => {
    }
    useEffect(() => {
        (async () => {
            await getMoviesL()
        })();
    }, []);
    //search
    const formS = useFormik({
        initialValues: initValues(),
        onSubmit:(form)=> {
            const {texto} = form;
         search(texto);
        }
    });
    //esta funcion la pasamos a pokemon list para que se pueda ejecutar
    const getMoviesL = async () => {
        try {
            const movieArray = [];
             getMovies().then(r =>{  
                for (const item of r.results) {
                    movieArray.push({
                        id:item.id,
                        title: item.title,
                        poster: item.poster_path,
                        release_date: item.release_date,
                        overview: item.overview,
                        avg:""
                    });
            }
            setMovies([...movies, ...movieArray]);
                 });
            
        }
        catch (error) {
        }
    }
    //search
    const search = async (texto) => {
        try {
            const movieArray = [];
             searchApi(texto).then(r =>{  
                for (const item of r.results) {
                    movieArray.push({
                        id:item.id,
                        title: item.title,
                        poster: item.poster_path,
                        release_date: item.release_date,
                        overview: item.overview,
                        avg:""
                    });
            }
            
            setMovies(movieArray);
                 });
            
        }
        catch (error) {
        }
    }

    return (
        <View>
            <Text  style={styles.title}>Populares</Text>
            <View>
            <TextInput
                style={styles.input}
                placeholder="Buscar"
                value={formS.values.texto}
                onChangeText={(input)=> formS.setFieldValue("texto",input)}></TextInput>
            <Button style={styles.button} title='Buscar' onPress={ formS.handleSubmit}></Button>
        </View>
            <FlatList
            data={movies}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            keyExtractor={(movie) => String(movie.id)}
            renderItem={({ item }) => <MovieDetail pId={item.id} isList={true} key={item.id} title={item.title} poster={item.poster} date={item.release_date} overview={item.overview}></MovieDetail>}
            contentContainerStyle={styles}
            onEndReached={next && loadMore}
            onEndReachedThreshold={0.1}
            ListFooterComponent= {
                next && (
                    <ActivityIndicator
                        size="large"
                        color="#AEAEAE"
                    ></ActivityIndicator>
                )
            }
        />
        </View>
    );
}

function initValues(){
    return{
        texto:""
    }
}
export default ListMovies ;
const styles = StyleSheet.create({
    flatListContentContainer: {
        paddingHorizontal: 6,
    },
    title:{
        fontSize: 20
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
});

