import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { firebaseDB } from '../services/firebase';
import { Button, Input } from 'react-native-elements';

export const ListScreen = ({ route, navigation }) => {
    const [listId, setListId] = useState();
    const [movies, setMovies] = useState();

    useEffect(() => {
        setListId(route.params.id);
        refreshMovies();
    }, []);

    const refreshMovies = () => {
        setMovies([]);
        //TODO fetch movies here
    };

    const goToAddMoviesScreen= () => {
        navigation.navigate("Add Movie To List", { listId: listId });
    }

    return (
        <View style={styles.container}>
            <Button title="Add Movie"
                    onPress={goToAddMoviesScreen}
                    style={styles.button}></Button>
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