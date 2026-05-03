import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Text, TouchableOpacity, View } from 'react-native';

import { palette } from '@/constants/design-system';
import { styles } from './styles';

type Props = {
  onPrev: () => void;
  onNext: () => void;
  isFirst: boolean;
  isLast: boolean;
};

/**
 * Barre de navigation du mode cuisine avec les boutons Précédent et Suivant.
 * Les boutons sont désactivés et grisés aux extrémités.
 * @param onPrev Callback appelé au tap sur "Précédent".
 * @param onNext Callback appelé au tap sur "Suivant".
 * @param isFirst Vrai si on est à la première étape (désactive "Précédent").
 * @param isLast Vrai si on est à la dernière étape (désactive "Suivant").
 */
export function NavFooter({ onPrev, onNext, isFirst, isLast }: Props) {
  return (
    <View style={styles.footer}>
      <TouchableOpacity
        style={[styles.navBtn, isFirst && styles.navBtnDisabled]}
        onPress={onPrev}
        disabled={isFirst}
      >
        <MaterialIcons name="arrow-back" size={18} color={palette.textPrimary} />
        <Text style={styles.navBtnText}>Précédent</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.navBtn, styles.navBtnPrimary, isLast && styles.navBtnDisabled]}
        onPress={onNext}
        disabled={isLast}
      >
        <Text style={[styles.navBtnText, { color: palette.accentFg }]}>Suivant</Text>
        <MaterialIcons name="arrow-forward" size={18} color={palette.accentFg} />
      </TouchableOpacity>
    </View>
  );
}
