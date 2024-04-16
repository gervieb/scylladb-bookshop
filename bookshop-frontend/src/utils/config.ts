import axios from "axios";
const URL = "http://localhost:5000";

const customInstance = axios.create({
  baseURL: URL,
  headers: { Accept: "application/json" },
});

export default customInstance;
