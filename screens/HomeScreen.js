import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { Button } from 'react-native-elements';

export const HomeScreen = ({ route, navigation }) => {
    const goToAddMovieScreen = () => {
        navigation.navigate("Add Movie", { });
    }
    const goToMoviesScreen = () => {
        navigation.navigate("Movies", { });
    }

    return (
        <SafeAreaView style={styles.container}>
            <Button title="Movies"
                    onPress={goToMoviesScreen}
                    style={styles.button}></Button>
            <Button title="Add Movie"
                    onPress={goToAddMovieScreen}
                    style={styles.button}></Button>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    button: {
        marginBottom: 20
    }
  });