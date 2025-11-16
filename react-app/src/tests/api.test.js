import { jest, beforeEach, afterEach, test, expect } from '@jest/globals';
import { fetcher, patchJson } from '../fetch';

const originalFetch = globalThis.fetch;

beforeEach(() => {
  globalThis.fetch = jest.fn();
});

afterEach(() => {
  globalThis.fetch = originalFetch;
  jest.clearAllMocks();
});

test('fetcher gets JSON from BASE + path and returns parsed data', async () => {
  globalThis.fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => [{ id: 1 }],
  });

  const data = await fetcher('/promotions');

  expect(globalThis.fetch).toHaveBeenCalledWith(
    expect.stringMatching(/http:\/\/localhost:3001\/promotions$/),
    expect.objectContaining({
      headers: { Accept: 'application/json' },
    })
  );
  expect(data).toEqual([{ id: 1 }]);
});

test('fetcher throws on non-2xx', async () => {
  globalThis.fetch.mockResolvedValueOnce({ ok: false, status: 500 });
  await expect(fetcher('/promotions')).rejects.toThrow('HTTP 500');
});

test('patchJson sends PATCH with JSON body and returns parsed data', async () => {
  const body = { optedIn: true, active: true };

  globalThis.fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => ({ id: 1, ...body }),
  });

  const data = await patchJson('/promotions/1', body);

  expect(globalThis.fetch).toHaveBeenCalledWith(
    expect.stringMatching(/http:\/\/localhost:3001\/promotions\/1$/),
    expect.objectContaining({
      method: 'PATCH',
      headers: expect.objectContaining({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }),
      body: JSON.stringify(body),
    })
  );
  expect(data).toMatchObject({ id: 1, optedIn: true, active: true });
});

test('patchJson throws on non-2xx', async () => {
  globalThis.fetch.mockResolvedValueOnce({ ok: false, status: 400 });
  await expect(patchJson('/promotions/1', { optedIn: false })).rejects.toThrow('HTTP 400');
});
