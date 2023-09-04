import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { I18n } from 'i18n-js';
import { getLocales } from 'expo-localization';

const i18n = new I18n({
    en:{welcome: 'hello' },
    ja:{welcome: "新しい出発を待っています！"}});

const deviceLanguage = getLocales()[0].languageCode;
i18n.locale = deviceLanguage;

console.log(i18n.t('welcome'));




export default function App() {
  return (
    <View style={styles.container}>
      <Text>{deviceLanguage}</Text>
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
