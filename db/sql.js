var personSQL = {
    insert: 'INSERT INTO user_info(id,code,name,password,email,add_time,state,sort) VALUES(?,?,?,?,?,?,?,?)',
    queryAll: 'SELECT id,code,name,password,email,add_time FROM user_info',
    deleteById: 'DELETE FROM user_info WHERE id = ? ',
    updatePerson: 'UPDATE user_info SET code = ?,name = ?,email = ? WHERE id = ?',
    getPersonByName: 'SELECT * FROM user_info WHERE name =? '
};
module.exports = personSQL;