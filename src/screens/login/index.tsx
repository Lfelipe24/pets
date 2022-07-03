import React, { useState } from "react";
import { StyleSheet, View, Text, SafeAreaView, Image, TouchableOpacity, ActivityIndicator, Platform, KeyboardAvoidingView } from "react-native";
import tw from 'twrnc';
import { Input } from '../../components/input';
import { useNavigation } from '@react-navigation/native';
import { useStore } from '../../store/root.store';
import { LIGHT_GRAY_APP, RED_ALERT_APP, BLACK_APP, DARK_GRAY_APP } from '../../style/colors';
import { AntDesign, FontAwesome } from '@expo/vector-icons';

const logo = require('../../../assets/logo/logo.png');

export const Login: React.FC = () => {
    const navigation = useNavigation();
    const { navigationStore: { changeLoginValue }, authStore: { firebaseLogin, verifyEmail, googleAuthSignIn, loading } } = useStore('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [emailError, setEmailError] = useState<boolean>(false);
    const [passError, setPassError] = useState<boolean>(false);
    const [loginError, setLoginError] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(true);

    const cleanErrors = () => {
        setEmailError(false);
        setPassError(false);
        setLoginError(false)
    };

    const Login = async (email: string, pass: string) => {
        cleanErrors();
        if (email && pass) {
            if (verifyEmail(email)) {
                const response = await firebaseLogin(email, pass);
                if (response) {
                    changeLoginValue(true);
                } else {
                    setLoginError(true)
                }
            } else {
                setEmailError(true)
            }
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
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.loginContainer}>
                <View style={[tw`ml-8 mr-8 text-center`, styles.formContainer]}>
                    <View>
                        <Image style={tw`w-40 h-40`} source={logo}></Image>
                    </View>
                    <View>
                        <Text style={tw`mt-8 text-xl font-bold`}>¡Bienvenido!</Text>
                    </View>
                    <View style={tw`w-full mt-15`}>
                        {loginError &&
                            <View style={[tw`w-full`, styles.errorMessage]}>
                                <Text style={[tw`text-center`, styles.textError]}>Email o contraseña incorrectos</Text>
                            </View>
                        }
                        <Input style={[tw`px-5 h-12 border border-transparent ${emailError ? `border border-red-600` : ``}`, styles.inputText]}
                            placeholder='Correo Electronico'
                            placeholderTextColor={DARK_GRAY_APP}
                            defaultValue={email}
                            onChangeText={(email) => setEmail(email)}
                            textContentType='username'
                            autoCompleteType='username'
                        />
                        <Input style={[tw`mt-4 px-5 h-12 border border-transparent ${passError ? `border border-red-600` : ``}`, styles.inputText]}
                            placeholder='Contraseña'
                            placeholderTextColor={DARK_GRAY_APP}
                            defaultValue={password}
                            onChangeText={(password) => setPassword(password)}
                            textContentType='password'
                            autoCompleteType='password'
                            secureTextEntry={showPassword}
                        />
                        {showPassword ? (
                          <>
                            <AntDesign
                              name='eyeo'
                              size={24}
                              color={DARK_GRAY_APP}
                              style={styles.eyeIconPassword}
                              onPress={() => { setShowPassword(false) }}
                            />
                          </>
                        ) : (
                          <>
                            <AntDesign
                              name='eye'
                              size={24}
                              color={DARK_GRAY_APP}
                              style={styles.eyeIconPassword}
                              onPress={() => { setShowPassword(true) }}
                            />
                          </>
                        )}
                        <TouchableOpacity style={[tw`h-15 mt-12`, styles.buttonWraper]} onPress={() => Login(email, password)}>
                            {loading ?
                                <ActivityIndicator size="large" color="#fff" />
                                :
                                <Text style={tw`text-white text-lg`}>Ingresar</Text>
                            }
                        </TouchableOpacity>
                        <View style={tw`flex-row justify-center my-7`}>
                            <TouchableOpacity onPress={googleAuthSignIn} style={[tw`mx-5 flex justify-center items-center`, styles.socialMediaWrapper]}>
                                <AntDesign name="google" size={20} color="white" />
                            </TouchableOpacity>
                            <TouchableOpacity style={[tw`mx-5 flex justify-center items-center`, styles.socialMediaWrapper]}>
                                <FontAwesome name="facebook" size={20} color="white" />
                            </TouchableOpacity>
                            {Platform.OS == "ios" &&
                                <TouchableOpacity style={[tw`mx-5 flex justify-center items-center`, styles.socialMediaWrapper]}>
                                    <AntDesign name="apple1" size={20} color="white" />
                                </TouchableOpacity>
                            }
                        </View>
                        <View style={tw`items-center`}>
                            <TouchableOpacity>
                                <Text style={[tw`text-xs`, styles.text]}>Olvidaste tu contraseña?</Text>
                            </TouchableOpacity>
                            <Text style={tw`mt-5`}>Todavía no tienes cuenta?<Text style={styles.text} onPress={() => toRegister()}> Regístrate </Text></Text>
                        </View>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    loginContainer: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center'
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

    errorMessage: {
        position: 'absolute',
        top: -25
    },

    textError: {
        color: RED_ALERT_APP
    },

    text: {
        color: DARK_GRAY_APP,
    },

    socialMediaWrapper: {
        backgroundColor: BLACK_APP,
        width: 40,
        height: 40,
        borderRadius: 100,
    },

    eyeIconPassword: {
        position: 'absolute',
        right: 15,
        top: 75,
      },
    
}); 