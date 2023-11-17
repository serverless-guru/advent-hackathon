const retrieveApiConfig = async (): Promise<any> => {
  const response = await fetch(
    `https://i5qggphw3m.execute-api.us-east-1.amazonaws.com/staging/retrieveConfig/a12ce8bb-e701-4f1e-baed-93780867e7bf`,
    {
      method: "GET",
      headers: {
        "x-api-key": "4bgwU294dw3zoHewMeLbE2XYwCmxjWWr9pvJWzJz",
      },
    }
  );
  const config = await response.json();
  return config;
};

export default retrieveApiConfig;