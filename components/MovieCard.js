import React, { Component } from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { Text } from 'react-native-elements'

class MovieCard extends Component {
    render() {
        return (
            <React.Fragment>
                { this.props.movie != null && 
                    <TouchableOpacity style={styles.movieCard}>
                        <Text h4>{this.props.movie.title} ({this.props.movie.year})</Text>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <Image source={{uri: this.props.movie.poster}} 
                                style={{ flex: 1, resizeMode: 'contain', margin: 10 }}></Image>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.movieAttribute}>
                                    <Text style={styles.movieAttributeName}>Genres: </Text>
                                    {this.props.movie.genre} 
                                </Text>
                                <Text style={styles.movieAttribute}>
                                    <Text style={styles.movieAttributeName}>Runtime: </Text>
                                    {this.props.movie.runtime} 
                                </Text>
                                <Text style={styles.movieAttribute}>
                                    <Text style={styles.movieAttributeName}>Actors: </Text>
                                    {this.props.movie.actors} 
                                </Text>
                                <Text style={styles.movieAttribute}>
                                    <Text style={styles.movieAttributeName}>Director: </Text>
                                    {this.props.movie.director} 
                                </Text>
                                <Text style={styles.movieAttribute}>
                                    <Text style={styles.movieAttributeName}>IMDB Rating: </Text>
                                    {this.props.movie.imdbRating} 
                                </Text>              
                            </View>
                        </View>
                        <Text style={styles.movieAttribute}>{this.props.movie.plot}</Text>
                    </TouchableOpacity>
                }
            </React.Fragment>
        )
    }
}

export default MovieCard;

const styles = StyleSheet.create({
    movieCard: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        marginBottom: 20
    },
    movieAttribute: {
        marginTop: 5,
        marginBottom: 5
    },
    movieAttributeName: {
        fontWeight: "bold"
    }
});