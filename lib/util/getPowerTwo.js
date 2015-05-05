module.exports = function getPowerTwo(x) {
    var power = 0,
        value = 0;
    while(x > value) {
        power++;
        if(value == 0) {
            value = 1;
        } else {
            value = value << 1;
        }
    }
    return power - 1;
};