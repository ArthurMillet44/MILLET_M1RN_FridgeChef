import { Text, View } from 'react-native';

import { styles } from './styles';

type Props = {
  step: number;
  total: number;
};

/**
 * Affiche le compteur d'étapes et la barre de progression du mode cuisine.
 * @param step Index de l'étape courante (commence à 0).
 * @param total Nombre total d'étapes.
 */
export function ProgressHeader({ step, total }: Props) {
  // Largeur en pourcentage selon l'avancement
  const progressWidth: `${number}%` = `${((step + 1) / total) * 100}%`;

  return (
    <View style={styles.header}>
      <Text style={styles.counter}>
        Étape {step + 1} / {total}
      </Text>
      <View style={styles.progressTrack}>
        {/* La largeur augmente à chaque étape suivante */}
        <View style={[styles.progressFill, { width: progressWidth }]} />
      </View>
    </View>
  );
}
