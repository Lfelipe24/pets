import React from 'react';
import {TextInput, TextInputProps, StyleSheet} from 'react-native';


export const Input: React.FC<TextInputProps> = ({placeholder, placeholderTextColor, onChangeText, defaultValue, textContentType, autoCompleteType, secureTextEntry, style}) => {
    return (
        <TextInput 
            style={style} 
            placeholder={placeholder}
            placeholderTextColor={placeholderTextColor}
            onChangeText={onChangeText} 
            defaultValue={defaultValue}
            textContentType={textContentType}
            autoCompleteType={autoCompleteType}
            secureTextEntry={secureTextEntry}
        />
    )
}


const styles = StyleSheet.create({})
