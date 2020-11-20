import React, { Component } from 'react';
import { Input, Button } from 'react-native-elements'
import { View, StyleSheet } from "react-native";
import { firebaseDB } from '../services/firebase';
import MovieCard from '../components/MovieCard';

class AddMovieForm extends Component {
    constructor(props) {
        super(props)
        this.state = { 
            imdbID: '',
            movie: null
        }
    }

    handleImdbIDChange(e) {
        if (e) {
            const value = e.toLowerCase();
            this.setState({ imdbID: value });
        }
    }

    handleSearch() {
        const url = "https://movie-database-imdb-alternative.p.rapidapi.com/?r=json&i=" + this.state.imdbID;
        fetch(url, {
            method: "GET",
            headers: {
                "x-rapidapi-host": "movie-database-imdb-alternative.p.rapidapi.com",
                "x-rapidapi-key": this.props.rapid_api_key,
                "useQueryString": true
            },
          }).then(response => response.json())
           .then(result =>  {
               this.parseMovieData(result);
               this.setState({ imdbID: '' });
            });
    }

    parseMovieData(movieData) {
        const movie = {
            title: movieData.Title,
            year: movieData.Year,
            genre: movieData.Genre,
            actors: movieData.Actors,
            runtime: movieData.Runtime,
            director: movieData.Director,
            imdbRating: movieData.imdbRating,
            plot: movieData.Plot,
            poster: movieData.Poster
        }
        this.setState({ movie: movie });
    }

    handleAddMovie() {
        firebaseDB.ref('movies').push(this.state.movie);
        this.props.onReturnHome();
    }

    handleBack() {
        this.setState({ movie: null });
    }

    render() {
        return (
            <View style={styles.container}>
                { this.state.movie == null &&
                    <React.Fragment>
                        <Input label="IMDB Movie ID"
                               onChangeText={(e) => this.handleImdbIDChange(e)}></Input>
                        <Button title="Search IMBD"
                                onPress={() => this.handleSearch()}></Button>
                    </React.Fragment>
                }
                { this.state.movie != null && 
                    <React.Fragment>
                        <MovieCard movie={this.state.movie}></MovieCard>
                        <Button title="Add Movie"
                                onPress={() => this.handleAddMovie()}
                                containerStyle={{ marginBottom: 15 }}></Button>
                        <Button title="Back to Search"
                                onPress={() => this.handleBack()}
                                containerStyle={{ marginBottom: 15 }}></Button>
                    </React.Fragment>
                }
            </View>
        )
    }
};

export default AddMovieForm;

const styles = StyleSheet.create({
    container: {
      padding: 20
    }
});