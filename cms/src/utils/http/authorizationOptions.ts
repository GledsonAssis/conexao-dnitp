import Session from '../Session';

export default (method: string, body?: any) => {
  const Authorization = Session.authorizationHeader();

  return {
    headers: {
      Authorization,
      'Cache-Control': 'no-cache',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
    method,
  };
};
