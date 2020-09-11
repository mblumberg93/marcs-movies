import React, { Component } from 'react';
import { Input, Button, Divider } from 'react-native-elements'
import { View, StyleSheet, Text } from "react-native";
import { RAPID_API_KEY } from '../secrets';

class AddMovieForm extends Component {
    constructor(props) {
        super(props)
        this.state = { 
            imdbID: '',
            movie: null
        }
    }

    handleImdbIDChange(e) {
        this.setState({ imdbID: e });
    }

    handleSearch() {
        const url = "https://movie-database-imdb-alternative.p.rapidapi.com/?r=json&i=" + this.state.imdbID
        fetch(url, {
            method: "GET",
            headers: {
                "x-rapidapi-host": "movie-database-imdb-alternative.p.rapidapi.com",
                "x-rapidapi-key": RAPID_API_KEY,
                "useQueryString": true
            },
          }).then(response => response.json())
           .then(result =>  {
               this.parseMovieData(result);
               this.setState({ imdbID: '' });
            });
    }

    parseMovieData(movieData) {
        //TODO handle creating a "movie" object
        console.log(movieData);
    }

    render() {
        return (
            <View style={styles.container}>
                <Input label="IMDB Movie ID"
                       onChangeText={(e) => this.handleImdbIDChange(e)}></Input>
                <Button title="Search IMBD"
                        onPress={() => this.handleSearch()}></Button>
            </View>
        )
    }
};

export default AddMovieForm;

const styles = StyleSheet.create({
    container: {
      padding: 20
    },
  });