const db = require('../../../db/dbConfig');
const dbName = 'games'

const findBy = filter => db('games').where(filter);

const create = async game => {
    const [id] = await db(dbName).insert(game);

    return findBy({id}).first();
}

module.exports = {
    create,
}