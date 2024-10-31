import axios from "axios";

const httpClient = axios.create({
  headers: {
    'X-Requested-With': 'XMLHttpRequest'
  }
})

export default httpClient;
