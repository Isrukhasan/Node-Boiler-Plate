import cookie from 'js-cookie'

//set in cookie
export const setCookie=(key,value)=>{
    if(window!=='undefined'){
        cookie.set(key,value,{
            expires:1
        })
    }
}

//remove the cookie
export const removeCookie=(key)=>{
    if(window!=='undefined'){
        cookie.remove(key ,{
            expires:1
        })
    }
}

//get from cookie such as stored token
export const getCookie=(key)=>{
    if(window!=='undefined'){
        return cookie.get(key)
    }
}

// set in local storage
export const setLocalStorage=(key,value)=>{
    if(window!=='undefined'){
        localStorage.setItem(key,JSON.stringify(value))
    }
}
//remove from local storage
export const removeLocalStorage=(key)=>{
    if(window!=='undefined'){
        localStorage.removeItem(key)
    }
}
//authentic user with cookie with help of local storage

export const authenticate=(response,next)=>{
    setCookie('token',response.data.token);
    setLocalStorage('token',response.data.user);
}
//access user information
export const isAuth=()=>{
    if(window!=='undefined'){
        const cookieChecked=getCookie('token');
        if (cookieChecked){
            if(localStorage.getItem('user')){
                return JSON.parse(localStorage.getItem('user'));
            }
            else{
                return false;
            }
        }
    }
}

//signout
export const signout=next=>{
    removeCookie('token'); removeLocalStorage('user');
    next()
}