export function validateID(params, database) {
  if('id' in params) {
    const data = database.select('tasks', {
      'id': params.id
    })
    
    return data.length === 1;
  }

  return false
}