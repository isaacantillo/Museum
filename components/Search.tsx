import { View, Text, TextInput, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { Picker } from "@react-native-picker/picker";
import { router, usePathname } from 'expo-router';

interface SearchProps {
    onSearch?: (params: {
        query: string;
        category: string;
        style: string;
        timePeriod: string;
    }) => void;
}

const Search= ({ onSearch }: SearchProps) => {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedStyle, setSelectedStyle] = useState('all');
    const [selectedTimePeriod, setSelectedTimePeriod] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    const pathname = usePathname();

    const handleSearch = () => {
        const params = {
            query: searchQuery,
            category: selectedCategory,
            style: selectedStyle,
            timePeriod: selectedTimePeriod
        };
        console.log(params);

        if (onSearch) {
            onSearch(params);
        } else if (pathname !== '/artworks') {
            router.push({
                pathname: "/artworks", 
                params
            });
        }
    };

    return (
        <View style={styles.container}>
            {/* Filters container */}
            <View style={styles.filtersContainer}>
                
                {/* Category picker */}
                <View style={styles.pickerContainer}>
                    <Picker
                        selectedValue={selectedCategory}
                        onValueChange={(itemValue) => setSelectedCategory(itemValue)}
                        style={styles.picker}
                    >
                        <Picker.Item label="Categories" value="all" />
                        <Picker.Item label="Paintings" value="paintings" />
                        <Picker.Item label="Sculptures" value="sculptures" />
                        <Picker.Item label="Photographs" value="photographs" />
                        <Picker.Item label="Prints" value="prints" />
                    </Picker>
                </View>

                {/* Style picker */}
                <View style={styles.pickerContainer}>
                    <Picker
                        selectedValue={selectedStyle}
                        onValueChange={(itemValue) => setSelectedStyle(itemValue)}
                        style={styles.picker}
                        
                    >
                        <Picker.Item label="Styles" value="all" />
                        <Picker.Item label="Modern" value="modern" />
                        <Picker.Item label="Contemporary" value="contemporary" />
                        <Picker.Item label="Impressionism" value="impressionism" />
                        <Picker.Item label="Abstract" value="abstract" />
                        <Picker.Item label="Realism" value="realism" />
                        <Picker.Item label="Pop Art" value="pop-art" />
                    </Picker>
                </View>

                {/* Time period picker */}
                <View style={styles.pickerContainer}>
                    <Picker
                        selectedValue={selectedTimePeriod}
                        onValueChange={(itemValue) => setSelectedTimePeriod(itemValue)}
                        style={styles.picker}
                    >
                        <Picker.Item label="Time Periods" value="all" />
                        <Picker.Item label="Before 1800" value="before-1800" />
                        <Picker.Item label="1800-1900" value="1800-1900" />
                        <Picker.Item label="1900-1950" value="1900-1950" />
                        <Picker.Item label="After 1950" value="after-1950" />
                    </Picker>
                </View>
            </View>

            {/* Search input */}
            <View style={styles.searchContainer}>
                <TextInput
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    placeholder="Search for an artwork"
                    style={styles.searchInput}
                    onSubmitEditing={handleSearch}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 128,
        paddingHorizontal: 8,
        paddingTop: 8
    },
    filtersContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8
    },
    pickerContainer: {
        borderRadius: 9999,
        borderWidth: 2,
        borderColor: 'black',
        width: 112,
        marginHorizontal: 4
    },
    picker: {
        width: '100%'
    },
    searchContainer: {
        width: '100%',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#d1d5db',
        borderRadius: 9999,
        paddingHorizontal: 16
    },
    searchInput: {}
});

export default Search