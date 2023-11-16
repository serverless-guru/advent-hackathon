const createApiKey = async (): Promise<any> => {
  const response = await fetch(
    "https://i5qggphw3m.execute-api.us-east-1.amazonaws.com/staging/generateApiKey",
    {
      method: "POST",
      // mode: 'no-cors',
      headers: {
        "Content-Type": "application/json",
        "admin-access": "approved",
        "x-api-key": "M9dDZ3zrHx7mCULcemjDS3pV49uT0L0p4CRRsGdf",
      },
      body: JSON.stringify({
        apiConfig: {
          max_messages: 15,
        },
        ttlInSeconds: 14400,
      }),
    }
  );
  const data = await response.json();
  return data;
};

export default createApiKey;