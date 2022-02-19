import React, { useState } from "react";
import { StyleSheet, View, Text, SafeAreaView, Image, TouchableOpacity } from "react-native";
import tw from 'twrnc';
import { Input } from '../../components/input';
import { useNavigation } from '@react-navigation/native';

const logo = require('../../../assets/logo/near-logo.png');

export const Register: React.FC = () => {
    const navigation = useNavigation();
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [repeatPassword, setRepeatPassword] = useState<string>('');

    const [nameError, setNameError] = useState<boolean>(false);
    const [emailError, setEmailError] = useState<boolean>(false);
    const [PassError, setPassError] = useState<boolean>(false);
    const [repeatPassError, setRepeatPassError] = useState<boolean>(false);

    const cleanErrors = () => {
        setNameError(false);
        setEmailError(false);
        setPassError(false);
        setRepeatPassError(false)
    }

    const SignUp = async(name: string, email: string, pass: string, rPass: string ) => {
        cleanErrors();
        if (name && email && pass && rPass) {
            console.log(email, pass)
        } else {
            if (!name) setNameError(true);
            if (!email) setEmailError(true);
            if (!pass) setPassError(true);
            if (!rPass) setRepeatPassError(true);
        }
    };
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
                    <Input style={[tw`mt-12 px-5 h-12 bg-neutral-100 border border-transparent ${nameError? `border border-red-600`: ``}`, styles.inputText]}
                        placeholder='Nombre completo'
                        defaultValue={name}
                        onChangeText={(name) => setName(name)}
                        textContentType='username'
                        autoCompleteType='username'
                    />
                    <Input style={[tw`mt-5 px-5 h-12 bg-neutral-100 border border-transparent ${emailError? `border border-red-600`: ``}`, styles.inputText]}
                        placeholder='Correo Electronico'
                        defaultValue={email}
                        onChangeText={(email) => setEmail(email)}
                        textContentType='username'
                        autoCompleteType='username'
                    />
                    <Input style={[tw`mt-5 px-5 h-12 bg-neutral-100 border border-transparent ${PassError? `border border-red-600`: ``}`, styles.inputText]}
                        placeholder='Contraseña'
                        textContentType='password'
                        defaultValue={password}
                        onChangeText={(password) => setPassword(password)}
                        autoCompleteType='password'
                        secureTextEntry={true}
                    />
                    <Input style={[tw`mt-5 px-5 h-12 bg-neutral-100 border border-transparent ${repeatPassError? `border border-red-600`: ``}`, styles.inputText]}
                        placeholder='Repite tu contraseña'
                        textContentType='password'
                        defaultValue={repeatPassword}
                        onChangeText={(repeatPass) => setRepeatPassword(repeatPass)}
                        autoCompleteType='password'
                        secureTextEntry={true}
                    />
                    <TouchableOpacity style={[tw`h-15 mt-12 bg-sky-400`, styles.buttonWraper]} onPress={() => SignUp(name, email, password, repeatPassword)}>
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