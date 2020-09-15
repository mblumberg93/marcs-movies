import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { firebaseDB } from '../services/firebase';
import MovieCard from '../components/MovieCard';

export const MoviesScreen = ({ route, navigation }) => {
    const [movies, setMovies] = useState();

    useEffect(() => {
        firebaseDB.ref("movies").once('value', function(snapshot) {
            let data = []
            snapshot.forEach(datapoint => {
                const movie = datapoint.val();
                movie.id = datapoint.key
                data.push(movie);
            })
            data.sort(function(a, b) {
                const aTitle = a.title.toLowerCase();
                const bTitle = b.title.toLowerCase();
                return (aTitle < bTitle) ? -1 : (aTitle > bTitle) ? 1 : 0;
            });
            setMovies(data);
        });
     }, []);

    return movies ? (
        <View style={styles.container}>
            { movies.map(movie => 
                <MovieCard key={movie.id} movie={movie}></MovieCard>
            )}
        </View>
      ) : (
        <View style={styles.container}>
            <Text>Loading...</Text>
        </View>
      );
};

const styles = StyleSheet.create({
    container: {
        padding: 20
    }
});