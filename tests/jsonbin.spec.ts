import { readFileSync } from "node:fs"
import { test, expect, request } from '@playwright/test';

test('Create JSONBin using API request', async ({ request }) => {
  const key = JSON.parse(readFileSync('playwright-state/.auth/key.json', 'utf-8')).key;

  const response = await request.post('https://api.jsonbin.io/v3/b', {
    headers: {
      'Content-Type': 'application/json',
      'X-Master-key': key || '',
    },
    data: {
      sample: 'Hello World'
    }
  });

  expect(response.ok()).toBeTruthy();

  const json = await response.json();

  expect(json.record.sample).toBe('Hello World');
});
