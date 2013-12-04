var S = require("string");

module.exports = function outputResolve(format, z, y, x) {
    return S(format).template({ z: z, y: y, x: x }, '{', '}').s;
};