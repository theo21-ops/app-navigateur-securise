import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { auth } from '/workspace/app-navigateur-securise/app/firebaseConfig'; // ✅

import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  deleteUser,
  onAuthStateChanged,
  User,
} from 'firebase/auth';

export default function Profil() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const [lastReset, setLastReset] = useState<Date | null>(null);
  const [days, setDays] = useState<number>(0);

  // Charge la date de la dernière rechute
  useEffect(() => {
    const loadResetDate = async () => {
      const stored = await AsyncStorage.getItem('lastReset');
      if (stored) {
        const date = new Date(stored);
        setLastReset(date);
        updateDays(date);
      }
    };
    loadResetDate();
  }, []);

  // Observe l’état de connexion
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return unsubscribe;
  }, []);

  // Met à jour le compteur
  const updateDays = (resetDate: Date) => {
    const now = new Date();
    const diff = Math.floor((now.getTime() - resetDate.getTime()) / (1000 * 3600 * 24));
    setDays(diff);
  };

  const handleSignUp = () => {
    if (!email || !password) return Alert.alert('Remplis les champs');
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => Alert.alert('Compte créé !'))
      .catch((error) => Alert.alert('Erreur', error.message));
  };

  const handleSignIn = () => {
    if (!email || !password) return Alert.alert('Remplis les champs');
    signInWithEmailAndPassword(auth, email, password)
      .then(() => Alert.alert('Connecté !'))
      .catch((error) => Alert.alert('Erreur', error.message));
  };

  const handleSignOut = () => {
    signOut(auth).catch((error) => Alert.alert('Erreur', error.message));
  };

  const handleDeleteAccount = async () => {
    Alert.alert(
      'Supprimer le compte',
      'Cette action est irréversible. Continuer ?',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Supprimer',
          style: 'destructive',
          onPress: async () => {
            if (auth.currentUser) {
              try {
                await deleteUser(auth.currentUser);
                Alert.alert('Compte supprimé');
              } catch (error: any) {
                Alert.alert('Erreur', error.message);
              }
            }
          },
        },
      ]
    );
  };

  const handleReset = async () => {
    const now = new Date();
    setLastReset(now);
    await AsyncStorage.setItem('lastReset', now.toISOString());
    updateDays(now);
  };

  return (
    <View style={styles.container}>
      {user ? (
        <>
          <Text style={styles.title}>Bienvenue 👋</Text>
          <Text style={styles.email}>{user.email}</Text>

          <Text style={styles.counter}>
            {lastReset
              ? `⏳ ${days} jour${days > 1 ? 's' : ''} depuis la dernière rechute`
              : `Aucune date de rechute enregistrée`}
          </Text>

          <Button title="J’ai rechuté 😞" onPress={handleReset} />
          <View style={{ height: 10 }} />
          <Button title="Se déconnecter" onPress={handleSignOut} color="#f0ad4e" />
          <View style={{ height: 10 }} />
          <Button title="Supprimer mon compte" onPress={handleDeleteAccount} color="#d9534f" />
        </>
      ) : (
        <>
          <Text style={styles.title}>Connexion / Inscription</Text>

          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            style={styles.input}
          />

          <TextInput
            placeholder="Mot de passe"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
          />

          <Button title="Se connecter" onPress={handleSignIn} />
          <View style={{ height: 10 }} />
          <Button title="Créer un compte" onPress={handleSignUp} color="#5cb85c" />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  email: {
    fontSize: 18,
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    marginBottom: 12,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  counter: {
    fontSize: 16,
    marginVertical: 16,
    textAlign: 'center',
  },
});
