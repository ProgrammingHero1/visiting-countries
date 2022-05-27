import { View, Text, ScrollView, TextInput, StyleSheet } from 'react-native'
import React, {useState, useEffect} from 'react'
import Country from './Country';

export default function Countries() {
    const [countries, setCountries] = useState([]);
    const [searched, setSearched] = useState([]);


    useEffect( () =>{
        fetch('https://restcountries.com/v3.1/all')
        .then(res => res.json())
        .then(data => {
            setSearched(data);
            setCountries(data)
        });
    }, []);

    const handleSearch = text =>{
        const filtered = countries.filter(country => country.name.common.includes(text));
        setSearched(filtered);
    }
    return (
        <View>
            <Text style={styles.header}>Countries: {searched.length}</Text>
            <TextInput
                onChangeText={handleSearch}
                style={styles.input}
            ></TextInput>
            <ScrollView>
                {
                    searched.map(country => <Country 
                        
                        country={country}></Country>)
                }
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        marginTop: 50,
        fontSize: 40,
        color: 'red'
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
      }
})