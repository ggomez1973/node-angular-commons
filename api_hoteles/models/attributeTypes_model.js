module.exports = function(sequelize, DataTypes) {
  var AttributeType = sequelize.define('AttributeType', {
  	name: DataTypes.STRING,
    description: DataTypes.STRING
  })
 
  return AttributeType
}