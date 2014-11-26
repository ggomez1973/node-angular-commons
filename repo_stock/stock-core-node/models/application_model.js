// Application (Cliente del sistema de stock - Una empresa/sitio con ApiKey)

module.exports = function(sequelize, DataTypes) {
  var App = sequelize.define('Application', {
  	apikey: DataTypes.STRING,
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        App.belongsTo(models.Item)
      }
    }
  })
 
  return App
}