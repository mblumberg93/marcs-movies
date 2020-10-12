import React, { Component } from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { Text } from 'react-native-elements'
import { Button } from 'react-native-elements';

class MovieCard extends Component {
    handlePress() {
        if (this.props.onPress) {
            this.props.onPress(this.props.movie.id);
        }
    }

    handleEdit() {
        if (this.props.editable && this.props.onEdit) {
            this.props.onEdit(this.props.movie);
        }
    }

    render() {
        const movieAttributeStyle = {
            marginTop: 5,
            marginBottom: 5
        }
        const movieAttributeNameStyle = {
            fontWeight: "bold"
        }
        return (
            <React.Fragment>
                { this.props.movie != null && 
                    <TouchableOpacity style={styles.movieCard} onPress={() => this.handlePress(this.props.movie.id)}>
                        <View style={{ flex: 1, flexDirection: 'row', marginBottom: 10 }}>
                            <Text h4 style={{ flexGrow: 1 }}>{this.props.movie.title} ({this.props.movie.year})</Text>
                            { this.props.editable &&
                                <Button title="Edit" 
                                        type="outline" 
                                        titleStyle={{ fontSize: 12 }} 
                                        onPress={() => this.handleEdit()}/>
                            }
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <Image source={{uri: this.props.movie.poster}} 
                                style={{ flex: 1, resizeMode: 'contain', margin: 10 }}></Image>
                            <View style={{ flex: 1 }}>
                                <Text style={movieAttributeStyle}>
                                    <Text style={movieAttributeNameStyle}>Genres: </Text>
                                    {this.props.movie.genre} 
                                </Text>
                                <Text style={movieAttributeStyle}>
                                    <Text style={movieAttributeNameStyle}>Runtime: </Text>
                                    {this.props.movie.runtime} 
                                </Text>
                                <Text style={movieAttributeStyle}>
                                    <Text style={movieAttributeNameStyle}>Actors: </Text>
                                    {this.props.movie.actors} 
                                </Text>
                                <Text style={movieAttributeStyle}>
                                    <Text style={movieAttributeNameStyle}>Director: </Text>
                                    {this.props.movie.director} 
                                </Text>
                                <Text style={movieAttributeStyle}>
                                    <Text style={movieAttributeNameStyle}>IMDB Rating: </Text>
                                    {this.props.movie.imdbRating} 
                                </Text>              
                            </View>
                        </View>
                        <Text style={movieAttributeStyle}>{this.props.movie.plot}</Text>
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
    }
});