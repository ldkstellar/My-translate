import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Button from './src/Button';
import { useCookie } from './src/lang/use-cookie';
import { useTransletion } from './src/use-translation';
import * as SplashScreen from 'expo-splash-screen';
import LoadingView from './src/LoadingView';


SplashScreen.preventAutoHideAsync();

export default function App() {

  const {format,setLocale,locale,t} = useTransletion();
  const {cookieKey} = useCookie();
  const [isLoaded, setIsLoad] = useState(false);
  const y = new Date().getFullYear();
  const m  = new Date().getMonth()+1; //month는 0~ 11까지  리턴하는 값이다. 
  const d  =  new Date().getDate();
  const todayText  = format(t('today_is'),y,m,d);
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
  


  return (
    <View style={styles.container}>
      <Text>{todayText}</Text>
      <Text>{t(cookieKey)}</Text>
      <View style={styles.buttonContainer}>
        <Button
          onPress = {()=>setLocale("ko")}
          isSelected ={locale === "ko"}
          text ="KO"/>

        <Button
          onPress ={()=>setLocale("en")}
          isSelected={locale === "en"}
          text ="EN"/>

        <Button
          onPress ={()=>setLocale("ja")}
          isSelected={locale === "ja"}
          text ="JA"/>

        <Button
          onPress ={()=>setLocale("zh")}
          isSelected={locale === "zh"}
          text ="ZH"/>  

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'purple',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer:{
    flexDirection:"row",
  },
  buttonText:{
    color:"white",
    fontSize:16,
  }
});
