import axios from "axios";

const BackendApi = axios.create({
    baseURL: 'http://127.0.0.1:8080/',
    timeout: 1000,
    headers: {'Content-type': 'json'}
  });

  export default BackendApi;