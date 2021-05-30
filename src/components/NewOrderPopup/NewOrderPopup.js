import React from 'react'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import EntypoIcon from 'react-native-vector-icons/Entypo';

export default function NewOrderPopup() {

    const onDecline = () => {
        console.log('Decline order')
    }
    const onAccept = () => {
        console.log('Accept order')
    }


    return (
        <View style={styles.root}>
            <Pressable onPress={onDecline} style={styles.declineButton}>
                <Text style={styles.declineText}>Decline</Text>
            </Pressable>
            <Pressable style={styles.container} onPress={onAccept}>
                <View style={styles.row}>
                    <Text style={styles.rowText} >UberX</Text>
                    <View style={styles.user}>
                        <IoniconsIcon name='person' size={35} color='white' />
                    </View>
                    <Text style={styles.rowText}>
                        <EntypoIcon name='star' size={18} color='white' />
                                 15
                    </Text>
                </View>
                <Text style={styles.minuts}>2 min</Text>
                <Text style={styles.dist}>0.7 mi</Text>
                <View style={styles.bottomTextContainer}>
                    <Text style={styles.bottomText}>
                        Toward your destination
                    </Text>
                </View>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({


    root: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        bottom: 0,
        padding: 15,
        justifyContent: 'space-between',
        backgroundColor: '#00000085'
    },
    container: {
        backgroundColor: 'black',
        borderRadius: 10,
        height: 250,
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    declineButton: {
        backgroundColor: 'black',
        padding: 20,
        borderRadius: 35,
        width: 130,
        alignItems: 'center'
    },
    declineText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold'
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    rowText: {
        color: 'lightgrey',
        fontSize: 20,
        marginHorizontal: 10
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
    minuts: {
        color: 'lightgrey',
        fontSize: 36
    },
    dist: {
        color: 'lightgrey',
        fontSize: 26
    },
    bottomTextContainer: {
        borderTopColor: '#eee',
        borderTopWidth: 1,
    },
    bottomText: {
        color: '#eee',
        fontSize: 18,
        padding: 10
    },
})
