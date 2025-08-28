// ## Why use Typescript?
// - Better error detection
// - Better developer experience
// - improved code quality
// - Scalability

function calculateTotal(items) {
    return items.reduce((sum, item) => sum + item.price, 0)
}

calculateTotal("not a array of numbers and js won't throw the error")