import { Text, View } from 'react-native';

import { styles } from '@/lib/styles/fridge';

export default function FridgeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>MON FRIGO</Text>
      <Text style={styles.subtitle}>Tes ingrédients apparaîtront ici.</Text>
    </View>
  );
}
