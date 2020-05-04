import React, { useState } from 'react';
import { Text, View, StyleSheet, FlatList, Image, SafeAreaView, TouchableOpacity } from 'react-native';
import Draggable from 'react-native-draggable';

export default function App() {
  const [selectedItems, setSelectedItems] = useState([]);

  function MenuItem({ index, imageSource }) {
    return (
      <View style={styles.item}>
        <TouchableOpacity onPress={() => addSelectedItem(index)}>
          <Image source={imageSource} />
        </TouchableOpacity>
      </View>
    );
  }

  const availableItems = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba123',
      index: 0,
      imageSource: require('./assets/robot-dev.png')
    },
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba456',
      index: 1,
      imageSource: require('./assets/robot-prod.png')
    }
  ];

  const addSelectedItem = (key) => {
    console.log("menu item clicked! ", key, availableItems[key]);
    setSelectedItems([...selectedItems, availableItems[key]]);
  };

  const displayItems = selectedItems.map((item, key) => 
    <Draggable
      key={key}
      imageSource={item.imageSource} 
      renderSize={80} 
      x={Math.floor(key/5) * 80}
      y={(key * 80) % 400}
      onDragRelease={()=>console.log('onDragRelease')}
      onLongPress={()=>console.log('long press')}
      onShortPressRelease={()=>console.log('press drag')}
      onPressIn={()=>console.log('in press')}
      onPressOut={()=>console.log('out press')}
    />
  );

  console.log("displayItems: ", displayItems);

  return (
    <SafeAreaView style={styles.container}>
      <Text>Menu Area</Text>
      <FlatList
        data={availableItems}
        renderItem={({ item }) => <MenuItem index={item.index} imageSource={item.imageSource} />}
        keyExtractor={item => item.id}
        numColumns={3}
      />
      <Text>Draggable Area</Text>
      <View style={styles.draggleArea}>
        {displayItems}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2
  },
  draggleArea: {
    flex: 4,
    backgroundColor: '#fff'
  },
});
