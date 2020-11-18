import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { firebaseDB } from '../services/firebase';
import { Button, Text } from 'react-native-elements';
import MovieCard from '../components/MovieCard';
import { EDITING_ENABLED } from '../secrets';

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
            data = shuffle(data);
            setMovies(data);
        });
    };

    function shuffle(list) {
        for (let i = list.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [list[i], list[j]] = [list[j], list[i]];
        }
        return list;
    }

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
            <Text h3 style={{marginBottom: 20}}>Total Movies: {movies.length}</Text>
            <Button title="Random Movie"
                    onPress={goToRandomMovieScreen}
                    style={styles.button}></Button>
            { EDITING_ENABLED && 
                <Button title="Add Movie"
                        onPress={goToAddMoviesScreen}
                        style={styles.button}></Button>
            }
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