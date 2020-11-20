import React from "react";
import { SafeAreaView } from "react-native";
import AddMovieForm from "../components/AddMovieForm";
import { useSelector } from 'react-redux';

export const AddMovieScreen = ({ route, navigation }) => {
    const appState = useSelector(state => state);

    const goHomeScreen = () => {
        navigation.navigate("Movies", { });
    }

    return (
        <SafeAreaView>
            <AddMovieForm onReturnHome={goHomeScreen}
                          rapid_api_key={appState.rapid_api_key}></AddMovieForm>
        </SafeAreaView>
    );
};