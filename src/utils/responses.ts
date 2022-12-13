export const okResponse = (result) => {
  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
    },
    body: JSON.stringify(
      {
        result,
      },
      null,
      2
    ),
  };
};

export const badRequest = {
  statusCode: 400,
  body: JSON.stringify(
    {
      message: "Bad Request",
    },
    null,
    2
  ),
};

export const errorResponse = (error) => {
  return {
    statusCode: 500,
    body: JSON.stringify(
      {
        error,
      },
      null,
      2
    ),
  };
};
