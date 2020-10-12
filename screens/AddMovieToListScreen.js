import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { firebaseDB } from '../services/firebase';
import MovieCard from '../components/MovieCard';

export const AddMovieToListScreen = ({ route, navigation }) => {
    const [listId, setListId] = useState();
    const [movieIds, setMovieIds] = useState([]);
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        setListId(route.params.listId);
        setMovieIds(route.params.movieIds);
        refreshMovies(route.params.movieIds);
        const navSubscription = navigation.addListener('focus', () => {
            refreshMovies(route.params.movieIds);
        });
    }, []);

    const refreshMovies = (ids) => {
        firebaseDB.ref("movies").once('value', function(snapshot) {
            let data = []
            snapshot.forEach(datapoint => {
                const movie = datapoint.val();
                movie.id = datapoint.key;
                data.push(movie);
            });
            data = data.filter(movie => !ids.includes(movie.id));
            data.sort(function(a, b) {
                const aTitle = a.title.toLowerCase();
                const bTitle = b.title.toLowerCase();
                return (aTitle < bTitle) ? -1 : (aTitle > bTitle) ? 1 : 0;
            });
            setMovies(data);
        });
    }

    const addMovieToList = (movieId) => {
        firebaseDB.ref('lists/' + listId + '/movies').push(movieId).then(() => {
            const newMovieIds = movieIds;
            newMovieIds.push(movieId);
            navigation.navigate("List", { id: listId, movieIds: newMovieIds });
        });
    }

    return movies ? (
        <View style={styles.container}>
            { movies.map(movie => 
                <MovieCard key={movie.id} 
                           movie={movie}
                           onPress={addMovieToList}></MovieCard>
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