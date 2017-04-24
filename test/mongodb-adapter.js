/* eslint-env mocha */

const { expect } = require('chai')

const { getConnection } = require('./helpers')
const adapter = require('../index')

const log = console.log.bind(console)
const defaultLogger = {
  debug: log,
  verbose: log,
  info: log,
  warn: console.warn.bind(console),
  error: console.error.bind(console)
}

describe('mongodb adapter', function () {
  let db
  const getIds = (items) => items.map(({ id }) => id)
  const mockInfoCollection = '_mocha_mock_migrations'

  before(async () => {
    db = await getConnection()
    await db.collection(mockInfoCollection).insertMany([
      { id: 'first', completed: new Date() },
      { id: 'second', completed: new Date() }
    ])
  })
  after(async () => {
    await db.collection(mockInfoCollection).drop()
  })

  it('gets a list of all completed migrations', async function () {
    const ids = await adapter.getCompletedMigrationIds({ db, metadata: mockInfoCollection, logger: defaultLogger })

    expect(ids).to.be.an('array')
    expect(ids).to.have.all.members([ 'first', 'second' ])
  })

  it('registers a successful migration', async function () {
    const mockId = 'mock'
    expect(getIds(await db.collection(mockInfoCollection).find().toArray())).to.not.contain(mockId)

    await adapter.registerMigration({ id: mockId, metadata: mockInfoCollection, db })
    expect(getIds(await db.collection(mockInfoCollection).find().toArray())).to.contain(mockId)
  })

  it('removes an entry from the list of performed migrations', async function () {
    expect(getIds(await db.collection(mockInfoCollection).find().toArray())).to.contain('first')

    await adapter.unregisterMigration({ id: 'first', metadata: mockInfoCollection, db })
    expect(getIds(await db.collection(mockInfoCollection).find().toArray())).to.not.contain('first')
  })
})
