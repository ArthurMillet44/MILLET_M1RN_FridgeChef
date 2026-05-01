import { Text, View } from 'react-native';

import { styles } from '@/lib/styles/recipes';

export default function RecipesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>RECETTES</Text>
      <Text style={styles.subtitle}>Les suggestions apparaîtront ici.</Text>
    </View>
  );
}
