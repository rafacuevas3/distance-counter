module.exports = {
    "transpileDependencies": [
        "vuetify"
    ],
    configureWebpack: {
    
        externals: {
            // global app config object
            config: JSON.stringify({
                apiUrl: 'http://localhost:8080'
            })
        }
    }
}
