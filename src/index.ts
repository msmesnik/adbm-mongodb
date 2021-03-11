import {
  CompletedMigrationIdsRetriever,
  InitFn,
  RegistrationFn,
} from 'adbm/interfaces'
import { Db } from 'mongodb'

export const init: InitFn<Db> = () => {
  // No need to initialize anything for mongodb
}

export const getCompletedMigrationIds: CompletedMigrationIdsRetriever<Db> = async ({
  db,
  metadata,
  logger,
}) => {
  const completed = await db
    .collection(metadata)
    .find({}, { projection: { id: true } })
    .toArray()

  logger.debug(
    `○ Found ${completed.length} completed migrations in metadata collection "${metadata}".`,
  )

  return completed.map(({ id }) => id)
}

export const registerMigration: RegistrationFn<Db> = async ({
  id,
  db,
  metadata,
}) => {
  await db.collection(metadata).insertOne({ id, completed: new Date() })
}

export const unregisterMigration: RegistrationFn<Db> = async ({
  id,
  db,
  metadata,
}) => {
  await db.collection(metadata).deleteOne({ id })
}
