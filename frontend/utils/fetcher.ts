import axios from "axios";

const fetcher = async (url: string, headers: {}) => {
  const { data } = await axios.get(url, {
    headers,
    withCredentials: true,
  });
  return data;
};

export default fetcher;
