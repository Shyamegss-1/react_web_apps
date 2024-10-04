import axios from "axios";

const useFetch = async (url, method = "get", data = null, headers = {}) => {
  const config = { headers, method, url, data };

  try {
    const response = await axios(config);

    return response;
  } catch (error) {
    return error;
  }
};

export default useFetch;
