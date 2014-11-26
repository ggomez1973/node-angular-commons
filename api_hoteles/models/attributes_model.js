module.exports = function(sequelize, DataTypes) {
  var Attribute = sequelize.define('Attribute', {
    value: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Attribute.belongsTo(models.AttributeType)
      }
    }
  })
 
  return Attribute
}