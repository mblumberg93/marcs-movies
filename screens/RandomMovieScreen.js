import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { firebaseDB } from '../services/firebase';
import MovieCard from '../components/MovieCard';
import { Button } from 'react-native-elements';

export const RandomMovieScreen = ({ route, navigation }) => {
    const [movie, setMovie] = useState();
    const [movieIds, setMovieIds] = useState([]);

    useEffect(() => {
        setMovieIds(route.params.movieIds);
        refreshMovie(route.params.movieIds);
    }, []);

     const refreshMovie = (movies) => {
        const randomMovie = movies[Math.floor(Math.random() * movies.length)];
        firebaseDB.ref("movies/" + randomMovie).once('value', function(snapshot) {
            setMovie(snapshot.val());
        });
    }

    return (
        <View style={styles.container}>
            { movie && 
                <MovieCard movie={movie}></MovieCard>
            }
            <Button title="Refresh"
                    onPress={() => refreshMovie(movieIds)}
                    style={styles.button}></Button>
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20
    }
});