// src/Service/__tests__/api.test.js
// Mock de axios
vi.mock('axios', () => ({
  default: {
    create: vi.fn(),
  },
}));

// Mock de localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
globalThis.localStorage = localStorageMock;

describe('API Configuration', () => {
  let mockAxiosInstance;
  let axios;

  beforeEach(async () => {
    vi.resetModules();
    vi.clearAllMocks();

    axios = (await import('axios')).default;

    // Mock del instance de axios
    mockAxiosInstance = {
      interceptors: {
        request: {
          use: vi.fn(),
        },
        response: {
          use: vi.fn(),
        },
      },
    };

    axios.create.mockReturnValue(mockAxiosInstance);
  });

  it('should create axios instance with correct configuration', async () => {
    const { default: apiModule } = await import('../api');

    expect(axios.create).toHaveBeenCalledWith({
      baseURL: expect.any(String), // Se verifica en config.test.js
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 10000,
    });
    expect(apiModule).toBeDefined();
  });

  it('should have request interceptor configured', async () => {
    await import('../api');

    expect(mockAxiosInstance.interceptors.request.use).toHaveBeenCalled();
  });

  it('should have response interceptor configured', async () => {
    await import('../api');

    expect(mockAxiosInstance.interceptors.response.use).toHaveBeenCalled();
  });
});