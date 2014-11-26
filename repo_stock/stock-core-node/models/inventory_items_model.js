module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('Item', {
    description: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        User.hasMany(models.ItemStockLevel)
      }
    }
  })
 
  return User
}