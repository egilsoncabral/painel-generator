module.exports = {
  mongoURI: {
    local:'mongodb://localhost:27017/painel_db',
    machine: 'mongodb://10.100.6.76:27017/painel_db',
    cloudOne:'mongodb+srv://mongouserdb:mongodb2019@cluster0-2ushc.mongodb.net/test?retryWrites=true',
    cooudTwo:'mongodb://mongodbuser:mongodb2019@s:27017/?ssl=true&ssl_ca_certs=rds-combined-ca-bundle.pem&replicaSet=rs0'
  }
  // mongoURI: 'mongodb://10.100.6.76:27017/painel_db'
  //mongoURI: 'mongodb+srv://mongouserdb:mongodb2019@cluster0-2ushc.mongodb.net/test?retryWrites=true'
 // mongoURI: 'mongodb://mongodbuser:mongodb2019@s:27017/?ssl=true&ssl_ca_certs=rds-combined-ca-bundle.pem&replicaSet=rs0'
};
