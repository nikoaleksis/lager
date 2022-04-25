import { useState, useEffect } from 'react';
import { Text, ScrollView, } from 'react-native';
import productModel from '../models/products';
import { Base, Typography } from '../styles';
import Product from '../interfaces/product';

function StockList(
  { products, setProducts } : 
  { products: Array<Product>, setProducts: (products: Array<Product>) => void }
) {
  useEffect(() => {
      (async () => setProducts(await productModel.getProducts()))();
  }, []);

  const list = products.map((product, index) => {
    const isOutOfStock = product.stock === 0;
    return <Text 
    style={ Typography.normal }
            key={index}>
             • { product.name } - { product.stock }
             <Text style={ Typography.normalWarning }>{isOutOfStock ? " | Slut i lager!!" : ""}</Text>
            </Text>
  });

  return (
    <ScrollView style={ Base.base }>
      {list}
    </ScrollView>
  );
}

export default function Stock(
  { products, setProducts } : 
  { products: Array<Product>, setProducts: (products: Array<Product>) => void }
) {
  return (
    <ScrollView>
      <Text style={Typography.header3}>Lagerförteckning</Text>
      <StockList products={products} setProducts={setProducts} />
    </ScrollView>
  );
}