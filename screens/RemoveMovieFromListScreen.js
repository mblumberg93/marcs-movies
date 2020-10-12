import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Text } from 'react-native-elements'
import { Button } from 'react-native-elements';
import { firebaseDB } from '../services/firebase';

export const RemoveMovieFromListScreen = ({ route, navigation }) => {
    const [listId, setListId] = useState();
    const [movie, setMovie] = useState({});
    const [movieIds, setMovieIds] = useState([]);

    useEffect(() => {
        setListId(route.params.listId);
        setMovie(route.params.movie);
        setMovieIds(route.params.movieIds);
    }, []);

    const cancel = () => {
        navigation.navigate("List", { id: listId, movieIds: newMovieIds });
    }

    const remove = () => {
        firebaseDB.ref('lists/' + listId + '/movies').once('value', function(snapshot) {
            snapshot.forEach(datapoint => {
                if (datapoint.val() == movie.id) {
                    datapoint.ref.remove().then(() => {
                        backToList();
                    });
                }
            });
        });
    }

    const backToList = () => {
        const newMovieIds = movieIds;
        const index = newMovieIds.indexOf(movie.id);
        newMovieIds.splice(index, 1);
        navigation.navigate("List", { id: listId, movieIds: newMovieIds });
    }

    return (
        <View style={styles.container}>
            <Text h4 style={{ marginBottom: 20 }}>Remove {movie.title} ({movie.year}) from the list?</Text>
            <Button title="Remove"
                    onPress={remove}
                    style={styles.button}></Button>
            <Button title="Cancel"
                    onPress={cancel}
                    style={styles.button} 
                    type="outline"></Button>
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