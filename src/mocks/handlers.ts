import { http } from 'msw';

export const handlers = [
  http.get('/api', () => {
    console.log('Captured a "GET /" request');
  }),
  http.post('/posts', () => {
    console.log('Captured a "POST /posts" request');
  }),
  http.delete('/posts/:id', ({ params }) => {
    console.log(`Captured a "DELETE /posts/${params.id}" request`);
  }),
];
