module.exports = {
    tileSize: 256,          // Has to be a power of 2
    tmp: ".tmp",            // Temp folder to store images
    parallelLimit: 5,       // Amount of parallel tasks that are run
    background: "#FFFFFFFF",// Color to be used outside of the image
    imageMagick: false      // If (true) then use ImageMagick instead of GraphicsMagick 
}