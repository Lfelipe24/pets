import React, { useState } from "react";
import { StyleSheet, View, Text, SafeAreaView, Image, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import tw from 'twrnc';
import { Input } from '../../components/input';
import { useNavigation } from '@react-navigation/native';
import { useStore } from '../../store/root.store';
import { observer } from 'mobx-react-lite';
import { BLUE_APP, LIGHT_GRAY_APP, RED_ALERT_APP, BLACK_APP } from '../../style/colors';

const logo = require('../../../assets/logo/logo.png');

export const Register: React.FC = observer(() => {
    const navigation = useNavigation();
    const { authStore: { loading, firebaseRegister, verifyEmail, verifyPassword }, navigationStore: { changeLoginValue } } = useStore('');
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
        setRepeatPassError(false);
    }

    const cleanForm = () => {
        setName(''),
            setEmail('');
        setPassword('');
        setRepeatPassword('');
    }

    const SignUp = async (name: string, email: string, pass: string, rPass: string) => {
        cleanErrors();
        if (name && email && pass && rPass) {
            if (verifyEmail(email)) {
                if (verifyPassword(pass, rPass)) {
                    const response = await firebaseRegister(name, email, pass);
                    if (response) {
                        cleanForm()
                        changeLoginValue(true);
                    }
                } else {
                    setPassError(true);
                    setRepeatPassError(true);
                }
            } else {
                setEmailError(true);
            }
        } else {
            if (!name) setNameError(true);
            if (!email) setEmailError(true);
            if (!pass) setPassError(true);
            if (!rPass) setRepeatPassError(true);
        }
    };

    const toLogin = () => {
        cleanErrors();
        navigation.goBack()
    };

    return (
        <SafeAreaView style={[tw`bg-white`, styles.registerContainer]}>
            <View style={[tw`ml-8 mr-8`, styles.formContainer]}>
                <View>
                    <Image style={tw`w-25 h-25`} source={logo}></Image>
                </View>
                <View>
                    <Text style={tw`mt-10 text-xl font-bold`}>¡Creá tu cuenta!</Text>
                </View>
                <View style={tw`w-full`}>
                    <Input style={[tw`mt-12 px-5 h-12 border border-transparent ${nameError ? `border border-red-600` : ``}`, styles.inputText]}
                        placeholder='Nombre completo'
                        defaultValue={name}
                        onChangeText={(name) => setName(name)}
                        textContentType='username'
                        autoCompleteType='username'
                    />
                    <Input style={[tw`mt-5 px-5 h-12 border border-transparent ${emailError ? `border border-red-600` : ``}`, styles.inputText]}
                        placeholder='Correo Electronico'
                        defaultValue={email}
                        onChangeText={(email) => setEmail(email)}
                        textContentType='username'
                        autoCompleteType='username'
                    />
                    <Input style={[tw`mt-5 px-5 h-12 border border-transparent ${PassError ? `border border-red-600` : ``}`, styles.inputText]}
                        placeholder='Contraseña mayor a 6 caracteres'
                        textContentType='password'
                        defaultValue={password}
                        onChangeText={(password) => setPassword(password)}
                        autoCompleteType='password'
                        secureTextEntry={true}
                    />
                    <Input style={[tw`mt-5 px-5 h-12 border border-transparent ${repeatPassError ? `border border-red-600` : ``}`, styles.inputText]}
                        placeholder='Repite tu contraseña'
                        textContentType='password'
                        defaultValue={repeatPassword}
                        onChangeText={(repeatPass) => setRepeatPassword(repeatPass)}
                        autoCompleteType='password'
                        secureTextEntry={true}
                    />
                    <TouchableOpacity style={[tw`h-15 mt-12`, styles.buttonWraper]} onPress={() => SignUp(name, email, password, repeatPassword)}>
                        {loading ?
                            <ActivityIndicator size="large" color="#fff" />
                            :
                            <Text style={tw`text-white text-lg`}>Registrarse</Text>
                        }
                    </TouchableOpacity>
                    <View style={tw`items-center mt-10`}>
                        <Text>Ya tienes una cuenta?<Text style={styles.text} onPress={() => toLogin()}> Ingresa </Text></Text>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
})

const styles = StyleSheet.create({
    registerContainer: {
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
        backgroundColor: LIGHT_GRAY_APP
    },

    buttonWraper: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        backgroundColor: BLACK_APP
    },

    text: {
        color: BLACK_APP,
        fontWeight: 'bold'
    },

    errorMsg: {
        position: "absolute",
        bottom: 140,
        width: '100%',
    },

    errorText: {
        color: RED_ALERT_APP
    },

    errorOverlay: {
        borderRadius: 20,
    }
}); 