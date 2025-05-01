import React, { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useState } from 'react';
import { Picker } from '@react-native-picker/picker';

type SearchProps = {
  onSearch?: (params: { query: string; category: string; style: string; timePeriod: string }) => void;
  initialQuery?: string;
};

const Search = ({ onSearch, initialQuery = '' }: SearchProps) => {
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState('all');
  const [style, setStyle] = useState('all');
  const [timePeriod, setTimePeriod] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const handleSubmit = () => {
    if (onSearch) {
      onSearch({
        query,
        category,
        style,
        timePeriod,
      });
    }
  };

  return (
    <View style={styles.container}>
      {/* Search Input */}
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search for an artwork"
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={handleSubmit}
          style={styles.searchInput}
          returnKeyType="search"
        />
      </View>

      {/* Toggle Filters Button (only when hidden) */}
      {!showFilters && (
        <TouchableOpacity onPress={() => setShowFilters(true)} style={styles.filtersButton}>
          <Text style={styles.filtersButtonText} className="text-museum-red">Show Filters ▼</Text>
        </TouchableOpacity>
      )}

      {/* Collapsible Filters */}
      {showFilters && (
        <>
          <View style={styles.filtersContainer}>
            {/* Full Width Pickers */}
            <View style={styles.fullPickerContainer}>
              <Picker
                selectedValue={category}
                onValueChange={(itemValue) => {
                    setCategory(itemValue);
                    handleSubmit();
                }}
                style={styles.picker}
              >
                <Picker.Item label="Category" value="all" />
                <Picker.Item label="Painting" value="painting" />
                <Picker.Item label="Sculpture" value="sculpture" />
                <Picker.Item label="Photography" value="photography" />
                <Picker.Item label="Textiles" value="textiles" />
              </Picker>
            </View>

            <View style={styles.fullPickerContainer}>
              <Picker
                selectedValue={style}
                onValueChange={(itemValue) => {
                    setStyle(itemValue);
                    handleSubmit();
                }}
                style={styles.picker}
              >
                <Picker.Item label="Style" value="all" />
                <Picker.Item label="Modernism" value="modernism" />
                <Picker.Item label="Impressionism" value="impressionism" />
                <Picker.Item label="Cubism" value="cubism" />
                <Picker.Item label="Abstract" value="abstract" />
              </Picker>
            </View>

            <View style={styles.fullPickerContainer}>
              <Picker
                selectedValue={timePeriod}
                onValueChange={(itemValue) => {
                    setTimePeriod(itemValue);
                    handleSubmit();
                }}
                style={styles.picker}
              >
                <Picker.Item label="Time Period" value="all" />
                <Picker.Item label="18th Century" value="18th-century" />
                <Picker.Item label="19th Century" value="19th-century" />
                <Picker.Item label="20th Century" value="20th-century" />
                <Picker.Item label="Contemporary" value="contemporary" />
              </Picker>
            </View>
          </View>

          {/* Hide Filters Button (below Pickers) */}
          <TouchableOpacity onPress={() => setShowFilters(false)} style={styles.filtersButton}>
            <Text style={styles.filtersButtonText}>Hide Filters ▲</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
    paddingTop: 8,
  },
  searchContainer: {
    width: '100%',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 9999,
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  searchInput: {
    // height: 40,
  },
  filtersButton: {
    alignSelf: 'center',
    marginVertical: 8,
  },
  filtersButtonText: {
    color: '#1d4ed8',
    fontWeight: 'bold',
  },
  filtersContainer: {
    width: '100%',
    marginBottom: 8,
  },
  fullPickerContainer: {
    borderRadius: 9999,
    borderWidth: 2,
    borderColor: 'black',
    marginVertical: 4,
    overflow: 'hidden',
  },
  picker: {
    width: '100%',
    // height: 40,
    textAlign: 'center',
  },
});

export default Search;
