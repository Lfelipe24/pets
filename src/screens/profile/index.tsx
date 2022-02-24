import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import tw from 'twrnc';
import { RED_ALERT_APP} from '../../style/colors';
import { useStore } from '../../store/root.store';

export const Profile: React.FC = () => {
    const {authStore: {firebaseSignOut}, navigationStore: {changeLoginValue}} = useStore('');

    const signOut = async() => {
        const logOut = await firebaseSignOut();
        if (logOut) changeLoginValue(false)
    }
    return (
        <View style={[tw`flex justify-end px-2 py-5`, styles.container]}>
            <TouchableOpacity style={[tw`h-15 mt-12`, styles.buttonWraper]} onPress={() => signOut()}>
                <Text style={tw`text-white text-lg`}>Cerrar Sesión</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },

    buttonWraper: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        backgroundColor: RED_ALERT_APP,

    },
});
