import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import { useSession } from '@/presentation/context/SessionContext';

interface UserScreenProps {
  onLogout: () => void;
}

export default function UserScreen({
  onLogout,
}: UserScreenProps) {
  const { user, logout } = useSession();

  const handleLogout = async () => {
    await logout();
    onLogout();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        USUARIO AUTENTICADO
      </Text>

      <View style={styles.card}>
        <Text style={styles.label}>Correo:</Text>

        <Text style={styles.value}>
          {user?.email ?? 'No disponible'}
        </Text>

        <Text style={styles.label}>UID:</Text>

        <Text style={styles.value}>
          {user?.uid ?? 'No disponible'}
        </Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={handleLogout}
      >
        <Text style={styles.buttonText}>
          CERRAR SESIÓN
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    padding: 25,
  },

  title: {
    color: '#B026FF',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },

  card: {
    borderWidth: 1,
    borderColor: '#B026FF',
    borderRadius: 10,
    padding: 20,
    marginBottom: 30,
  },

  label: {
    color: '#B026FF',
    fontWeight: 'bold',
    marginTop: 10,
  },

  value: {
    color: '#fff',
    marginTop: 5,
  },

  button: {
    backgroundColor: '#B026FF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});