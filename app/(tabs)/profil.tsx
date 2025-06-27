import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { auth } from '../firebaseConfig';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
} from 'firebase/auth';

export default function Profil() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState<User | null>(null);

  // Écoute l’état de connexion
  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return unsubscribe;
  }, []);

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => Alert.alert('Compte créé !'))
      .catch((error) => Alert.alert('Erreur', error.message));
  };

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => Alert.alert('Connecté !'))
      .catch((error) => Alert.alert('Erreur', error.message));
  };

  const handleSignOut = () => {
    signOut(auth).catch((error) => Alert.alert('Erreur', error.message));
  };

  if (user) {
    return (
      <View style={{ flex:1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Connecté en tant que :</Text>
        <Text style={{ fontWeight: 'bold' }}>{user.email}</Text>
        <Button title="Se déconnecter" onPress={handleSignOut} />
      </View>
    );
  }

  return (
    <View style={{ flex:1, justifyContent: 'center', padding: 20 }}>
      <Text>Inscription / Connexion</Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        style={{
          borderWidth: 1,
          padding: 10,
          marginVertical: 10,
          borderRadius: 5,
        }}
      />
      <TextInput
        placeholder="Mot de passe"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{
          borderWidth: 1,
          padding: 10,
          marginVertical: 10,
          borderRadius: 5,
        }}
      />

      <Button title="S'inscrire" onPress={handleSignUp} />
      <View style={{ marginVertical: 10 }} />
      <Button title="Se connecter" onPress={handleSignIn} />
    </View>
  );
}
