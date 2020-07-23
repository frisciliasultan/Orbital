// const add = (x, y) => x + y;
// module.exports = add;

export const add = (x, y) => x + y;

export const total = (shipping, subTotal) => {
    return "$" + add(shipping, subTotal);
}