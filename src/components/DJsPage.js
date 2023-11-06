import React from 'react';
import { Text, View, Image, StyleSheet, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const DJsPage = ({ navigation }) => {
  const productData = [
    {
        "title": "Strawberry Cupcakes",
        "image": require('./pictures/catering1.jpg'),

    },
    {
        "title": "Chocolate Strawberries",
        "image": require('./pictures/catering2.jpg'),

    },
    {
        "title": "Chocolate Balls",
        "image": require('./pictures/catering3.jpg'),

    },
    {
        "title": "Assorted Macarons",
        "image": require('./pictures/catering4.jpg'),

    },
    {
        "title": "Peach Tea",
        "image": require('./pictures/catering5.jpg'),
      
    },
    {
        "title": "Assorted Candy Balls",
        "image": require('./pictures/catering6.jpg'),
     
    },
        {
        "title": "Chairs",
        "image": require('./pictures/equipment1.jpg'),
  
    },
    {
        "title": "Projector",
        "image": require('./pictures/equipment2.jpg'),
      
    },
    {
        "title": "Speaker",
        "image": require('./pictures/equipment3.jpg'),
        
    },
    {
        "title": "Cups & Saucers",
        "image": require('./pictures/equipment4.jpg'),
      
    },
    {
        "title": "Just-Dance Mat",
        "image": require('./pictures/equipment5.jpg'),
       
    },
    {
        "title": "Griller",
        "image": require('./pictures/equipment6.jpg'),
       
    },
        {
        "title": "Assorted Balloons",
        "image": require('./pictures/other1.jpg'),
       
    },
    {
        "title": "Photo Props",
        "image": require('./pictures/other2.jpg'),
        
    },
        {
        "title": "Flower Decorations",
        "image": require('./pictures/other3.jpg'),
        
    },
    {
        "title": "Assorted Gift Bags",
        "image": require('./pictures/other4.jpg'),
        
    },
    {
        "title": "Fairy Lights",
        "image": require('./pictures/other5.jpg'),
      
    },
    {
        "title": "Confetti",
        "image": require('./pictures/other6.webp'),
        
    },
    {
        "title": "Tea Tent",
        "image": require('./pictures/other7.jpg'),
        
    },
    {
        "title": "4-Piece Karaoke Mikes",
        "image": require('./pictures/other8.jpg'),
    
    },
];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>EventPro</Text>
      </View>
      <View style={styles.subHeader}>
        <Text style={styles.subHeaderText}>Catering</Text>
      </View>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {productData.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              navigation.navigate('CateringDetails', { item });
            }}
          >
            <View style={styles.itemContainer}>
              <Image source={item.image} style={styles.image} resizeMode="cover" />
              <Text style={styles.title}>{item.title}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 75,
    backgroundColor: 'rgb(229,163,227)',
    padding: 10,
    alignItems: 'center',
  },
  headerText: {
    marginTop: 10,
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
  },
  subHeader: {
    marginTop: 1,
    backgroundColor: 'rgb(242,209,241)',
    padding: 10,
    alignItems: 'center',
  },
  subHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  contentContainer: {
    padding: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  itemContainer: {
    width: '48%',
    height: 150,
    aspectRatio: 1, // To make the square view
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'lightgray',
    alignItems: 'center', // Center items horizontally
  },
  image: {
    width: '100%',
    height: '70%',
    resizeMode: 'cover',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
  },
});

export default DJsPage;
