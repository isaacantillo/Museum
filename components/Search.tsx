import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { Picker } from '@react-native-picker/picker';

type SearchProps = {
  onSearch?: (params: { query: string; category: string; style: string; timePeriod: string }) => void;
  initialQuery?: string;
  initialCategory?: string;
  initialStyle?: string;
  initialTimePeriod?: string;
};

const Search = ({
  onSearch,
  initialQuery = '',
  initialCategory = 'all',
  initialStyle = 'all',
  initialTimePeriod = 'all',
}: SearchProps) => {
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState(initialCategory);
  const [style, setStyle] = useState(initialStyle);
  const [timePeriod, setTimePeriod] = useState(initialTimePeriod);
  const [showFilters, setShowFilters] = useState(false);

  const handleSubmit = () => {
    if (onSearch) {
      onSearch({ query, category, style, timePeriod });
    }
  };

  return (
    <View style={styles.container}>
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

      {!showFilters && (
        <TouchableOpacity onPress={() => setShowFilters(true)} style={styles.filtersButton}>
          <Text style={styles.filtersButtonText}>Show Filters ▼</Text>
        </TouchableOpacity>
      )}

      {showFilters && (
        <>
          <View style={styles.filtersContainer}>
            <View style={styles.fullPickerContainer}>
              <Picker
                selectedValue={category}
                onValueChange={(val) => {
                  setCategory(val);
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
                onValueChange={(val) => {
                  setStyle(val);
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
                onValueChange={(val) => {
                  setTimePeriod(val);
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
  searchInput: {},
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
    textAlign: 'center',
  },
});

export default Search;
