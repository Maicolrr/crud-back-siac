import React from 'react'
import { Header } from '../../layouts/Header/Header';

export const Profile = () => {

  //traigo la informacion de la secion activa
  var user = JSON.parse(localStorage.getItem("user"));
  // console.log(user);
  
  var token = user.token;
  // console.log(token);
  
  var name = user.name;
  
  

  // posivilidad 1
 
  // fetch("http://localhost:5000/api/users/me",{
  //   method: 'GET',
  //   headers: {
  //   'Authorization': `Bearer ${token}`
  //   }
  // })
  // .then(response => response.json())
  // .then(data => console.log(data))
  // .catch(error => console.error(error));

  //posivilidad 2

  // var myHeaders = new Headers();
  // myHeaders.append("Authorization", "Bearer");
  // myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  // var urlencoded = new URLSearchParams();
  // urlencoded.append("token", token);

  // var requestOptions = {
  //   method: 'GET',
  //   headers: myHeaders,
  //   body: urlencoded,
  //   redirect: 'follow'
  // };

  // fetch("http://localhost:5000/api/users/me", requestOptions)
  // .then(response => response.text())
  // .then(result => console.log(result))
  // .catch(error => console.log('error', error));

  //posivilidad 3
  
  // fetch("http://localhost:5000/api/users/me?Bearer Token="+token)
  // .then(response => response.text())
  // .then(result => console.log(result))
  // .catch(error => console.log('error', error));
  
  
  
  //posivilidad 4

//  fetch('https://randomuser.me/api', headers: {
//       "Authorization": "Bearer API_TOKEN", //Agregado
//     },
//   )
// .then(r => r.json())
// .then(data => {
    
// })

  // fetch(urlPersonal)
  // .then(response => response.json())
  // .then(data => { 
  //   console.log(data);
  // })

  //posivilidad 5

  var url='http://localhost:5000/api/users/me'

  const headers = {
    'Authorization': `Bearer ${token}`
  };

  fetch(url, { headers })
  .then(response => response.json())
  .then(data => {
    // Manejar los datos de la respuesta
    console.log(data);
  })

  return (
    <div>
      <Header/>
      <h1>{name}</h1>

    </div>
  )
}
