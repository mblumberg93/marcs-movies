import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { Button, Text } from 'react-native-elements';

export const HomeScreen = ({ route, navigation }) => {
    const goToAddMovieScreen = () => {
        navigation.navigate("Add Movie", { });
    }

    const goToMoviesScreen = () => {
        navigation.navigate("Movies", { });
    }

    const goToListsScreen = () => {
        navigation.navigate("Lists", { });
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text h3 style={{marginBottom: 20}}>Lists</Text>
            <Button title="View Lists"
                    onPress={goToListsScreen}
                    style={styles.button}></Button>
            <Text h3 style={{marginBottom: 20}}>Movie Management</Text>
            <Button title="View Movies"
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
      margin: 20
    },
    button: {
        marginBottom: 20
    }
  });