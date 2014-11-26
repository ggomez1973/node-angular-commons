
module.exports = function(sequelize, DataTypes) {
  var Role = sequelize.define('Role', {
  	name: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    
  })
 
  return Role
}