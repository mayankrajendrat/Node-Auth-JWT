module.exports ={
    'secret' : "10xauthsecret",
    //'db':"mongodb://localhost:27017/node-auth"
    'db':process.env.DB_URL
}