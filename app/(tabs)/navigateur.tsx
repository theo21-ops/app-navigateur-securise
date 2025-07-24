import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Platform } from 'react-native';
import { WebView } from 'react-native-webview';

export default function Navigateur() {
  const [url, setUrl] = useState('https://www.google.com/'); // Moteur de recherche neutre
  const [inputUrl, setInputUrl] = useState('');

  const handleGo = () => {
    let formattedUrl = inputUrl.trim();
    if (!formattedUrl.startsWith('http')) {
      formattedUrl = 'https://' + formattedUrl;
    }
    setUrl(formattedUrl);
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.searchBar}>
        <TextInput
          style={styles.input}
          placeholder="Entrer une URL"
          value={inputUrl}
          onChangeText={setInputUrl}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Button title="Aller" onPress={handleGo} />
      </View>
      <WebView
        source={{ uri: url }}
        style={{ flex: 1 }}
        javaScriptEnabled
        domStorageEnabled
        originWhitelist={['*']}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  searchBar: {
    flexDirection: 'row',
    padding: 8,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    marginRight: 8,
    padding: Platform.OS === 'ios' ? 12 : 8,
    borderRadius: 5,
    backgroundColor: 'white',
  },
});
