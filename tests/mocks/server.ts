import { setupServer } from 'msw/node';
import { handlers } from './handlers';

export const server = setupServer(...handlers);

beforeAll(() => {
  // Start the mock server
  server.listen({ onUnhandledRequest: 'error' });
});

afterEach(() => {
  // Reset any runtime request handlers
  server.resetHandlers();
});

afterAll(() => {
  // Clean up and stop the server
  server.close();
});
