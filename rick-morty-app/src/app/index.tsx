/*import * as Device from 'expo-device';
import { Platform, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AnimatedIcon } from '@/components/animated-icon';
import { HintRow } from '@/components/hint-row';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { WebBadge } from '@/components/web-badge';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';

function getDevMenuHint() {
  if (Platform.OS === 'web') {
    return <ThemedText type="small">use browser devtools</ThemedText>;
  }
  if (Device.isDevice) {
    return (
      <ThemedText type="small">
        shake device or press <ThemedText type="code">m</ThemedText> in terminal
      </ThemedText>
    );
  }
  const shortcut = Platform.OS === 'android' ? 'cmd+m (or ctrl+m)' : 'cmd+d';
  return (
    <ThemedText type="small">
      press <ThemedText type="code">{shortcut}</ThemedText>
    </ThemedText>
  );
}

export default function HomeScreen() {
  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ThemedView style={styles.heroSection}>
          <AnimatedIcon />
          <ThemedText type="title" style={styles.title}>
            Welcome to&nbsp;Expo
          </ThemedText>
        </ThemedView>

        <ThemedText type="code" style={styles.code}>
          get started
        </ThemedText>

        <ThemedView type="backgroundElement" style={styles.stepContainer}>
          <HintRow
            title="Try editing"
            hint={<ThemedText type="code">src/app/index.tsx</ThemedText>}
          />
          <HintRow title="Dev tools" hint={getDevMenuHint()} />
          <HintRow
            title="Fresh start"
            hint={<ThemedText type="code">npm run reset-project</ThemedText>}
          />
        </ThemedView>

        {Platform.OS === 'web' && <WebBadge />}
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: Spacing.four,
    alignItems: 'center',
    gap: Spacing.three,
    paddingBottom: BottomTabInset + Spacing.three,
    maxWidth: MaxContentWidth,
  },
  heroSection: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingHorizontal: Spacing.four,
    gap: Spacing.four,
  },
  title: {
    textAlign: 'center',
  },
  code: {
    textTransform: 'uppercase',
  },
  stepContainer: {
    gap: Spacing.three,
    alignSelf: 'stretch',
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.four,
    borderRadius: Spacing.four,
  },
});*/
//Para mostrar la ubicaciones 

/*import LocationsScreen from '@/presentation/screens/LocationsScreen';

export default function HomeScreen() {
  return <LocationsScreen />;
}*/
// para mostrar los perdonajes 
/* import CharactersScreen from '@/presentation/screens/CharactersScreen';

export default function HomeScreen() {
  return <CharactersScreen />;
}*/

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import CharactersScreen from '@/presentation/screens/CharactersScreen';
import LocationsScreen from '@/presentation/screens/LocationsScreen';

export default function HomeScreen() {
  const [screen, setScreen] = useState<'characters' | 'locations'>(
    'characters'
  );

  return (
    <View style={styles.container}>

      <Text style={styles.title}>RICK AND MORTY</Text>

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

      </View>

      <View style={styles.content}>
        {screen === 'characters' ? (
          <CharactersScreen />
        ) : (
          <LocationsScreen />
        )}
      </View>

    </View>
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
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 15,
  },

  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
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
    fontSize: 14,
    fontWeight: 'bold',
  },

  buttonTextActive: {
    color: '#000000',
  },

  content: {
    flex: 1,
  },
});