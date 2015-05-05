var joi = require("joi")

module.exports = joi.object({
    tileSize: joi.number().integer().min(1).default(256).description("Has to be a power of 2"),
    tmp: joi.string().default(".tmp").description("Temp folder to store images"),
    parallelLimit: joi.number().min(1).default(5).description("Amount of parallel tasks that are run"),
    background: joi.string().default("#FFFFFFFF").description("Color to be used outside of the image"),
    imageMagick: joi.boolean().default(false).description("If (true) then use ImageMagick instead of GraphicsMagick"),
    autoStart: joi.boolean().default(false).description("If (true) then it will process without explicitly calling `.start`"),
    output: joi.string(),
    outputFolder: joi.string(),
    gm: joi.object(),
    file: joi.string().required()
}).xor('output', 'outputFolder')