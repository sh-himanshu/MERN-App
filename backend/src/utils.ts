// const fullUrl = (req: Request) =>
//   new URL(req.url, `http://${req.headers.host}`).href;

// const getIP = (req: Request) =>
//   req.headers["x-forwarded-for"] || req.socket.remoteAddress;

export const normalizePort = (val: any) => {
  if (!val) return;
  const port: number = typeof val === "string" ? parseInt(val, 10) : val;
  if (!isNaN(port) && port >= 0) return port;
};

export const parseError = (error: unknown) =>
  error instanceof Error ? `Error: ${error.message}` : "Unknown Error";
