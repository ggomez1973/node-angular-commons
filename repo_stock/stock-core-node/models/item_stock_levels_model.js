module.exports = function(sequelize, DataTypes) {
  var ItemStockLevel = sequelize.define('ItemStockLevel', {
    quantity_in_stock: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        ItemStockLevel.belongsTo(models.Item)
      }
    }
  })
 
  return ItemStockLevel
}