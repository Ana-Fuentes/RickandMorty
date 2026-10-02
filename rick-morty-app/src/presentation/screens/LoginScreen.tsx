import React, { useState } from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ImageBackground,
} from 'react-native';

import { signInWithEmailAndPassword } from 'firebase/auth';

import { auth } from '@/infrastructure/firebase/firebaseConfig';

interface LoginScreenProps {
  onLoginSuccess: () => void;
}

export default function LoginScreen({
  onLoginSuccess,
}: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {

    // Verificar campos vacíos
    if (!email || !password) {

      console.warn('⚠️ INICIO DE SESIÓN: DATOS INCOMPLETOS');

      Alert.alert(
        'Datos incompletos',
        'Ingresa tu correo y contraseña.'
      );

      return;
    }

    console.log('🔐 Intentando iniciar sesión...');
    console.log('📧 Correo:', email);

    try {

      // Autenticación con Firebase
      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      // MENSAJE EN CONSOLA
      console.log('✅ INICIO DE SESIÓN CORRECTO');
      console.log('👤 Usuario autenticado:', email);

      // MENSAJE EN LA INTERFAZ
      Alert.alert(
        'Autenticación exitosa',
        `Bienvenido a Rick and Morty.\n\nUsuario: ${email}`,
        [
          {
            text: 'Continuar',
            onPress: onLoginSuccess,
          },
        ]
      );

    } catch (error) {

      // MENSAJE DE ERROR EN CONSOLA
      console.error('❌ ERROR DE AUTENTICACIÓN');
      console.error('Usuario:', email);
      console.error('Error:', error);

      // MENSAJE DE ERROR EN LA INTERFAZ
      Alert.alert(
        'Autenticación no válida',
        'El correo o la contraseña son incorrectos.'
      );
    }
  };

  return (
    <ImageBackground
      source={{
        uri: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
      }}
      style={styles.background}
      resizeMode="cover"
    >

      <View style={styles.overlay}>

        <View style={styles.loginCard}>

          <Text style={styles.title}>
            RICK AND MORTY
          </Text>

          <Text style={styles.subtitle}>
            INICIAR SESIÓN
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Correo electrónico"
            placeholderTextColor="#AAAAAA"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            placeholderTextColor="#AAAAAA"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <TouchableOpacity
            style={styles.button}
            onPress={handleLogin}
          >
            <Text style={styles.buttonText}>
              INICIAR SESIÓN
            </Text>
          </TouchableOpacity>

          <Text style={styles.footer}>
            Explora el universo de Rick and Morty
          </Text>

        </View>

      </View>

    </ImageBackground>
  );
}

const styles = StyleSheet.create({

  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },

  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },

  loginCard: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: 'rgba(10, 10, 10, 0.82)',
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#B026FF',
    padding: 25,

    shadowColor: '#B026FF',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.8,
    shadowRadius: 15,
    elevation: 15,
  },

  title: {
    color: '#B026FF',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,

    textShadowColor: '#B026FF',
    textShadowOffset: {
      width: 0,
      height: 0,
    },
    textShadowRadius: 12,
  },

  subtitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 25,
  },

  input: {
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    borderWidth: 1.5,
    borderColor: '#B026FF',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 14,
    color: '#FFFFFF',
    fontSize: 15,
    marginBottom: 15,
  },

  button: {
    backgroundColor: '#B026FF',
    borderRadius: 14,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 5,

    shadowColor: '#B026FF',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.9,
    shadowRadius: 10,
    elevation: 8,
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },

  footer: {
    color: '#AAAAAA',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 12,
  },

});