import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Dimensions, Pressable } from 'react-native'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { key } from './../../../key';
import MapViewDirections from 'react-native-maps-directions';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import NewOrderPopup from './../../components/NewOrderPopup/NewOrderPopup';


const GOOGLE_MAPS_APIKEY = key.API_GOOGLE
const origin = { latitude: 51.0280685, longitude: 71.4633028 }
const destination = { latitude: 51.1630214183, longitude: 71.4713737168 }

export default function HomeScreen() {
    const [isOnline, setIsOnline] = useState(false)
    const [order, setOrder] = useState(null)
    const [myPosition, setMyPosition] = useState(null)

    const [newOrder, setNewOrder] = useState({
        id: '1',
        type: 'UberX',
        // originlatitude: 51.1827864314,
        // originlongitude: 71.3634109497,
        originlatitude: 51.1605217,
        originlongitude: 71.470355,

        destlatitude: 51.164399544,
        destlongitude: 71.4588975906,
        user: {
            rating: 5.0,
            name: 'TestName'
        }
    })


    const onDecline = () => {
        setNewOrder(null)
    }

    const onAccept = (newOrder) => {
        setOrder(newOrder)
        setNewOrder(null)
    }


    const onGoPress = () => {
        setIsOnline(!isOnline)
    }


    const onUserLocationChange = (event) => {
        // console.log(event.nativeEvent.coordinate)
        setMyPosition(event.nativeEvent.coordinate)
    }

    const onDirectionFound = (event) => {
        // console.log('DF:', event)
        if (order) {
            setOrder({
                ...order,
                distance: event.distance,
                duration: event.duration,
                pickedUp: order.pickedUp || event.distance < 0.2,
                isFinished: order.pickedUp && event.distance < 0.2,
            })
        }
    }

    const getDestination = () => {
        if (order && order.pickedUp) {
            return {
                latitude: order.destlatitude,
                longitude: order.destlongitude
            }
        }
        return {
            latitude: order.originlatitude,
            longitude: order.originlongitude
        }
    }


    const renderBottomTitle = () => {
        if (order && order.isFinished) {
            return (
                <View style={{ alignItems: 'center' }}>
                    <View style={styles.bottomLineComplete}>
                        <Text style={{ color: 'white', fontWeight: 'bold' }}>COMPLETE {order.type}</Text>
                    </View>
                    <Text style={styles.bottomText}>Dropping off {order.user.name}</Text>
                </View>
            )
        }
        if (order && order.pickedUp) {
            return (
                <View style={{ alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                        <Text>{order.duration ? Math.round(order.duration) : ''} min</Text>
                        <View style={styles.bottomLineInfo}>
                            <IoniconsIcon name='person' size={20} color='white' />
                        </View>
                        <Text>{order.distance ? order.distance.toFixed(1) : '?'} km</Text>
                    </View>
                    <Text style={styles.bottomText}>Dropping off {order.user.name}</Text>
                </View>
            )
        }
        if (order) {
            return (
                <View style={{ alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                        <Text>{order.duration ? Math.round(order.duration) : ''} min</Text>
                        <View style={styles.bottomLineInfo}>
                            <IoniconsIcon name='person' size={20} color='white' />
                        </View>
                        <Text>{order.distance ? order.distance.toFixed(1) : '?'} km</Text>
                    </View>
                    <Text style={styles.bottomText}>Picking up {order.user.name}</Text>
                </View>
            )
        }
        if (isOnline) {
            return (<Text style={styles.bottomText}>You are Online</Text>)
        }
        return (<Text style={styles.bottomText}>You are Off-line</Text>)
    }

    return (
        <View>
            <MapView
                style={{ height: Dimensions.get('window').height - 100, width: '100%' }}
                provider={PROVIDER_GOOGLE}
                showsUserLocation={true}
                onUserLocationChange={onUserLocationChange}
                initialRegion={{
                    latitude: 51.1605227,
                    longitude: 71.4703558,
                    latitudeDelta: 0.28479920301184336,
                    longitudeDelta: 0.1714510252245211,
                }}
            >
                {order && (
                    <MapViewDirections
                        origin={myPosition}
                        onReady={onDirectionFound}
                        destination={getDestination()}
                        apikey={GOOGLE_MAPS_APIKEY}
                        strokeWidth={5}
                        strokeColor="hotpink"
                    />
                )}

                {/* <Marker
                    // key={index}
                    // coordinate={origin}
                    coordinate={myPosition}
                    title={'origin'}
                // description={marker.description}
                /> */}
                {/* <Marker
                    // key={index}
                    coordinate={destination}
                    title={'destination'}
                // description={marker.description}
                /> */}
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
                <AntDesign name='search1' size={25} color='#4a4a4a' />
            </Pressable>

            <Pressable
                onPress={() => console.log('press')}
                style={[styles.roundButton, { bottom: 100, left: 15 }]}
            >
                <MaterialCommunityIcons name='shield' size={25} color='#1495ff' />
            </Pressable>

            <Pressable
                onPress={() => console.log('press')}
                style={[styles.roundButton, { bottom: 100, right: 15 }]}
            >
                <MaterialCommunityIcons name='message-processing' size={25} color='#4a4a4a' />
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
                {renderBottomTitle()}
                <EntypoIcon name='menu' size={25} color='#4a4a4a' />
            </View>

            {
                newOrder && <NewOrderPopup
                    newOrder={newOrder}
                    onDecline={onDecline}
                    onAccept={() => onAccept(newOrder)}
                    duration={10}
                    distance={1.3}
                />
            }
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
        height: 85,
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
        bottom: Dimensions.get('window').height / 5 - 40,
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
    user: {
        backgroundColor: '#1495ff',
        padding: 10,
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center'

    },
    bottomLineInfo: {
        backgroundColor: '#d41212',
        width: 30,
        height: 30,
        alignItems: 'center',
        borderRadius: 15,
        justifyContent: 'center',
        marginHorizontal: 10
    },
    bottomLineComplete: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'tomato',
        width: 300,
        justifyContent: 'center',
        padding: 10
    }
})
