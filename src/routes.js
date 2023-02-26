import { getTasks, addTask, deleteTask, updateTask, toggleCompleteTask } from "./hadlers/tasksHandler.js";
import { validateID } from "./middlewares/validateID.js";
import { Database } from "./models/database.js";
import { buildRoutePath } from "./utils/build-route-path.js";

const database = new Database();

export const routes = [
  {
    method: 'GET',
    path: buildRoutePath('/tasks'),
    handler: (req, res) => getTasks(req, res, database)
  },
  {
    method: 'POST',
    path: buildRoutePath('/tasks'),
    handler: (req, res) => addTask(req, res, database)
  },
  {
    method: 'DELETE',
    path: buildRoutePath('/tasks/:id'),
    middleware: (params) => validateID(params, database),
    handler: (req, res) => deleteTask(req, res, database)
  },
  {
    method: 'PUT',
    path: buildRoutePath('/tasks/:id'),
    middleware: (params) => validateID(params, database),
    handler: (req, res) => updateTask(req, res, database)
  },
  {
    method: 'PATCH',
    path: buildRoutePath('/tasks/:id/complete'),
    middleware: (params) => validateID(params, database),
    handler: (req, res) => toggleCompleteTask(req, res, database)
  }
]