// dbUtils.js is a place holder where the web API methods to access data from the server are kept.
import $ from 'jquery';

export const dbUtils = (dbCallbacks) => {
   var  getVehiclesData = function( viewVehicles ) {
          var url = '/vehicles/';
          // console.log('url ' + url);
          fetch(url, {
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json'
              }
          })
              .then((response) => {
                  return response.json();
              }).then(function (myJson) {
               console.log(myJson);
               viewVehicles(myJson);
          })
              .catch((error) => {
                  console.log('error   = ' + error);
              })
      }
   
   return {
      getVehiclesData: getVehiclesData
   }
}