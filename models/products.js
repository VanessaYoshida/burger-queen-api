'use strict';
module.exports = (sequelize, DataTypes) => {
  const Products = sequelize.define('Products', {
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    category: DataTypes.STRING
  }, {});
  Products.associate = function(models) {
    Products.hasMany(models.OrderProducts, {foreignKey: 'productId'});
  };
  // sequelize.sync()
  // .then(() => {
  //   Products.create({name: 'CAFE AMERICANO', price: 5, category:"BREAKFAST"});
  //   Products.create({name: 'CAFE COM LEITE', price: 7, category:"BREAKFAST"});
  //   Products.create({name: 'SANDUICHE DE PRESUNTO E QUEIJO', price: 10, category:"BREAKFAST"});
  //   Products.create({name: 'SUCO DE FRUTA NATURAL', price: 7, category:"BREAKFAST"});
  //   Products.create({name: 'HAMBURGUER SIMPLES BOVINO', price: 10, category:"LUNCH"});
  //   Products.create({name: 'HAMBURGUER SIMPLES DE FRANGO', price: 10, category:"LUNCH"});
  //   Products.create({name: 'HAMBURGUER SIMPLES VEGETARIANO', price: 10, category:"LUNCH"});
  //   Products.create({name: 'HAMBURGUER DUPLO BOVINO', price: 15, category:"LUNCH"});
  //   Products.create({name: 'HAMBURGUER DUPLO DE FRANGO', price: 15, category:"LUNCH"});
  //   Products.create({name: 'HAMBURGUER DUPLO VEGETARIANO', price: 15, category:"LUNCH"});
  //   Products.create({name: 'ADICIONAL QUEIJO', price: 1, category:"LUNCH"});
  //   Products.create({name: 'ADICIONAL OVO', price: 1, category:"LUNCH"});
  //   Products.create({name: 'BATATA FRITA', price: 5, category:"LUNCH"});
  //   Products.create({name: 'ANEIS DE CEBOLA', price: 5, category:"LUNCH"});
  //   Products.create({name: 'AGUA 500ML', price: 5, category:"LUNCH"});
  //   Products.create({name: 'AGUA 750ML', price: 7, category:"LUNCH"});
  //   Products.create({name: 'BEBIDA GASEIFICADA 500ML', price: 7, category:"LUNCH"});
  //   Products.create({name: 'BEBIDA GASEIFICADA 750ML', price: 10, category:"LUNCH"});
  // });
  return Products;
};