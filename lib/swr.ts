export const fetcher = (input: RequestInfo, init?: RequestInit | undefined) =>
  fetch(input, init).then((res) => {
    if (res.ok) {
      return res.json();
    }
    throw res;
  });
