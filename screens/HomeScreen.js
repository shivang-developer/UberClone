import React from 'react'
import { Image, StyleSheet, View, SafeAreaView } from 'react-native'
import tw from 'tailwind-react-native-classnames';
import NavOptions from '../components/NavOptions';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { ApiKey } from '../Utilities/Constants';
import { setDestination, setOrigin } from '../slices/navSlice';
import { useDispatch } from 'react-redux';
import NavFavourites from '../components/NavFavourites';

const HomeScreen = () => {
    const dispatch = useDispatch();

    return (
        <SafeAreaView style={tw`bg-white h-full`}>
          <View style={tw`p-5`}>
            <Image 
            style={{
                width: 100, height: 100, resizeMode: 'contain'
            }}
                source={{
                    uri: "https://links.papareact.com/gzs"
                }}
            />
            <GooglePlacesAutocomplete
                styles={{
                    container: {
                        flex: 0,
                    },
                    textInput: {
                        fontSize: 18
                    }
                }}
                onPress={(data, details = null) => {
                    dispatch(
                        setOrigin({
                            location: details.geometry.location,
                            description: data.description,
                        })
                    );
                    dispatch(setDestination(null))
                }}
                returnKeyType={"search"}
                fetchDetails={true}
                enablePoweredByContainer={false}
                minLength={2}x
                query={{
                    key: ApiKey.googlePlacesApiKey,
                    language: "en"
                }}
                placeholder='Where from?'
                debounce={400}
                nearbyPlaceAPI="GooglePlacesSearch"
            />
             <NavOptions />
             <NavFavourites />
          </View>
        </SafeAreaView>
      )
}

export default HomeScreen

const styles = StyleSheet.create({
    text: {
        color: "blue"
    }
})
