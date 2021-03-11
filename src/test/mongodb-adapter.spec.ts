import { getClient, getDatabase, mockLogger } from './helpers'
import * as adapter from '../index'

const defaultLogger = mockLogger()

describe('mongodb adapter', function () {
  let db
  const getIds = items => items.map(({ id }) => id)
  const mockInfoCollection = '_mocha_mock_migrations'

  beforeAll(async () => {
    db = await getDatabase()

    await db.collection(mockInfoCollection).insertMany([
      { id: 'first', completed: new Date() },
      { id: 'second', completed: new Date() },
    ])
  })
  afterAll(async () => {
    await db.collection(mockInfoCollection).drop()

    const client = await getClient()
    await client.close()
  })

  it('gets a list of all completed migrations', async function () {
    const ids = await adapter.getCompletedMigrationIds({
      db,
      metadata: mockInfoCollection,
      logger: defaultLogger,
    })

    expect(ids).toEqual(['first', 'second'])
  })

  it('registers a successful migration', async function () {
    const mockId = 'mock'
    expect(
      getIds(await db.collection(mockInfoCollection).find().toArray()),
    ).not.toContain(mockId)

    await adapter.registerMigration({
      id: mockId,
      metadata: mockInfoCollection,
      db,
    })

    expect(
      getIds(await db.collection(mockInfoCollection).find().toArray()),
    ).toContain(mockId)
  })

  it('removes an entry from the list of performed migrations', async function () {
    expect(
      getIds(await db.collection(mockInfoCollection).find().toArray()),
    ).toContain('first')

    await adapter.unregisterMigration({
      id: 'first',
      metadata: mockInfoCollection,
      db,
    })
    expect(
      getIds(await db.collection(mockInfoCollection).find().toArray()),
    ).not.toContain('first')
  })
})
