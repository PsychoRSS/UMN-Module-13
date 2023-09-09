// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
Product.belongsTo(Category, {
  foreign_key: 'catergory_id'
});
// Categories have many Products
Category.hasMany(Product,{
  foreign_key: 'category_id'
});
// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, {
  through: "productTag",
  inverse: {
    as: 'all_products_price'
  }
  
}) ;
// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product,{
  through: 'productTag',
  inverse: {
    as: 'tagged_product',
  }
  
});


module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
