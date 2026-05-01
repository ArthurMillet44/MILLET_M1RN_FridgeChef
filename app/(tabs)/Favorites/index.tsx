import { Text, View } from 'react-native';

import { styles } from './_styles';

export default function FavoritesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>FAVORIS</Text>
      <Text style={styles.subtitle}>Tes recettes favorites apparaîtront ici.</Text>
    </View>
  );
}
