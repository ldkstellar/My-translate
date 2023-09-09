import {getLocales} from 'expo-localization';
import {I18n} from 'i18n-js';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
const ko = require('./lang/lang.ko.json');
const en = require('./lang/lang.en.json');
const ja = require('./lang/lang.ja.json');
const zh = require('./lang/lang.zh.json');
const LOCALE_KEY = "locale2";
const i18n = new I18n({
    ko,
    en,
    ja,
    zh,
});
const deviceLanguage = getLocales()[0].languageCode;

export const useTransletion = () =>{
    const [locale , _setLocale] = useState(null);//상태를 null 값으로 한다.
    const setLocale = (v)=>{
        _setLocale(v);
        AsyncStorage.setItem(LOCALE_KEY,v);
    };
    const init = async()=>{
        const fs = await AsyncStorage.getItem(LOCALE_KEY);
        console.log(fs);
        if (fs !== null){//null이아니면
            _setLocale(fs);// fs값을 넣고
        }
        else
        {// fs 가 null 일 경우 
            _setLocale(deviceLanguage);//기기의 디바이스 언어를 넣는다.
        }
        
    }
    
    useEffect(()=>{
        init();
        //_setLocale(deviceLanguage);//의존성 배열을 사용함으로써 랜더링 초기시 한번만 실행하도록 한다.
       // _setLocale("ko");
    },[]);
    
    return{
        setLocale,
        locale,
        t: (scope) => i18n.t(scope,{locale}),// 스코프로 활용한 메소드 형식으로 해야지 가능하다. locale의 설정으로 들어간다.json을 변경한다.
        

    }
}