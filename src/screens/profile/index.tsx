import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import tw from 'twrnc';
import { RED_ALERT_APP, LIGHT_GRAY_APP, DARK_GRAY_APP } from '../../style/colors';
import { useStore } from '../../store/root.store';
import * as ImagePicker from 'expo-image-picker';
import { MaterialIcons } from '@expo/vector-icons';

export const Profile: React.FC = () => {
    const {
        authStore: { firebaseSignOut },
        navigationStore: { changeLoginValue },
        profileStore: { getUserData }
    } = useStore('');
    const [username, setUsername] = useState<string>('')
    const [profileImage, setProfileImage] = useState<string>('');
    const [isProfileImage, setIsProfileImage] = useState<boolean>(false);

    useEffect(() => {
        const getUserName = async() => {
            const username = await getUserData();
            if(username) setUsername(username)

        };
        getUserName()
    }, []);

    const pickProfileImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.cancelled) {
            setIsProfileImage(true);
            setProfileImage(result.uri);
        }
    };

    const signOut = async () => {
        const logOut = await firebaseSignOut();
        if (logOut) changeLoginValue(false)
    }
    return (
        <View style={[tw`items-center px-2 py-10 bg-white`, styles.container]}>
            {isProfileImage? 
                <View>
                    <TouchableOpacity style={[tw`w-40 h-40 rounded-full`, styles.profileImg]} onPress={() => pickProfileImage()}>
                        <Image source={{ uri: profileImage }} style={[tw`w-40 h-40 rounded-full`, styles.profileImg]} />
                    </TouchableOpacity>
                </View>
            :
                <View>
                    <TouchableOpacity style={[tw`w-40 h-40 rounded-full items-center flex justify-center`, styles.profileImg]} onPress={() => pickProfileImage()}>
                        <MaterialIcons name="add-a-photo" size={40} color={DARK_GRAY_APP} />
                    </TouchableOpacity>
                </View>
            }
            <View style={tw`mt-5`}>
                <Text style={tw`text-lg`}>{username}</Text>
            </View>
            <View style={tw`absolute bottom-0`}>
                <TouchableOpacity style={tw`py-5 w-full`} onPress={() => signOut()}>
                    <Text style={[tw`text-lg`, styles.LogoutText]}>Cerrar Sesión</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    LogoutText: {
        color: RED_ALERT_APP,
    },

    profileImg: {
        backgroundColor: LIGHT_GRAY_APP,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    }
});
