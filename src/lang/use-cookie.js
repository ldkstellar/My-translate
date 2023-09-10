import { useEffect, useState } from "react";
const getRandomCookie = ()=>{
    //Math.random은 0초과 15미만의 범위의 소수가 출력된다. 
    const cookieLen = 15;
    const randomNum = Math.floor(Math.random() * cookieLen);
    return `cookie_${randomNum+1}`;   
}

export const useCookie = ()=>{
    const [cookieKey,setCookieKey] = useState("");
   
    useEffect(()=>{
        const randomCookie = getRandomCookie();
       // console.log(randomCookie);
       setTimeout(()=>setCookieKey(randomCookie),2000);
       
    },[]);

    return{
        cookieKey
    }
};