import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Overlay } from 'react-native-elements';
import { Camera } from 'expo-camera';
import tw from 'twrnc';
import { MaterialIcons } from '@expo/vector-icons';
import {DARK_GRAY_APP} from '../../style/colors';

export const LaunchCamera: React.FC = () => {
    const [type, setType] = useState(Camera.Constants.Type.front);
    return (
        <Overlay
            isVisible={true}
            fullScreen={true}
            animationType={'fade'}
            overlayStyle={tw`p-0`}>
            <Camera style={styles.container} type={type} ratio={'16:9'}>
                <View style={styles.btnsContainer}>
                    <TouchableOpacity>
                        <MaterialIcons name="close" size={40} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[tw`p-5 bg-white rounded-full`, styles.takePhotoBtn]}
                        onPress={() => {
                            setType(
                                type === Camera.Constants.Type.back
                                    ? Camera.Constants.Type.front
                                    : Camera.Constants.Type.back
                            );
                        }}>
                        <MaterialIcons name="camera-alt" size={40} color={DARK_GRAY_APP} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={tw``}
                        onPress={() => {
                            setType(
                                type === Camera.Constants.Type.back
                                    ? Camera.Constants.Type.front
                                    : Camera.Constants.Type.back
                            );
                        }}>
                        <MaterialIcons name="flip-camera-ios" size={40} color="white" />
                    </TouchableOpacity>
                </View>
            </Camera>
        </Overlay>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    btnsContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        height: '100%',
        alignItems: 'flex-end',
        paddingBottom: 30
    },

    takePhotoBtn: {
    },

    text: {
        fontSize: 18,
        color: 'white',
    },
})
