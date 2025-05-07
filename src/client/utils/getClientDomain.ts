const getClientDomain = () => {
  return import.meta.env.MODE === 'development'
    ? 'http://localhost:5173'
    : 'https://meongnyangerang.vercel.app';
};

export { getClientDomain };
