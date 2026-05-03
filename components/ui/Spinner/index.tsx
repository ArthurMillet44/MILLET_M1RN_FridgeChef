import { palette } from "@/constants/design-system";
import { ActivityIndicator, View } from "react-native";
import { styles } from "./styles";

export function Spinner() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={palette.accent} />
    </View>
  );
}
