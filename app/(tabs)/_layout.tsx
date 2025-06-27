import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ title: 'Accueil' }} />
      <Tabs.Screen name="navigateur" options={{ title: 'Navigateur' }} />
      <Tabs.Screen name="discussions" options={{ title: 'Discussions' }} />
      <Tabs.Screen name="temoignages" options={{ title: 'Témoignages' }} />
      <Tabs.Screen name="profil" options={{ title: 'Profil' }} />
    </Tabs>
  );
}
