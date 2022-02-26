import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import { Overlay } from "react-native-elements";
import tw from 'twrnc';
import { RED_ALERT_APP, LIGHT_GRAY_APP, MID_GRAY_APP, DARK_GRAY_APP, BLUE_APP } from '../../style/colors';
import { useStore } from '../../store/root.store';
import { MaterialIcons } from '@expo/vector-icons';

export const Profile: React.FC = () => {
    const {
        authStore: { firebaseSignOut },
        navigationStore: { changeLoginValue },
        profileStore: { getUserData, pickProfileImage, imageProfile }
    } = useStore('');
    const [username, setUsername] = useState<string>('')
    const [profileImage, setProfileImage] = useState<string>('');
    const [isProfileImage, setIsProfileImage] = useState<boolean>(false);
    const [showImgModal, setShowImgModal] = useState<boolean>(false);

    useEffect(() => {
        const getUserName = async () => {
            const username = await getUserData();
            if (username) setUsername(username)

        };
        getUserName()
    }, []);

    const pickImage = async() => {
        const result = await pickProfileImage();
        if(result) {
            setShowImgModal(false);
            setIsProfileImage(true)
        }
    }

    const signOut = async () => {
        const logOut = await firebaseSignOut();
        if (logOut) changeLoginValue(false)
    }

    const showImgOverlay = () => {
        return (
            <Overlay 
            isVisible={showImgModal} 
            animationType={'fade'} 
            onBackdropPress={() => setShowImgModal(false)}
            overlayStyle={tw`w-full absolute bottom-0 pb-15 rounded-t-3xl`}
            backdropStyle={tw`h-full`}>
                <TouchableOpacity style={[tw`py-4 border-b rounded-3xl`, styles.ImgPickerBtn]} onPress={() => pickImage()}>
                    <Text style={[tw`text-lg text-center`, styles.ImgPickerText]}>Editar foto</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[tw`py-4 border-b rounded-3xl`, styles.ImgPickerBtn]}>
                    <Text style={[tw`text-lg text-center`, styles.ImgPickerText]}>Tomar Foto</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[tw`py-4 rounded-3xl`, styles.ImgPickerBtn]}>
                    <Text style={[tw`text-lg text-center`, styles.LogoutText]}>Eliminar Foto</Text>
                </TouchableOpacity>
            </Overlay>
        )
    };

    return (
        <View style={[tw`items-center px-2 py-10 bg-white`, styles.container]}>
            {isProfileImage ?
                <View>
                    <TouchableOpacity style={[tw`w-40 h-40 rounded-full`, styles.profileImg]} onPress={() => setShowImgModal(true)}>
                        <Image source={{ uri: imageProfile }} style={[tw`w-40 h-40 rounded-full`, styles.profileImg]} />
                    </TouchableOpacity>
                </View>
                :
                <View>
                    <TouchableOpacity style={[tw`w-40 h-40 rounded-full items-center flex justify-center`, styles.profileImg]} onPress={() => setShowImgModal(true)}>
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
            <View style={tw`absolute bottom-0`}>
                {showImgOverlay()}
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
    },

    ImgPickerBtn: {
        borderColor: MID_GRAY_APP
    },

    ImgPickerText: {
        color: BLUE_APP
    }
});
