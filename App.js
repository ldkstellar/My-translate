import { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Button from './src/Button';
import { useCookie } from './src/lang/use-cookie';
import { useTransletion } from './src/use-translation';
import * as SplashScreen from 'expo-splash-screen';
import LoadingView from './src/LoadingView';
import LottieView from "lottie-react-native"

SplashScreen.preventAutoHideAsync();

export default function App() {

  const {format,setLocale,locale,t} = useTransletion();
  const {cookieKey} = useCookie();
  const [isLoaded, setIsLoad] = useState(false);
  const y = new Date().getFullYear();
  const m  = new Date().getMonth()+1; //month는 0~ 11까지  리턴하는 값이다. 
  const d  =  new Date().getDate();
  const todayText  = format(t('today_is'),y,m,d);
  const locales = ["ko","en","ja","zh"]
  //if (locale === null || cookieKey === "") return null;
  
  useEffect(()=>{
    if ( cookieKey !== "") {
      setIsLoad(true);
    }
  },[cookieKey]); // 종속성에 대해서 찾아보기
 
  
  useEffect(()=>{
    if (locale!==null) {
      SplashScreen.hideAsync();
    }
  },[locale]);

  if (!isLoaded) return <LoadingView />;
  
 const my =  false;

  return (
    <View style={styles.container}>
      <LottieView
        style={{
          position:"absolute",
          zIndex:-1
        }}
        autoPlay={false}
        source={require('./assets/background.json')}
        resizeMode="cover"/>
      <SafeAreaView style={{flex:1}}>
        <View style={styles.topContainer}>
          <Text style={styles.todayText}>{todayText}</Text>
          <Text style={styles.cookieText}>{t(cookieKey)}</Text>
        </View>
        <View style={styles.bottomContainer}>
          <View style={styles.buttonsContainer}>
            {locales.map(item =>(
              <Button
                key={item}
                onPress = {()=>setLocale(item)}
                isSelected ={locale === item}
                text ={item.toUpperCase()}
              />
            ))}
            
          </View>
        </View>
      </SafeAreaView>  

      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  topContainer: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
  },

  todayText: {
    fontFamily: "RIDIBatang",
    position: "absolute",
    top: 70,
    fontSize: 13,
    color: "#8b658f",
  },

  cookieText: {
    fontFamily: "RIDIBatang",
    fontSize: 22,
    color: "#372538",
    textAlign: "center",
    marginHorizontal: 30,
  },

  bottomContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },

  buttonsContainer: {
    flexDirection: "row",
    alignSelf: "center",
    marginBottom: 25,
  },

});
