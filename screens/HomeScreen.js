import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { Button } from 'react-native-elements';

export const HomeScreen = ({ route, navigation }) => {
    const goToAddMovieScreen = () => {
        navigation.navigate("Add Movie", { });
    }

    return (
        <SafeAreaView style={styles.container}>
            <Button title="Add Movie"
                    onPress={goToAddMovieScreen}></Button>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });