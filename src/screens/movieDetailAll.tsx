import { StyleSheet, View, FlatList } from "react-native";
import React, { useEffect, useState, FC } from "react";
import MovieDetail from "./MovieDetail";
import { getMovieApi,getMovieSimilarApi } from '../api/MovieApi';

const movieDetailAll : FC =(props) =>  {
    const { route: { params } } = props;
    const [movie, setMovie] = useState([]);
    const [movies, setMovies] = useState([]);
    const [next, setNext] = useState(null);

    useEffect(() => {
        (async () => {
            await getMovie();
        })();
    }, [props]);
    
    const getMovie= async () => {
        try {
             getMovieApi(params.id).then(r =>{setMovie({
                        id:r.id,
                        title: r.title,
                        poster: r.poster_path,
                        release_date: r.release_date,
                        overview: r.overview,
                        avg:""
                    });
                 });
            //similars
            const movieArray = [];
            getMovieSimilarApi(params.id).then(r =>{  
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
    return (
        <View  style={{ height: '100%' }}>
            <MovieDetail   style={{ height: '30%'}} key={movie.id} isList={false} title={movie.title} poster={movie.poster} date={movie.release_date} overview={movie.overview}></MovieDetail>
           
            <FlatList  style={{ height: '70%', borderTopColor: 'blue', borderTopWidth: 4 }}
            data={movies}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            keyExtractor={(movie) => String(movie.id)}
            renderItem={({ item }) => <MovieDetail pId={item.id} isList={true}  key={item.id} title={item.title} poster={item.poster} date={item.release_date} overview={item.overview}></MovieDetail>}
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
const myStyle = StyleSheet.create({
    detail:{
        height:'10%'
    },
    card:
    {
        flex: 1,
        height:'100%',
    },
    spacing:
    {
        flex: 1,
        padding: 5,
    },
    bgStyle: {
        flex: 1,
        borderRadius: 15,
        padding: 10
    },
    img: {
        bottom: 1,
        right: 2,
        height: 400,
        width: 200
    },
    title:{
        fontWeight:'bold'
    },
    flatListContentContainer: {
    },
    title:{
        fontSize: 50
    }
});

export default movieDetailAll ;