import React, { useEffect, useRef } from 'react';
import tw from 'tailwind-react-native-classnames';
import MapView, { Marker } from 'react-native-maps';
import { useDispatch, useSelector } from 'react-redux';
import { selectDestination, selectOrigin, setTravelTimeInformation } from '../slices/navSlice';
import MapViewDirections from 'react-native-maps-directions';
import { ApiKey } from '../Utilities/Constants';

const Map = () => {

    const origin = useSelector(selectOrigin);
    const destination = useSelector(selectDestination);
    const mapRef = useRef(null);
    const dispatch = useDispatch();
    const Constants = {
        originMarkerIdentifier: "origin",
        destinationMarkerIdentifier: "destination"
    }

    useEffect(() => {
        if (!origin && !destination) return;
        //Zoom to fit the markers
        mapRef.current.fitToSuppliedMarkers([Constants.originMarkerIdentifier, Constants.destinationMarkerIdentifier], {
            edgePadding: {top: 50, bottom: 50, right: 50, left: 50}
        })
    }, [origin, destination]);

    useEffect(() => {
        if (!origin && !destination) return;
        const getTravelTime = async () => {
            const URL = `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${origin.description}&destinations=${destination.description}&key=${ApiKey.googlePlacesApiKey}`
            fetch(URL).then((res) => res.json())
            .then((data) => {
                dispatch(setTravelTimeInformation(data.rows[0].elements[0]))
            })
        }
        getTravelTime();
    }, [origin, destination])

    return (
        <MapView
            ref={mapRef}
            style={tw`flex-1`}
            mapType='mutedStandard'
            initialRegion={{
                latitude: origin.location.lat,
                longitude: origin.location.lng,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
            }}
        >
        {origin && destination && (
            <MapViewDirections 
                origin={origin.description}
                destination={destination.description}
                apikey={ApiKey.googlePlacesApiKey}
                strokeWidth={3}
                strokeColor='black'
            />
        )}
        {origin?.location && (
                <Marker
                    coordinate={{
                        latitude: origin.location.lat,
                        longitude: origin.location.lng            
                    }}
                    title="Origin"
                    description={origin.description}
                    identifier={Constants.originMarkerIdentifier}
                />
            )}
        {destination?.location && (
            <Marker
                coordinate={{
                    latitude: destination.location.lat,
                    longitude: destination.location.lng            
                }}
                title="Destination"
                description={destination.description}
                identifier={Constants.destinationMarkerIdentifier}
            />
        )}
        </MapView>
    )
}

export default Map;
