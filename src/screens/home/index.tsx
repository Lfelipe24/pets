import React, { useState } from "react";
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from "react-native";
import tw from 'twrnc';
import { SearchBar, Card, Icon } from 'react-native-elements';
import { BLUE_APP, LIGHT_GRAY_APP, DARK_GRAY_APP } from '../../style/colors';
import { Ionicons } from '@expo/vector-icons';

const testPet = require('../../../assets/pets/dog.jpg');

export const Home: React.FC = () => {
    const [searchValue, setSearchValue] = useState<string>('');
    const [hasData, isHasData] = useState<boolean>(false); // DELETE: Temp for show when have or not data

    return (
        <View style={[tw`bg-white px-2 py-5`, styles.homeContainer]}>
            <SearchBar
                platform={'ios'}
                placeholder={'Buscar'}
                value={searchValue}
                onChangeText={(value) => setSearchValue(value)}
                inputContainerStyle={styles.searchBar}
            />
            <View style={tw`w-full mt-5`}>
                <Text style={tw`text-center text-lg font-bold`}>Mis mascotas</Text>
            </View>
            <TouchableOpacity style={styles.addIconContainer}>
                <Ionicons name="add-circle" size={70} color={BLUE_APP} />
            </TouchableOpacity>
            {hasData ? (
                <>
                    <ScrollView style={tw`mt-5`}>
                        <Card wrapperStyle={tw`items-center`} containerStyle={styles.cardsContainer}>
                            <View style={styles.imgContainer}>
                                <Card.Image
                                    style={styles.petImage}
                                    source={testPet}
                                />
                            </View>
                            <Text style={tw`my-3 text-lg font-bold`}>Jack</Text>
                            <View style={tw`w-full`}>
                                <TouchableOpacity style={[tw`h-15`, styles.buttonWraper]}>
                                    <Text style={tw`text-white text-lg`}>Detalles</Text>
                                </TouchableOpacity>
                            </View>
                        </Card>
                    </ScrollView>
                </>
            ) : (
                <>
                    <View style={tw`my-5`}>
                        <Card wrapperStyle={tw`flex justify-center items-center py-5`} containerStyle={styles.cardsContainer}>
                            <Text style={tw`text-center text-base py-5`}>Pulsa el icono de <Ionicons name="add-circle" size={24} color={DARK_GRAY_APP} /> para agregar una nueva mascota</Text>
                        </Card>
                    </View>
                </>
            )}
        </View >
    );
}

const styles = StyleSheet.create({
    homeContainer: {
        flex: 1
    },

    searchBar: {
        backgroundColor: LIGHT_GRAY_APP,
        borderRadius: 50
    },

    cardsContainer: {
        borderRadius: 10,
        borderWidth: 0,
        backgroundColor: LIGHT_GRAY_APP
    },

    imgContainer: {
        borderRadius: 100,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },

    petImage: {
        borderRadius: 100,
        height: 150,
        width: 150
    },

    buttonWraper: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        backgroundColor: BLUE_APP
    },

    addText: {
        backgroundColor: 'red'
    },

    addIconContainer: {
        position: 'absolute',
        bottom: 10,
        right: 10,
    }
});
