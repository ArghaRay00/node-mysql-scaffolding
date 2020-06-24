var all = {
    env: process.argv[2] || 'development',
    // Server port
    port: process.env.PORT || 3000,
}

module.exports = {
    getPort:function(){
       return all.port;
    },
    getConstants: function(){
        return require(`./${all.env}.js`) || {};
    }
};