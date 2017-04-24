async function init () {
  // No need to initialize anything for mongodb
}

async function getCompletedMigrationIds ({ db, metadata, logger }) {
  const completed = await db.collection(metadata).find({ }, { id: true }).toArray()

  logger.debug('○ Found %s completed migrations in metadata "%s".', completed.length, metadata)

  return completed.map(({ id }) => id)
}

async function registerMigration ({ id, db, metadata }) {
  await db.collection(metadata).insertOne({ id, completed: new Date() })
}

async function unregisterMigration ({ id, db, metadata }) {
  await db.collection(metadata).removeOne({ id })
}

module.exports = {
  init,
  getCompletedMigrationIds,
  registerMigration,
  unregisterMigration
}
