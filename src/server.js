import http from 'node:http'
import dotenv from 'dotenv';
import { routes } from './routes.js';
import { body } from './middlewares/body.js';
import { extractQueryParams } from './utils/extract-query-params.js';
dotenv.config();

const server = http.createServer(async (req, res) => {
  await body(req, res);

  const route = routes.find(route => {
    return route.method === req.method && route.path.test(req.url)
  });

  if (route) {
    const routeParams = req.url.match(route.path) 
    const {query, ...params} = routeParams.groups;
    
    req.params = params;
    req.query = query ? extractQueryParams(query) : {};

    const proceedRequest = route.middleware ? route.middleware(req.params) : true 
    if (proceedRequest) {
      route.handler(req,res);
    } else {
      res.writeHead(404).end(JSON.stringify({
        'message': 'record do not exist'
      }));  
    } 

  } else {
    res.writeHead(404).end();
  }
});


var port = process.env.PORT || 3000;
server.listen(port)