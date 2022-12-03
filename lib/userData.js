import { getToken } from '../lib/authenticate';

export class FetchError extends Error {
  response;
  data;
  constructor({ message, response, data }) {
    // Pass remaining arguments (including vendor specific ones) to parent constructor
    super(message);

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, FetchError);
    }

    this.name = 'FetchError';
    this.response = response;
    this.data = data ?? { message: message };
  }
}

export async function addToFavorites(id) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favourites/${id}`, {
    method: 'PUT', // *GET, POST, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/json',
      Authorization: `JWT ${getToken()}`,
    },
    body: JSON.stringify({ id: id }), // body data type must match "Content-Type" header
  });

  // if the server replies, there's always some data in json
  // if there's a network error, it will throw at the previous line
  const data = await response.json();

  // response.ok is true when res.status is 2xx
  // https://developer.mozilla.org/en-US/docs/Web/API/Response/ok
  return response.ok ? data : [];

  // throw new FetchError({
  //   message: response.statusText,
  //   response,
  //   data,
  // });
}

export async function removeFromFavorites(id) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favourites/${id}`, {
    method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
    headers: {
      Authorization: `JWT ${getToken()}`,
    },
  });

  // if the server replies, there's always some data in json
  // if there's a network error, it will throw at the previous line
  const data = await response.json();

  // response.ok is true when res.status is 2xx
  // https://developer.mozilla.org/en-US/docs/Web/API/Response/ok
  return response.ok ? data : [];

  // throw new FetchError({
  //   message: response.statusText,
  //   response,
  //   data,
  // });
}

export async function getFavorites() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favourites`, {
    headers: {
      Authorization: `JWT ${getToken()}`,
    },
  });

  // if the server replies, there's always some data in json
  // if there's a network error, it will throw at the previous line
  const data = await response.json();

  // response.ok is true when res.status is 2xx
  // https://developer.mozilla.org/en-US/docs/Web/API/Response/ok
  return response.ok ? data : [];

  // throw new FetchError({
  //   message: response.statusText,
  //   response,
  //   data,
  // });
}

export async function addToHistory(id) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/history/${id}`, {
    method: 'PUT', // *GET, POST, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/json',
      Authorization: `JWT ${getToken()}`,
    },
    body: JSON.stringify({ id: id }), // body data type must match "Content-Type" header
  });

  // if the server replies, there's always some data in json
  // if there's a network error, it will throw at the previous line
  const data = await response.json();

  // response.ok is true when res.status is 2xx
  // https://developer.mozilla.org/en-US/docs/Web/API/Response/ok
  return response.ok ? data : [];

  // throw new FetchError({
  //   message: response.statusText,
  //   response,
  //   data,
  // });
}

export async function removeFromHistory(id) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/history/${id}`, {
    method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
    headers: {
      Authorization: `JWT ${getToken()}`,
    },
  });

  // if the server replies, there's always some data in json
  // if there's a network error, it will throw at the previous line
  const data = await response.json();

  // response.ok is true when res.status is 2xx
  // https://developer.mozilla.org/en-US/docs/Web/API/Response/ok
  return response.ok ? data : [];

  // throw new FetchError({
  //   message: response.statusText,
  //   response,
  //   data,
  // });
}

export async function getHistory() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/history`, {
    headers: {
      Authorization: `JWT ${getToken()}`,
    },
  });

  // if the server replies, there's always some data in json
  // if there's a network error, it will throw at the previous line
  const data = await response.json();

  // response.ok is true when res.status is 2xx
  // https://developer.mozilla.org/en-US/docs/Web/API/Response/ok
  return response.ok ? data : [];

  // throw new FetchError({
  //   message: response.statusText,
  //   response,
  //   data,
  // });
}
