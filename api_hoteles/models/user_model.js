module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    website: DataTypes.STRING,
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    phone: DataTypes.STRING,
    isAvailable: DataTypes.BOOLEAN,
  }, {
    classMethods: {
      associate: function(models) {
        User.belongsTo(models.Role)
        User.hasMany(models.Attribute),
        User.hasMany(models.Application)
      }
    }
  })
 
  return User
}
