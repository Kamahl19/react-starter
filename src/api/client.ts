import { createZodFetcher, type Schema } from 'zod-fetch';

type Init = Omit<RequestInit, 'body'> & {
  body?: unknown;
};

const apiClient = createZodFetcher(
  async <R>(url: string, { body, headers, ...initRest }: Init = {}) => {
    const init = {
      ...initRest,
      headers: {
        ...(body ? { 'Content-Type': 'application/json' } : undefined),
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
    };

    if (import.meta.env.DEV) {
      console.log('API client request:', { url, init });
    }

    const resp = await fetch(url, init);

    const json = await resp.json();

    if (!resp.ok) {
      if (import.meta.env.DEV) {
        console.error('API client error:', json);
      }

      throw json;
    }

    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    return json as R;
  },
);

export const get = <R>(schema: Schema<R>, url: string, init?: Init) =>
  apiClient<R>(schema, url, {
    ...init,
    method: 'GET',
  });

export const post = <R>(schema: Schema<R>, url: string, init?: Init) =>
  apiClient<R>(schema, url, {
    ...init,
    method: 'POST',
  });

export const put = <R>(schema: Schema<R>, url: string, init?: Init) =>
  apiClient<R>(schema, url, {
    ...init,
    method: 'PUT',
  });

export const patch = <R>(schema: Schema<R>, url: string, init?: Init) =>
  apiClient<R>(schema, url, {
    ...init,
    method: 'PATCH',
  });

export const del = <R>(schema: Schema<R>, url: string, init?: Init) =>
  apiClient<R>(schema, url, {
    ...init,
    method: 'DELETE',
  });
