module.exports = function isPowerOfTwo(x) {
    return (x & (x - 1)) == 0;
};