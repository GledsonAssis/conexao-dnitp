export default async (responsePromise) => {
  const response = await responsePromise;

  if (response.ok) {
    const contentType = response.headers.get('content-type');
    const isJson = contentType && contentType.indexOf('application/json') !== -1;

    if (isJson) {
      return response.json();
    }
    return response.text();
  }

  const errorResponse = await response.json();
  errorResponse.code = response.status;

  throw errorResponse;
};
