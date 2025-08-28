function calculateTotalGoods1(items: Array<{price: number}>) {
    return items.reduce((sum, item) => sum + item.price, 0)
}

console.log(calculateTotalGoods1([{price: 20}, {price: 40}]))