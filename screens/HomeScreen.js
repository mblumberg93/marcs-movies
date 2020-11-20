import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { Button, Text } from 'react-native-elements';
import { useSelector } from 'react-redux';

export const HomeScreen = ({ route, navigation }) => {
    const appState = useSelector(state => state);

    const goToMoviesScreen = () => {
        navigation.navigate("Movies", { });
    }

    const goToListsScreen = () => {
        navigation.navigate("Lists", { });
    }

    const goToLogin = () => {
        navigation.navigate("Login", { });
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text h4 style={{marginBottom: 30}}>Need an idea for a movie to watch? Check out the lists!</Text>
            <Text h3 style={{marginBottom: 20}}>Movie Lists</Text>
            <Button title="See Lists"
                    onPress={goToListsScreen}
                    style={styles.button}></Button>
            { appState.can_edit &&
                <React.Fragment>
                        <Text h3 style={{marginBottom: 20}}>Movie Management</Text>
                        <Button title="Manage"
                                onPress={goToMoviesScreen}
                                style={styles.button}></Button>
                </React.Fragment>
            }
                <Button title="Admin Login"
                        type="outline"
                        onPress={goToLogin}
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