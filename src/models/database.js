import fs from 'node:fs/promises'

const databasePath = new URL('../db.json', import.meta.url)
export class Database {
  #database = {}

  // On construct load data to #database
  constructor() {
    fs.readFile(databasePath, 'utf-8')
      .then(data => {
        this.#database = JSON.parse(data)
      })
      .catch(() => {
        this.#persist()
      })
  }

  #persist() {
    fs.writeFile(databasePath, JSON.stringify(this.#database));
  }

  select(table, filters) {
    let data = this.#database[table] ?? []

    if (filters) {
      data = data.filter(row => {
        return Object.entries(filters).some(([key, value]) => {
          return row[key].toLowerCase().includes(value?.toLowerCase())
        })
      })
    }

   return data
  }

  insert(table, data) {
    if (Array.isArray(this.#database[table])) {
      this.#database[table].push(data)
    } else {
      this.#database[table] = [data]
    }

    this.#persist();

    return data;
  }

  delete(table, id) {
    this.#database[table] = this.#database[table].filter(row => {
      return row.id != id
    })
    this.#persist()
  }

  update(table, id, data) {
    const rowIndex = this.#database[table].findIndex(row => {
      return row.id === id
    })
    if (rowIndex > -1) {
      this.#database[table][rowIndex] = {id, ...data}
      this.#persist()
    }
  }
} 