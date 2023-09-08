import {getLocales} from 'expo-localization';
import {I18n} from 'i18n-js';
import { useEffect, useState } from 'react';
const ko = require('./lang/lang.ko.json');
const en = require('./lang/lang.en.json');
const ja = require('./lang/lang.ja.json');
const zh = require('./lang/lang.zh.json');
const i18n = new I18n({
    ko,
    en,
    ja,
    zh,
});

const deviceLanguage = getLocales()[0].languageCode;

i18n.locale  = deviceLanguage;


export const useTransletion = () =>{
    const [locale , setLocale] = useState(null);//상태를 null 값으로 한다.
    useEffect(()=>{
        setLocale(deviceLanguage);//의존성 배열을 사용함으로써 
    },[]);
    
    return{
        locale,
        t: (scope) => i18n.t(scope),//스코프로 활용한 메소드 형식으로 해야지 가능하다. 코드 뜯어보면 안다.
        

    }
}