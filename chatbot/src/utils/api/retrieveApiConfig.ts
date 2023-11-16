const retrieveApiConfig = async (): Promise<any> => {
  const response = await fetch(
    `https://ihn8hgl3g2.execute-api.us-east-1.amazonaws.com/dev/retrieveConfig/c80ccb40-4dd8-40d0-a9a3-eb3410982a15`,
    {
      method: "GET",
      headers: {
        "x-api-key": "3gGstcAKIx7skbgVXnjR85C2d1OR1BQc5WW1yUl6",
      },
    }
  );
  const config = await response.json();
  return config;
};

export default retrieveApiConfig;
