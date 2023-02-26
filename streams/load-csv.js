import fs from 'node:fs'
import { parse } from 'csv-parse';

const csvPath = new URL('./tasks.csv', import.meta.url);
const parser = parse({
  delimiter: ",", 
  from_line: 2
});

(async() => {
  fs.createReadStream(csvPath)
  .pipe(parser)
  .on("data", ([title, description]) => {
    fetch(`http://localhost:4000/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        description
      })
    });
  });
})();