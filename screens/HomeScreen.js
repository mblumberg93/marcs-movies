import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { Button, Text } from 'react-native-elements';
import { EDITING_ENABLED } from '../secrets';

export const HomeScreen = ({ route, navigation }) => {

    const goToMoviesScreen = () => {
        navigation.navigate("Movies", { });
    }

    const goToListsScreen = () => {
        navigation.navigate("Lists", { });
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text h4 style={{marginBottom: 30}}>Need an idea for a movie to watch? Check out the lists!</Text>
            <Text h3 style={{marginBottom: 20}}>Movie Lists</Text>
            <Button title="See Lists"
                    onPress={goToListsScreen}
                    style={styles.button}></Button>
            { EDITING_ENABLED &&
                <React.Fragment>
                        <Text h3 style={{marginBottom: 20}}>Movie Management</Text>
                        <Button title="Manage"
                                onPress={goToMoviesScreen}
                                style={styles.button}></Button>
                </React.Fragment>
            }

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