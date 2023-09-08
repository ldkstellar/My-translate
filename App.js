import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useTransletion } from './src/use-translation';

export default function App() {
  const {locale,t} = useTransletion();
  if (locale === null) return null;

  return (
    <View style={styles.container}>
      <Text>{t("cookie_2")}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
