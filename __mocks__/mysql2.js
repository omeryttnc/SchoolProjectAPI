const mysql2 = {
  createConnection: jest.fn(() => ({
    query: jest.fn(),
    end: jest.fn(),
  })),
};

export default mysql2;
