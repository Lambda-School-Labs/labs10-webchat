const db = require('../db.js');
 
module.exports = {
  get,
  getById,
  getByEmail,	
  getDetails,
  insert,
  update,
  remove,
};

function get(){
        return db('representatives');
}

function getById(id){
const query = db('representatives').where('id', id);

    return query.then(representatives => {
            return representatives[0];
    });
}

function getByEmail(email) {
const query = db('representatives').where('email', email);

    return query.then(representatives => {
            return representatives[0];
    });
}


function getDetails(id){
const query = db.select(["representatives.motto", "representatives.image_id", "companies.name", "images.url"]).from
('representatives').innerJoin('companies', 'representatives.company_id', 'companies.id').innerJoin('images', 'representatives.image_id','images.id').where('representatives.id', id);

	return query.then(details =>{
		return details[0];
	});
}


function insert(user) {
  return db('representatives')
    .insert(user).returning('id').then(ids => ids[0]);
}


function update(id, user){
        return db('representatives')
               .where({id: Number(id)})
               .update(user);
}

function remove(id){
        return db('representatives')
               .where({id: Number(id)})
               .del();
}
