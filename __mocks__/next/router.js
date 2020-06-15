export function useRouter() {
  return {
    prefetch: jest.fn(),
    replace: jest.fn(),
  };
}

class Router {}

Router.events = {
  on: jest.fn(),
  off: jest.fn(),
};

export default Router;
