import React, { useState } from 'react'
import { StyleSheet, Text, View, Dimensions, Pressable } from 'react-native'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { key } from './../../../key';
import MapViewDirections from 'react-native-maps-directions';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import NewOrderPopup from './../../components/NewOrderPopup/NewOrderPopup';

export default function HomeScreen() {
    const [isOnline, setIsOnline] = useState(false)

    const GOOGLE_MAPS_APIKEY = key.API_GOOGLE
    const origin = { latitude: 51.0280685, longitude: 71.4633028 }
    const destination = { latitude: 51.1630214183, longitude: 71.4713737168 }

    const onGoPress = () => {
        setIsOnline(!isOnline)
    }


    return (
        <View>
            <MapView
                style={{ height: Dimensions.get('window').height - 80, width: '100%' }}
                provider={PROVIDER_GOOGLE}
                showsUserLocation={true}
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

            <Pressable
                onPress={() => console.log('Balance')}
                style={styles.ballanceButton}
            >

                <Text style={styles.ballanceText}>
                    <Text style={{ color: 'white' }}>$</Text>
                    {' '}
                    <Text>0.00</Text>
                </Text>
                {/* {' '} */}
            </Pressable>

            <Pressable
                onPress={() => { }}
                style={[styles.roundButton, { top: 15, left: 15 }]}
            >
                <EntypoIcon name='menu' size={25} color='#4a4a4a' />
            </Pressable>

            <Pressable
                onPress={() => console.log('press')}
                style={[styles.roundButton, { top: 15, right: 15 }]}
            >
                <EntypoIcon name='menu' size={25} color='#4a4a4a' />
            </Pressable>

            <Pressable
                onPress={() => console.log('press')}
                style={[styles.roundButton, { bottom: 80, left: 15 }]}
            >
                <EntypoIcon name='menu' size={25} color='#4a4a4a' />
            </Pressable>

            <Pressable
                onPress={() => console.log('press')}
                style={[styles.roundButton, { bottom: 80, right: 15 }]}
            >
                <EntypoIcon name='menu' size={25} color='#4a4a4a' />
            </Pressable>

            <Pressable
                onPress={onGoPress}
                style={styles.goButton}
            >
                <Text style={styles.goText}>
                    {isOnline ? 'END' : 'Go'}
                </Text>
            </Pressable>

            <View style={styles.bottomContainer}>
                <IoniconsIcon name='md-options-outline' size={30} color='#4a4a4a' />

                {
                    isOnline
                        ? (<Text style={styles.bottomText}>You are Online</Text>)
                        : (<Text style={styles.bottomText}>You are Off-line</Text>)
                }
                <EntypoIcon name='menu' size={25} color='#4a4a4a' />
            </View>

            <NewOrderPopup />

        </View>
    )
}

const styles = StyleSheet.create({
    // mainContainer: {
    //     flexDirection: 'column'
    // },
    roundButton: {
        position: 'absolute',
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 25
    },
    bottomContainer: {
        height: 60,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15

    },
    ballanceButton: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        left: Dimensions.get('window').width / 2 - 40,
        top: 10,
        backgroundColor: '#4a4a4a',
        padding: 10,
        borderRadius: 50,
    },
    ballanceText: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
    },
    goButton: {
        position: 'absolute',
        left: Dimensions.get('window').width / 2 - 25,
        bottom: Dimensions.get('window').height / 5 - 60,
        backgroundColor: '#1495ff',
        padding: 10,
        borderRadius: 30,
    },
    goText: {
        fontSize: 30,
        color: 'white',
        fontWeight: 'bold',
    },
    bottomText: {
        fontSize: 21,
        color: '#4a4a4a'
    },
})
