import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button, Input } from 'react-native-elements';
import { firebaseAuth, firebaseDB } from '../services/firebase';
import { useDispatch } from 'react-redux'
import { updateState } from '../actions';

export const LoginScreen = ({ route, navigation }) => { 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    const handleEmailChange = (e) => {
        setEmail(e);
    }

    const handlePasswordChange = (e) => {
        setPassword(e);
    }

    const updateAppState = updates => dispatch(updateState(updates))

    const handleSubmit = () => {
        firebaseAuth.signInWithEmailAndPassword(email, password)
        .then((user) => {
            retrieveAPIKey(user);
        }).catch((error) => {
           console.log(error);
        });
    }
    
    const retrieveAPIKey = (user) => {
        firebaseDB.ref("rapid_api_key").once('value', function(snapshot) {
            let updates = {
                user: user,
                can_edit: true,
                rapid_api_key: snapshot.val()
            }
            updateAppState(updates);
            navigation.navigate("Home", { });
        })
    }

    return (
        <View style={styles.container}>
            <Input label="Email"
                   onChangeText={handleEmailChange}></Input>
            <Input label="Password"
                   secureTextEntry={true}
                   onChangeText={handlePasswordChange}></Input>
            <Button title="Submit"
                    onPress={handleSubmit}></Button>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20
    }
});

export default LoginScreen;