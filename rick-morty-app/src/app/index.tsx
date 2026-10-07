import React, { useState } from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import {
  SessionProvider,
  useSession,
} from '@/presentation/context/SessionContext';

import LoginScreen from '@/presentation/screens/LoginScreen';
import UserScreen from '@/presentation/screens/UserScreen';
import CharactersScreen from '@/presentation/screens/CharactersScreen';
import LocationsScreen from '@/presentation/screens/LocationsScreen';


function AppContent() {

  const { isAuthenticated } = useSession();

  const [screen, setScreen] = useState<
    'characters' | 'locations' | 'user'
  >('characters');


  // Si no está autenticado, mostramos Login
  if (!isAuthenticated) {
    return (
      <LoginScreen
        onLoginSuccess={() => setScreen('characters')}
      />
    );
  }


  // Aplicación principal
  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        RICK AND MORTY
      </Text>


      {/* BOTONES DE NAVEGACIÓN */}
      <View style={styles.buttonContainer}>

        <TouchableOpacity
          style={[
            styles.button,
            screen === 'characters' && styles.buttonActive,
          ]}
          onPress={() => setScreen('characters')}
        >
          <Text
            style={[
              styles.buttonText,
              screen === 'characters' && styles.buttonTextActive,
            ]}
          >
            CHARACTERS
          </Text>
        </TouchableOpacity>


        <TouchableOpacity
          style={[
            styles.button,
            screen === 'locations' && styles.buttonActive,
          ]}
          onPress={() => setScreen('locations')}
        >
          <Text
            style={[
              styles.buttonText,
              screen === 'locations' && styles.buttonTextActive,
            ]}
          >
            LOCATIONS
          </Text>
        </TouchableOpacity>


        <TouchableOpacity
          style={[
            styles.button,
            screen === 'user' && styles.buttonActive,
          ]}
          onPress={() => setScreen('user')}
        >
          <Text
            style={[
              styles.buttonText,
              screen === 'user' && styles.buttonTextActive,
            ]}
          >
            MI USUARIO
          </Text>
        </TouchableOpacity>

      </View>


      {/* CONTENIDO */}
      <View style={styles.content}>

        {screen === 'characters' && <CharactersScreen />}
        {screen === 'locations' && <LocationsScreen />}
        {screen === 'user' && (
          <UserScreen onLogout={() => setScreen('characters')} />
        )}

      </View>

    </View>
  );
}


/*
 * SessionProvider envuelve toda la aplicación
 * para que LoginScreen, UserScreen y HomeScreen
 * puedan utilizar el estado de autenticación.
 */
export default function HomeScreen() {

  return (
    <SessionProvider>
      <AppContent />
    </SessionProvider>
  );
}


const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#000000',
    paddingTop: 30,
  },


  title: {
    color: '#B026FF',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,

    textShadowColor: '#B026FF',
    textShadowOffset: {
      width: 0,
      height: 0,
    },
    textShadowRadius: 10,
  },


  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 15,
    paddingHorizontal: 10,
  },


  button: {
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderWidth: 2,
    borderColor: '#B026FF',
    borderRadius: 12,
    backgroundColor: '#0A0A0A',
  },


  buttonActive: {
    backgroundColor: '#B026FF',
  },


  buttonText: {
    color: '#B026FF',
    fontSize: 12,
    fontWeight: 'bold',
  },


  buttonTextActive: {
    color: '#000000',
  },


  content: {
    flex: 1,
  },

});