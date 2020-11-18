import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { firebaseDB } from '../services/firebase';
import { Button, Input } from 'react-native-elements';
import { EDITING_ENABLED } from '../secrets';

export const ListsScreen = ({ route, navigation }) => {
    const [lists, setLists] = useState();
    const [isAdding, setIsAdding] = useState(false);
    const [newList, setNewList] = useState();

    useEffect(() => {
        setIsAdding(false);
        refreshLists();
     }, []);

    const refreshLists = () => {
        firebaseDB.ref("lists").once('value', function(snapshot) {
            let data = []
            snapshot.forEach(datapoint => {
                var list = datapoint.val();
                list.id = datapoint.key;
                if (list.movies) {
                    list.movieIds = Object.entries(list.movies).map(([k,v]) => v);
                } else {
                    list.movies = [];
                    list.movieIds = [];
                }
                data.push(list);
            })
            data.sort(function(a, b) {
                const aName = a.name.toLowerCase();
                const bName= b.name.toLowerCase();
                return (aName < bName) ? -1 : (aName > bName) ? 1 : 0;
            });
            setLists(data);
        });
    }

    const showListForm = () => {
        setIsAdding(true);
    }

    const handleNameChange = (e) => {
        setNewList(e)
    }

    const cancelAdd = () => {
        setIsAdding(false);
    }

    const addList = () => {
        firebaseDB.ref('lists').push({ name: newList });
        setIsAdding(false);
        refreshLists();
    }

    const goToListScreen = (id, name, movieIds) => {
        navigation.navigate("List", { id: id, name: name, movieIds: movieIds});
    }

    return isAdding ? (
        <View style={styles.container}>
            <Input label="List Name"
                   onChangeText={handleNameChange}></Input>
            <Button title="Add"
                    onPress={addList}
                    style={styles.button}></Button>
            <Button title="Cancel"
                    onPress={cancelAdd}
                    style={styles.button}></Button>
        </View>
        ) : lists ? (
        <View style={styles.container}>
            { lists.map(list => 
                <Button key={list.id}
                        title={list.name}
                        type="outline" 
                        style={styles.button} 
                        onPress={() => goToListScreen(list.id, list.name, list.movieIds)}/>
            )}
            { EDITING_ENABLED && 
                <Button title="Add List"
                        onPress={showListForm}></Button>
            }
        </View>
        ) : (
        <View style={styles.container}>
            <Text>Loading...</Text>
        </View>
      );
};

const styles = StyleSheet.create({
    container: {
        padding: 20
    },
    button: {
        marginBottom: 20
    }
});