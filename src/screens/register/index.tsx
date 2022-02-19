import React from "react";
import { StyleSheet, View, Text, SafeAreaView, Image, TouchableOpacity } from "react-native";
import tw from 'twrnc';
import { Input } from '../../components/input';
import { useNavigation } from '@react-navigation/native';

const logo = require('../../../assets/logo/near-logo.png');

export const Register: React.FC = () => {
    const navigation = useNavigation();
    return (
        <SafeAreaView style={[tw`w-max h-max bg-white`, styles.loginContainer]}>
            <View style={[tw`ml-8 mr-8`, styles.formContainer]}>
                <View>
                    <Image style={tw`w-25 h-25`} source={logo}></Image>
                </View>
                <View>
                    <Text style={tw`mt-10 text-lg text-center`}>¡Llena el formulario para completar tu registro!</Text>
                </View>
                <View style={tw`w-full`}>
                    <Input style={[tw`mt-12 px-5 h-12 bg-neutral-100`, styles.inputText]}
                        placeholder='Nombre completo'
                        defaultValue={''}
                        textContentType='username'
                        autoCompleteType='username'
                    />
                    <Input style={[tw`mt-5 px-5 h-12 bg-neutral-100`, styles.inputText]}
                        placeholder='Correo Electronico'
                        defaultValue={''}
                        textContentType='username'
                        autoCompleteType='username'
                    />
                    <Input style={[tw`mt-5 px-5 h-12 bg-neutral-100`, styles.inputText]}
                        placeholder='Contraseña'
                        defaultValue={''}
                        textContentType='password'
                        autoCompleteType='password'
                        secureTextEntry={true}
                    />
                    <Input style={[tw`mt-5 px-5 h-12 bg-neutral-100`, styles.inputText]}
                        placeholder='Repite tu contraseña'
                        defaultValue={''}
                        textContentType='password'
                        autoCompleteType='password'
                        secureTextEntry={true}
                    />
                    <TouchableOpacity style={[tw`h-15 mt-12 bg-sky-400`, styles.buttonWraper]}>
                        <Text style={tw`text-white text-lg`}>Registrarse</Text>
                    </TouchableOpacity>
                    <View style={tw`items-center mt-10`}>
                        <Text>Ya tienes una cuenta?<Text style={tw`text-sky-400`} onPress={() => navigation.goBack()}> Ingresa </Text></Text>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    loginContainer: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
    },

    formContainer: {
        display: 'flex',
        alignItems: 'center',
    },

    inputText: {
        borderRadius: 50,
        fontSize: 13,
      },

      buttonWraper: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50
      },
}); 