const db=require('./db')
const Usuario= db.sequelize.define('usuario',{
    nome:{
        type:db.Sequelize.STRING
    },
    email:{
        type:db.Sequelize.STRING
    },
    senha:{
        type:db.Sequelize.STRING
    }
})

module.exports=Usuario