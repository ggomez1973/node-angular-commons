
module.exports = function(sequelize, DataTypes) {
  var App = sequelize.define('Application', {
  	apikey: DataTypes.STRING,
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        App.hasMany(models.User)
      }
    }
  })
 
  return App
}