import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import AddMovieForm from "../components/AddMovieForm";

export const AddMovieScreen = ({ route, navigation }) => {
    return (
        <SafeAreaView>
            <AddMovieForm></AddMovieForm>
        </SafeAreaView>
    );
};