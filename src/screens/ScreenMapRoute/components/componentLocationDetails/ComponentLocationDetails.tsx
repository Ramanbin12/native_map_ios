import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { DummyDataInterface } from "./type";
import { ScrollView } from "react-native-gesture-handler";
import { useEffect, useRef } from "react";

interface LocationDetailsInterface {
  locations: DummyDataInterface[];
  setActiveLocation: (id: number) => void;
  activeLocation: number;
}

const ComponentLocationDetails = ({
  locations,
  setActiveLocation,
  activeLocation,
}: LocationDetailsInterface) => {
  const scrollViewRef = useRef<ScrollView>(null);
  const ITEM_WIDTH = Dimensions.get("window").width; 

  useEffect(() => {
    // Find the index of the active location
    const activeIndex = locations.findIndex((location) => location.id === activeLocation);
    if (activeIndex !== -1 && scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        x: activeIndex * ITEM_WIDTH, 
        animated: true,
      });
    }
  }, [activeLocation, locations]);

  return (
    <View style={styles.bottomSheet}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={true}
        snapToInterval={ITEM_WIDTH}
        pagingEnabled
        ref={scrollViewRef}
        centerContent
      >
        {locations.map((location) => (
          <TouchableOpacity
            key={location.id}
            style={[
              styles.locationItem,
              location.id === activeLocation && styles.activeItem, // Add active styling
            ]}
            onPress={() => setActiveLocation(location.id)}
          >
            <Text style={styles.locationText}>{location.title}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default ComponentLocationDetails;

const styles = StyleSheet.create({
  bottomSheet: {
    // flex: 1,
    padding: 10,
    backgroundColor: "#ffffff",
  },
  locationItem: {
    padding: 40,
    margin: 10,
    borderRadius: 5,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
    width: Dimensions.get("window").width, 
    height:200
  },
  activeItem: {
    backgroundColor: "#d0d0d0",
  },
  locationText: {
    fontSize: 14,
  },
});
