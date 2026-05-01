import { Text, View } from 'react-native';

import { styles } from '@/lib/styles/favorites';

export default function FavoritesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>FAVORIS</Text>
      <Text style={styles.subtitle}>Tes recettes favorites apparaîtront ici.</Text>
    </View>
  );
}
