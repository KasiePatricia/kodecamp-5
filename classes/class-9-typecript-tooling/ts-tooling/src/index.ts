import http from 'node:http';

const server = http.createServer((req, res) => {
  console.log(req.method, req.url);
  const url = new URL(req.url || '', `http://${req.headers.host}`);
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello, world!\n');
});

server.listen(3000, () => {
  // eslint-disable-next-line no-console
   console.log('Server is running at http://localhost:3000/');
});