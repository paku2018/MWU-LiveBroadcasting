import axios from 'axios';
import {getAuthTokenInfo, removeLoginInfo, saveLanguageInfo} from "../util";
import {responseMessages} from "../constants/response-messages";
import app from '../main';

const getApiManager = function () {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + getAuthTokenInfo();
  const apiManager = axios.create({
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Authorization': 'Bearer ' + getAuthTokenInfo(),
    },
    validateStatus: function (status) {

      return status >= 200 && status <= 503;
    },
  });
  apiManager.interceptors.response.use((response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data

    let message = response.data.message;


    switch (message) {

      case responseMessages['invalid-token']:
        saveLanguageInfo();
        removeLoginInfo();

        app.$notify('error', 'Error', 'Token invalid', {
          duration: 3000,
          permanent: false
        });

        app.$router.push('/auth/login').catch(error => {
          console.log(error)
        });
        break;
      case responseMessages['token-expired']:
        saveLanguageInfo();
        removeLoginInfo();

        app.$notify('error', 'Error', 'Token expired', {
          duration: 3000,
          permanent: false
        });

        app.$router.push('/auth/login').catch(error => {
          console.log(error)
        });
        break;

      case responseMessages['forbidden']:
        app.$notify('error', 'Error', 'Forbidden Error', {
          duration: 3000,
          permanent: false
        });

        break;

      case responseMessages['invalid-parameter']:
        app.$notify('error', 'Error', 'Invalid Parameter', {
          duration: 3000,
          permanent: false
        });

        break;

      default:

    }

    return response;
  }, (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    app.$notify('error', 'Error', 'Network error', {
      duration: 3000,
      permanent: false
    });
    return Promise.reject(error);
  });

  return apiManager;
};

const getApiManagerError = function () {

  const apiManager = axios.create({
    headers: {
      'X-AUTH-TOKEN': getAuthTokenInfo().token,
      'Access-Control-Allow-Origin': '*'
    }
  });
  apiManager.interceptors.response.use((response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data

    let message = response.data.message;


    switch (message) {

      case responseMessages['invalid-token']:
        saveLanguageInfo();
        removeLoginInfo();

        app.$router.push('/auth/login').catch(error => {
          console.log(error)
        });
        break;
      case responseMessages['token-expired']:
        saveLanguageInfo();
        removeLoginInfo();

        app.$router.push('/auth/login').catch(error => {
          console.log(error)
        });
        break;

      case responseMessages['forbidden']:

        break;

      case responseMessages['invalid-parameter']:

        break;

      default:

    }

    return response;
  }, (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  });

  return apiManager;
};

const downLoadFileFromServer = (link,params, name = 'sales', ext) => {
  getApiManager()
    .post(link, params, {
      responseType: 'blob'
    })
    .then((response) => {
      let status = response.status;

      if (status === 200) {
        let fileURL = window.URL.createObjectURL(new Blob([response.data]));
        let fileLink = document.createElement('a');
        fileLink.href = fileURL;
        fileLink.setAttribute('download', name + '.' + ext);
        document.body.appendChild(fileLink);
        fileLink.click();
        fileLink.parentNode.removeChild(fileLink);

      } else if (status === 403) {

        app.$notify('warning', 'Warning', 'API link is incorrect', {
          duration: 3000,
          permanent: false
        });
      }

    })
    .catch(error => {

      throw new Error(error);
    });
};

export {getApiManager, getApiManagerError, downLoadFileFromServer};
