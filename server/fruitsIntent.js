const apiFruits= [
  {
    'id': 1,
    'fruit': 'manzanas',
    'stock': 3
  },
  {
    'id': 2,
    'fruit': 'naranjas',
    'stock': 20
  },
  {
    'id': 3,
    'fruit': 'platanos',
    'stock': 5
  }]

function getFruit (fruit) {
  let fruitStockInfo = { 'fruit': fruit.fruits, 'stock': 0 }
  apiFruits.forEach((fruitInfo) => {
    if (fruitInfo.fruit === fruit.fruits) {
      fruitStockInfo = fruitInfo
    }
  })
  return fruitStockInfo
}

function fruitAction (fruit) {
  const fruitInfo = getFruit(fruit)
  return {
    fulfillmentText: `We have ${fruitInfo.stock} ${fruitInfo.fruit}`
  }
}
module.exports = { fruitAction }
