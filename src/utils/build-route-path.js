
// /tasks/:id
// /tasks/
export function buildRoutePath(path) {
  const extractRouteParameters = /:([a-zA-Z0-9\-_]+)/g
  const pathWithParams = path.replaceAll(extractRouteParameters, '(?<$1>[a-zA-Z0-9\-_]+)')
  
  const pathRegex = new RegExp(`^${pathWithParams}(?<query>\\?(.*))?$`);
  
  return pathRegex;
}