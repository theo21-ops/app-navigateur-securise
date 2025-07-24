import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName = 'ellipse';
          if (route.name === 'navigateur') iconName = 'globe';
          else if (route.name === 'discussion') iconName = 'chatbubbles';
          else if (route.name === 'temoignages') iconName = 'book';
          else if (route.name === 'profil') iconName = 'person';

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tabs.Screen name="navigateur" options={{ title: 'Navigateur' }} />
      <Tabs.Screen name="discussion" options={{ title: 'Discussion' }} />
      <Tabs.Screen name="temoignages" options={{ title: 'Témoignages' }} />
      <Tabs.Screen name="profil" options={{ title: 'Profil' }} />
    </Tabs>
  );
}
