import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { firebaseDB } from '../services/firebase';
import MovieCard from '../components/MovieCard';
import { Button } from 'react-native-elements';

export const MoviesScreen = ({ route, navigation }) => {
    const [movies, setMovies] = useState();

    useEffect(() => {
        refreshMovies();
        const navSubscription = navigation.addListener('focus', () => {
            refreshMovies();
        });
     }, []);

     const refreshMovies = () => {
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
     }

     const goToAddMovieScreen = () => {
        navigation.navigate("Add Movie", { });
    }

    return movies ? (
        <View style={styles.container}>
            <Button title="Add Movie"
                    onPress={goToAddMovieScreen}
                    style={styles.button}></Button>
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
    },
    button: {
        marginBottom: 20
    }
});