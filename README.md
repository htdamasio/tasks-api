# tasks-api

A very basic API made with Node.js from scratch 

## Features
- Create Task
- Update Task
- Delete Task
- List Tasks

Added the identification of query parameters and path parameters

## Installation & Set Up
1. Clone the project
```sh
git clone git@github.com:htdamasio/tasks-api.git
```

2. Install dependencies
```sh
npm install
```

3. Run for development
```sh
npm run dev
```

## Usage

### Create Task
Use a POST method on your API client for the route `http://localhost:PORT/tasks` sending a the information in the request body 
```json
{
  "title": "Amazing Task",
  "description": "Amazing task description!"
}
```

### Update Task
Use a PUT method on your API client for the route `http://localhost:PORT/tasks/:id` sending the id through route params and other information in the request body 
```json
{
  "title": "It's really an amazing task",
  "description": "You can send only the field that changed, no need to send both"
}
```

Using the PATCH method on your API client for the route `http://localhost:PORT/tasks/:id/complete` you can toggle between done and undone for the task.


### Delete Task
Use a DELETE method on your API client for the route `http://localhost:PORT/tasks/:id` sending the id through route params

### List Tasks
Use a GET method on your API client for the route `http://localhost:PORT/tasks`. You can use query parameters to filter the results, the ones avaiable are `title` and `description`, so it will look something like `http://localhost:PORT/tasks?title=amazing&description=task`
