export async function body(req, res) {
  const buffers = []
  for await (let block of req) {
    buffers.push(block);
  }
  
  try  {
    req.body = JSON.parse(Buffer.concat(buffers).toString());
  } catch {
    req.body = null;
  }
  
  res.setHeader('Content-type', 'application/json')
}