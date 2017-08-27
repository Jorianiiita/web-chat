import Dexie from 'dexie'

const db = new Dexie('WebChat')
db.version(2).stores({ messages: '++id, to, from, timestamp' })

export default db
