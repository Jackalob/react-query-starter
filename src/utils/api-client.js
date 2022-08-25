import axios from "axios";

const baseURL = "http://localhost:4000";
const localStorageKey = "TEST_TOKEN_KEY";

const instance = axios.create({ baseURL });

function client(
  endpoint,
  { data, header: customHeaders, ...customConfig } = {}
) {
  const token = window.localStorage.getItem(localStorageKey);

  const config = {
    url: endpoint,
    method: data ? "POST" : "GET",
    data: data ? JSON.stringify(data) : undefined,
    headers: {
      Authorization: token ? `Bearer ${token}` : undefined,
      "Content-Type": data ? "application/json" : undefined,
      timeout: 15000,
      ...customHeaders,
    },
    ...customConfig,
  };

  const onSuccess = (response) => response;
  const onError = (error) => {
    console.log("there's an error: " + error.response.status);
    // catch error e.g.
    if (error.response.status === 401) {
      // logout
    }
  };
  return instance(config).then(onSuccess).catch(onError);
}

export { client };
