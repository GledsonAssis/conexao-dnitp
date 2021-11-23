import AuthError from './AuthError';

const handleResponse = async (responsePromise: any) => {
  const response = await responsePromise;
  if (response.statusText === 'OK' || response.status == 200) {
    const contentType = response.headers['content-type'];
    const isJson = contentType && contentType.indexOf('application/json') !== -1;

    if (isJson) {
      return JSON.parse(response);
    }
    return response;
  }

  if (response.status == 304) {
    throw response;
  }

  // const errorResponse = await JSON.parse(response);

  if (response.status === 403) {
    throw new AuthError(response);
  }

  throw response;
};

export default handleResponse;
