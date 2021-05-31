/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
} from 'react-native';


import HomeScreen from './src/screens/HomeScreen/HomeScreen';
import Amplify, { Auth, API, graphqlOperation } from 'aws-amplify'
import config from './src/aws-exports'
import { withAuthenticator } from 'aws-amplify-react-native'
import { getCarId } from './src/graphql/queries'
import { createCar } from './src/graphql/mutations';


Amplify.configure(config);


const App: () => Node = () => {

  useEffect(() => {
    const updateUserCar = async () => {
      // get auth user
      const authenticatedUser = await Auth.currentAuthenticatedUser({ bypassCache: true })
      if (!authenticatedUser) {
        return;
      }
      //check if user has already a car
      const carData = await API.graphql(
        graphqlOperation(
          getCarId,
          { id: authenticatedUser.attributes.sub }
        )
      )
      if (!!carData.data.getCar) {
        console.log('user already has a car!!')
        return
      }

      //if not, create a new car for the user
      const newCar = {
        id: authenticatedUser.attributes.sub,
        type: 'UberX',
        userId: authenticatedUser.attributes.sub,
      }
      await API.graphql(
        graphqlOperation(
          createCar, {
          input: newCar
        }
        )
      )
    }
    updateUserCar()
  }, [])

  return (
    <>
      <StatusBar barStyle={'dark-content'} />
      <SafeAreaView >
        <HomeScreen />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({

});

export default withAuthenticator(App);
