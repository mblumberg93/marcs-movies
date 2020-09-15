import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { firebaseDB } from '../services/firebase';
import { Button, Input } from 'react-native-elements';

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
            const data = [];
            const datapoints = snapshot.val();
            const ids = datapoints ? Object.keys(datapoints) : [];
            ids.forEach(id => {
                var list = { name: datapoints[id] };
                list.id = id
                data.push(list);
            });
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
        firebaseDB.ref('lists').push(newList);
        setIsAdding(false);
        refreshLists();
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
                        style={styles.button} />
            )}
            <Button title="Add List"
                    onPress={showListForm}></Button>
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