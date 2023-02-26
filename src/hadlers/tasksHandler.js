import { randomUUID } from 'node:crypto'

export function getTasks(req, res, database) {
  const data = database.select('tasks', Object.values(req.query).length ? {
    title: req.query.title ?? null,
    description: req.query.description ?? null
  } : null)
  res.writeHead(200).end(JSON.stringify(data));
}

export function addTask(req, res, database) {
  let { title, description } = {}
  try {
    ({ title, description } = req.body);
  } catch {
    let message = {
      "message": "missing information"
    }
    return  res.writeHead(400).end(JSON.stringify(message))
  }

  let responseCode = 201;
  let responseMsg = {}
  
  // validate if title and description have some value
  if (title?.length && description?.length) {
    const creationDate = new Date();
    const task = {
      id: randomUUID(),
      title: title,
      description: description,      
      created_at: creationDate,
      updated_at: creationDate,
      completed_at: null
    };

    // const task = new Task(title, description);
    responseMsg = database.insert('tasks', task); 
    // responseMsg = task;
  } else {
    responseCode = 400; 
    responseMsg['message'] = 'title or descrition incorrect'
  }
  res.writeHead(responseCode).end(JSON.stringify(responseMsg))
}

export function deleteTask(req, res, database) {
  database.delete('tasks', req.params.id)
  res.writeHead(204).end()
}

export function  updateTask(req, res, database) {
  const {id} = req.params;
  const {title, description} = req.body;
  
  let responseCode = 200;
  let responseMsg = {}
  if (title?.length || description?.length) {
    const data = database.select('tasks', {id})

    data[0].title = title?.length ? title : data[0].title;
    data[0].description = description?.length ? description : data[0].description;
    data[0].updated_at = new Date(); 
  
    database.update('tasks', id, data[0]);
    responseMsg = data[0];
  } else {
    responseCode = 400; 
    responseMsg['message'] = 'no information sent'
  }

  res.writeHead(responseCode).end(JSON.stringify(responseMsg));
}

export function toggleCompleteTask(req, res, database) {
  const { id } = req.params
  const data = database.select('tasks', {id})

  const updateDate = new Date();
  data[0].updated_at = updateDate;
  data[0].completed_at = data[0].completed_at ? null : new Date() 
  
  database.update('tasks', id, data[0])

  res.writeHead(200).end(JSON.stringify(data[0]));
}