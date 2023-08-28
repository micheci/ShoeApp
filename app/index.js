import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const App = () => {
  const [sneakers, setSneakers] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // New state to track loading status

  useEffect(() => {
    // Define the API URL
    const apiUrl = process.env.API_URL;

    // Fetch data from the API
    fetch(apiUrl, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Host': process.env.API_HOST,
        'X-RapidAPI-Key': process.env.API_KEY, // Replace with your RapidAPI key
      },
    })
      .then(response => response.json())
      .then(data => {
        setSneakers(data.results); // Set the fetched sneakers data in the state
        setIsLoading(false); // Data is fetched, set loading to false
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setIsLoading(false); // Set loading to false even on error
      });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Fetched Sneakers:</Text>
      {isLoading ? ( // Display loading indicator if data is being fetched
        <Text>Loading...</Text>
      ) : (
        <View>
          {sneakers.map((sneaker, id) => (
            sneaker.image.original ? (
              <Image
                key={id}
                source={{ uri: sneaker.image.original }}
                style={styles.image}
              />
            ) : (
              <Text key={id}>No Image Available</Text>
            )
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  image: {
    width: 100,
    height: 100,
  },
});

export default App;
