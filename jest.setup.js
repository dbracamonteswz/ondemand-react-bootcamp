// jest.setup.js

import { mswServer } from "./src/__tests__/msw/msw-server";

beforeAll(() => {
  // Enable the mocking in tests.
  mswServer.listen();
});

afterEach(() => {
  // Reset any runtime handlers tests may use.
  mswServer.resetHandlers();
});

afterAll(() => {
  // Clean up once the tests are done.
  mswServer.close();
});
