import React from 'react';
import tw from 'tailwind-react-native-classnames';
import { Icon } from '@rneui/base';
import { View, Text, FlatList, TouchableOpacity } from 'react-native'

const data = [
    {
        id: "12345",
        icon: "home",
        location: "Home",
        destination: "Code Street, London, UK"
    },
    {
        id: "45678",
        icon: "briefcase",
        location: "Work",
        destination: "London Eye, London, UK"
    },
];

const NavFavourites = () => {
    return (
        <FlatList 
            data={data}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={()=>{
                <View style={[tw`bg-gray-200`, {height: 0.5}]}/>
            }}
            renderItem={({item : {location, destination, icon}}) => (
                <TouchableOpacity 
                    onPress={() => navigation.navigate(item.screen)}
                    style={tw`flex-row items-center p-5`}
                >
                    <Icon 
                        style={tw`mr-4 rounded-full bg-gray-300 p-3`}
                        name={icon}
                        color="white"
                        type="ionicon"
                        size={18}
                    />
                    <View>
                    <Text style={tw`font-semibold text-lg`} >{location}</Text>
                    <Text style={tw`text-gray-500`} >{destination}</Text>
                    </View>
                </TouchableOpacity>
                
            )}
        />
    )
}

export default NavFavourites;