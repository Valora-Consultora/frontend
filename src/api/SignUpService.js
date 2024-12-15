import axios from "axios";

const SignUpService = (user) => {

  let url;
  console.log(user);
  if (user.tipo_tasador === 'relevador') {
    url = 'https://valora-app-53efe0915b3a.herokuapp.com/api/create-relevador';
  } else if (user.tipo_tasador === 'tasador') {
    url = 'https://valora-app-53efe0915b3a.herokuapp.com/api/create-tasador';
  } else {
    url = `https://valora-app-53efe0915b3a.herokuapp.com/api/create-${user.tipo_usuario.toLowerCase()}`;
  }


  return axios.post(url, user)
    .then(response => response.data)
    .catch(error => {
      console.error('Error al crear usuario:', error);
      throw error;
    });
};

export default SignUpService;