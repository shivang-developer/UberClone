import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import tw from 'tailwind-react-native-classnames';
import Map from '../components/Map';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NavigateCard from '../components/NavigateCard';
import RideOptionsCard from '../components/RideOptionsCard';
import { Icon } from '@rneui/base';
import { useNavigation } from '@react-navigation/native';

const MapScreen = () => {
  const Stack = createNativeStackNavigator();
  const navigation = useNavigation();
    return (
        <View style={tw`bg-red-900 h-full`}>
          <TouchableOpacity
            onPress={()=> navigation.navigate("HomeScreen")}
            style={tw`bg-red-200 absolute top-16 left-8 z-50 p-3 rounded-full shadow-lg`}>
              <Icon name="menu"/>
          </TouchableOpacity>
          <View style={tw`h-1/2 bg-blue-900`}>
            <Map />
          </View>
          <View style={tw`h-1/2`}>
            <Stack.Navigator>
              <Stack.Screen 
              name="NavigateCard"
              component={NavigateCard}
              options={{
                headerShown: false
              }}
              />
              <Stack.Screen 
              name="RideOptionsCard"
              component={RideOptionsCard}
              options={{
                headerShown: false
              }}
              />
            </Stack.Navigator>
          </View>
        </View>
      )
}

export default MapScreen