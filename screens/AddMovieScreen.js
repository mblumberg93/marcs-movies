import React from "react";
import { SafeAreaView } from "react-native";
import AddMovieForm from "../components/AddMovieForm";

export const AddMovieScreen = ({ route, navigation }) => {
    const goHomeScreen = () => {
        navigation.navigate("Home", { });
    }

    return (
        <SafeAreaView>
            <AddMovieForm onReturnHome={goHomeScreen}></AddMovieForm>
        </SafeAreaView>
    );
};