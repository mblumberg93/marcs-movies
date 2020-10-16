import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { firebaseDB } from '../services/firebase';
import { Button } from 'react-native-elements';
import MovieCard from '../components/MovieCard';

export const ListScreen = ({ route, navigation }) => {
    const [listId, setListId] = useState();
    const [movieIds, setMovieIds] = useState([]);
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        setListId(route.params.id);
        setMovieIds(route.params.movieIds);
        refreshMovies(route.params.movieIds);
        const navSubscription = navigation.addListener('focus', () => {
            refreshMovies(route.params.movieIds);
        });
    }, []);

    const refreshMovies = (ids) => {
        setMovies([]);
        firebaseDB.ref("movies").once('value', function(snapshot) {
            let data = []
            snapshot.forEach(datapoint => {
                const movie = datapoint.val();
                movie.id = datapoint.key;
                data.push(movie);
            })
            data = data.filter(movie => ids.includes(movie.id));
            data.sort(function(a, b) {
                const aTitle = a.title.toLowerCase();
                const bTitle = b.title.toLowerCase();
                return (aTitle < bTitle) ? -1 : (aTitle > bTitle) ? 1 : 0;
            });
            setMovies(data);
        });
    };

    const goToAddMoviesScreen = () => {
        navigation.navigate("Add Movie To List", { listId: listId, movieIds: movieIds });
    }

    const goToEditMovieScreen = (movie) => {
        navigation.navigate("Remove Movie From List", { listId: listId, movieIds: movieIds, movie: movie });
    }

    const goToRandomMovieScreen = () => {
        navigation.navigate("Random Movie", { movieIds: movieIds });
    }

    return (
        <View style={styles.container}>
            <Button title="Random Movie"
                    onPress={goToRandomMovieScreen}
                    style={styles.button}></Button>
            <Button title="Add Movie"
                    onPress={goToAddMoviesScreen}
                    style={styles.button}></Button>
            { movies.map(movie => 
                <MovieCard key={movie.id} 
                           movie={movie}
                           editable={true}
                           onEdit={goToEditMovieScreen}></MovieCard>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20
    },
    button: {
        marginBottom: 20
    }
});