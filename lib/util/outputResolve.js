var S = require("string"),
    path = require("path");

module.exports = function outputResolve(format, z, y, x) {
    return S(format).template({ z: z, y: y, x: x, google: path.join(String(z), String(y), String(x)) }, '{', '}').s;
};