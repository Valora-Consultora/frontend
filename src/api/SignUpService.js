import apiClient from "./apiClient";

const API_URL = process.env.REACT_APP_API_URL;

const SignUpService = (user) => {

  let url;
  //console.log(user);
  if (user.tipo_tasador === 'relevador') {
    url = `${API_URL}/api/create-relevador`;
  } else if (user.tipo_tasador === 'tasador') {
    url = `${API_URL}/api/create-tasador`;
  } else {
    url = `${API_URL}/api/create-${user.tipo_usuario.toLowerCase()}`;
  }


  return apiClient.post(url, user)
    .then(response => response.data)
    .catch(error => {
      console.error('Error al crear usuario:', error);
      throw error;
    });
};

export default SignUpService;