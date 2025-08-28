function calculateTotalGoods(items) {
    return items.reduce(function (sum, item) { return sum + item.price; }, 0);
}
console.log(calculateTotalGoods([{ price: 20 }, { price: 40 }]));
