import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { key } from './../../../key';
import MapViewDirections from 'react-native-maps-directions';

export default function HomeScreen() {
    const GOOGLE_MAPS_APIKEY = key.API_GOOGLE

    const origin = { latitude: 51.0280685, longitude: 71.4633028 }
    const destination = { latitude: 51.1630214183, longitude: 71.4713737168 }
    return (
        <>
            <MapView
                style={{ height: '100%', width: '100%' }}
                provider={PROVIDER_GOOGLE}
                // showsUserLocation={true}
                initialRegion={{
                    latitude: 51.1605227,
                    longitude: 71.4703558,
                    latitudeDelta: 0.28479920301184336,
                    longitudeDelta: 0.1714510252245211,
                }}
            >

                <MapViewDirections
                    origin={origin}
                    destination={destination}
                    apikey={GOOGLE_MAPS_APIKEY}
                    strokeWidth={5}
                    strokeColor="hotpink"
                />
                <Marker
                    // key={index}
                    coordinate={origin}
                    title={'origin'}
                // description={marker.description}
                />
                <Marker
                    // key={index}
                    coordinate={destination}
                    title={'destination'}
                // description={marker.description}
                />
            </MapView>
        </>
    )
}

const styles = StyleSheet.create({})
