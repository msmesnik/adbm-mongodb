import { Db, MongoClient } from 'mongodb'
import { Logger } from 'adbm/interfaces'

const dbUri = process.env.DB_URI || 'mongodb://localhost/adbmMongodbTest'

let client: MongoClient
let db: Db

export const getClient = async () => {
  if (!client) {
    client = await MongoClient.connect(dbUri)
  }

  return client
}

export const getDatabase = async () => {
  if (!db) {
    const client = await getClient()

    db = client.db(dbUri.substr(dbUri.lastIndexOf('/') + 1))
  }

  return db
}

export const mockLogger = (): Logger => ({
  debug: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
})
