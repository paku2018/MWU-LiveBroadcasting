export const getAuthTokenInfo = () => {
  let loginInfo = localStorage.getItem('loginInfo');
  try {
    loginInfo = JSON.parse(loginInfo);
    if (loginInfo && loginInfo.token) {//&& loginInfo.token.expirationTimestamp
      return loginInfo.token;
    }
  } catch (e) {
    console.log(e)
  }

  return {
    token: ''
  };
};

export const removeLoginInfo = () => {
  sessionStorage.removeItem('loginInfo');
};

export const saveLanguageInfo = () => {
  let account =  sessionStorage.getItem('loginAccount');

  let currentLanguage = sessionStorage.getItem('currentLanguage');

  let data, tmp=false;
  if(sessionStorage.getItem('languageInfo')===null) {
    data = [];
  }else {
    data = JSON.parse(sessionStorage.getItem('languageInfo'));
  }
  for(let i=0; i<data.length; i++){
    if(data[i].account===account){
      data[i].currentLanguage = currentLanguage;
      tmp = true;
    }
  }
  if(tmp===false) {
    data.push({
      account: account,
      currentLanguage: currentLanguage
    });
  }
  sessionStorage.setItem('languageInfo', JSON.stringify(data));
};

export const validateEmail = (email) =>{
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};




