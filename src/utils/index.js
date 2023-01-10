export * from './constants';

//setItem 
export const setItemInLocalStorage = (key, value) =>{
    if(!key || !value){
        return console.log("Can not store in LS");
    }
    const valueToStore = typeof value !== "string" ? JSON.stringify(value) : value;
    localStorage.setItem(key, valueToStore);
}

//getItem
export const getItemInLocalStorage = (key) =>{
    if(!key){
        return console.log("Can not get the value from LS");
    }
    return localStorage.getItem(key);
}

//removeItem
export const removeItemInLocalStorage = (value, key) =>{
    if(!key){
        return console.log("Can not get the value from LS");
    }
    localStorage.removeItem(key);
}

export const getFormBody = (params) => {
    let formBody = [];
  
    for (let property in params) {
        let encodedKey = encodeURIComponent(property);           // 'user name' => 'user%20name'
        let encodedValue = encodeURIComponent(params[property]); // aakash 123 => aakash%2020123
    
        formBody.push(encodedKey + '=' + encodedValue);
    }
  
    return formBody.join('&'); // 'username=aakash&password=123213'
};

  