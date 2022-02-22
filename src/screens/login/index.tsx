import React, { useState } from "react";
import { StyleSheet, View, Text, SafeAreaView, Image, TouchableOpacity } from "react-native";
import tw from 'twrnc';
import { Input } from '../../components/input';
import { useNavigation } from '@react-navigation/native';
import { useStore } from '../../store/root.store';

const logo = require('../../../assets/logo/pet-logo-temp.png');

export const Login: React.FC = () => {
    const navigation = useNavigation();
    const {navigationStore: {changeLoginValue}} = useStore('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [emailError, setEmailError] = useState<boolean>(false);
    const [passError, setPassError] = useState<boolean>(false);

    const cleanErrors = () => {
        setEmailError(false);
        setPassError(false);
    };

    const Login = async(email: string, pass: string) => {
        cleanErrors();
        if (email && password) {
            changeLoginValue(true)
            return
        } else {
            if (!email) setEmailError(true);
            if (!pass) setPassError(true);
        }
    };

    const toRegister = () => {
        cleanErrors();
        navigation.navigate('Register' as never)
    }

    return (
        <SafeAreaView style={[tw`bg-white`, styles.loginContainer]}>
            <View style={[tw`ml-8 mr-8`, styles.formContainer]}>
                <View>
                    <Image style={tw`w-30 h-30`} source={logo}></Image>
                </View>
                <View>
                    <Text style={tw`mt-8 text-xl font-bold`}>¡Bienvenido!</Text>
                </View>
                <View style={tw`w-full mt-15`}>
                    <Input style={[tw`px-5 h-12 bg-neutral-100 border border-transparent ${emailError? `border border-red-600`: ``}`, styles.inputText]}
                        placeholder='Correo Electronico'
                        defaultValue={email}
                        onChangeText={(email) => setEmail(email)}
                        textContentType='username'
                        autoCompleteType='username'
                    />
                    <Input style={[tw`mt-4          px-5 h-12 bg-neutral-100 border border-transparent ${passError? `border border-red-600`: ``}`, styles.inputText]}
                        placeholder='Contraseña'
                        defaultValue={password}
                        onChangeText={(password) => setPassword(password)}
                        textContentType='password'
                        autoCompleteType='password'
                        secureTextEntry={true} 
                    />
                    <TouchableOpacity style={[tw`h-15 mt-12 bg-sky-400`, styles.buttonWraper]} onPress={() => Login(email, password)}>
                        <Text style={tw`text-white text-lg`}>Ingresar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={tw`items-center mt-5`}>
                        <Text style={tw`text-sky-400 text-xs`}>Olvidaste tu contraseña?</Text>
                    </TouchableOpacity>
                    <View style={tw`items-center mt-10`}>
                        <Text>Todavía no tienes cuenta?<Text style={tw`text-sky-400`} onPress={() => toRegister()}> Regístrate </Text></Text>
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

      errorMessage: {
        position: 'absolute'
      }
}); 