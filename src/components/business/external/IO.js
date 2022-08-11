const axios = require('axios');

/**
 * IO
 */

  /**
   * Filtro para las peticiones
   * @param {*} data
   * @param {*} url
   * @param {*} method
   */
  const query = (data, url, method, token) =>{
    return new Promise((resolve, reject) => {
      let response = fetchApi(data, url, method, token);
      response.then((response) => {
        if (response) {
          resolve(response);
        } else {
          resolve([]);
        }
      });

    });
  }

  const fetchApi = (data, url, method, token) => {
    let headers = {
      'Content-Type': 'application/json',
    };
    if (token) {
      headers.Authorization = token;
    }
    
    return new Promise((resolveRequest, reject) => {
      let query = {
        method: method,
        headers: headers,
        url: `${url}`
      };
      if (method === 'PATCH' || method === 'POST' || data != null) {
        query.data = data;
      }
      //console.log(`${url}`);
      //console.log(query);
      axios(query)
        .then((response) => {
          if (response.status == 403) {
            resolveRequest({error: response.status});
            //console.log('Error 403');
          }
          if (response.status === 400) {
            resolveRequest({error: response.status, response: response});
            //console.log('Error 403');
          } else {
            resolveRequest(response);
          }
        })
        .catch(function (err) {
          console.error('error peticion', err);
        });
    });
  }

  
  const queryForm = (data, name, method, urlbase, token) => {
    return new Promise((resolve, reject) => {
      let response = fetchForm(data, name, method, urlbase, token);
      response.then((response) => {
        if (response) {
          resolve(response);
        } else {
          resolve([]);
        }
      });
    });
  }
  /**
   * Generar la petición REST
   * @param {*} data
   * @param {*} name
   * @param {*} method
   */
  const fetchForm = (data, name, method, urlbase, token) => {
    let headers = {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    };

    if (token) {
      headers.Authorization = token;
    }

    return new Promise((resolveRequest) => {
      let query = {
        method: method,
        headers: headers,
        url:`${urlbase}${name}`
      };

      if (method === 'PATCH' || method === 'POST' || data != null) {
        query.body = data;
      }
      
      fetch(`${urlbase}${name}`, query)
        .then((response) => {
          if (response.status == 403) {
            resolveRequest({error: response.status});
            //console.log('Error 403');
          }
          if (response.status == 400) {
            resolveRequest({error: response.status, response: response});
            //console.log('Error 403');
          } else {
            try {
              var responseData = response.json();

              responseData.then((responsejson) => {
                if (responsejson) {
                  resolveRequest(responsejson);
                }
                resolveRequest({});
              });
            } catch (err) {
              console.error('error haciendo parse de la respuesta', err);
            }
          }
        })
        .catch(function (err) {
          console.error('error peticion', err);
        });
    });
  }

module.exports = { query, queryForm}
