const express = require("express");
const app = express();

const Pagamento = require("./models/Pagamento")
const Usuario = require("./models/Usuario")
const path=require ('path');//endereço de cada rota
const router=express.Router();// trabalha com as rotas
const moment = require('moment');
const handlebars = require("express-handlebars");

app.engine('handlebars', handlebars({
    defaultLayout: 'main',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
    },
    helpers: {
        formatDate: (date) => {
            return moment(date).format('DD/MM/YYYY')
        }
    }
}))
app.set('view engine', 'handlebars')

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

//Rotas
router.get('/pagamento', function(req, res){
    res.sendFile(path.join(__dirname+'/pagamento.html'));
});

router.get('/', function(req, res){
    res.sendFile(path.join(__dirname+'/index.html'));
});



router.post('/pagamento', function(req, res){
    
    Pagamento.create({
        nome: req.body.nome,
        valor: req.body.valor
    }).then(function(){
        res.redirect('/pagamento')
       
    }).catch(function(erro){
        res.send("Erro: Pagamento não foi cadastrado com sucesso!" + erro)
    })
     
});
router.get('/lista', function(req, res){
    Pagamento.findAll().then(function(pagamentos){
        res.render('pagamento', {pagamentos: pagamentos});
    })
    
});
router.get('/del-pagamento/:id', function(req, res){
    Pagamento.destroy({
        where: {'id': req.params.id}
    }).then(function(){
        res.redirect('/pagamento');
        /*res.send("Pagamento apagado com sucesso!");*/
    }).catch(function(erro){
        res.send("Pagamento não apgado com sucesso!");
    })
});
router.get('/edit-pagamento/:id', function(req, res){
    Pagamento.findByPk (req.params.id).then(function(pagamentos){
        res.render('editar', {pagamentos: pagamentos});
    })
});	


router.post('/edit-pagamento/:id', function(req, res){
    Pagamento.update(   
    {nome: req.body.nome,
    valor: req.body.valor},
    {where: {'id': req.params.id}}
    ).then(function(){
        res.redirect('/lista')
       
    }).catch(function(erro){
        res.send("Erro: Pagamento não foi cadastrado com sucesso!" + erro)
    })
     
});

//rotas usuario 

router.get('/usuario', function(req, res){
    res.sendFile(path.join(__dirname+'/cad_usuario.html'));
});



router.post('/usuario', function(req, res){
    
    Usuario.create({
        nome: req.body.nome,
        email: req.body.email,
        senha: req.body.senha
    }).then(function(){
        res.redirect('/listas')
       
    }).catch(function(erro){
        res.send("Erro: O Usuário não foi cadastrado!" + erro)
    })

});

router.get('/listas', function(req, res){
    Usuario.findAll().then(function(usuarios){
        res.render('user', {usuarios:usuarios});
    })
    
});
router.get('/del-usuario/:id', function(req, res){
    Usuario.destroy({
        where: {'id': req.params.id}
    }).then(function(){
        res.redirect('/usuario');
        /*res.send("Pagamento apagado com sucesso!");*/
    }).catch(function(erro){
        res.send("Usuario não apagado com sucesso!");
    })
});

router.get('/edit-usuario/:id', function(req, res){
    Usuario.findByPk (req.params.id).then(function(usuarios){
        res.render('editarUser', {usuarios: usuarios});
    })
});	

router.post('/edit-usuario/:id', function(req, res){
    Usuario.update(   
    {nome: req.body.nome,
    senha: req.body.senha,
    email: req.body.email},
    {where: {'id': req.params.id}}
    ).then(function(){
        res.redirect('/listas')
       
    }).catch(function(erro){
        res.send("Erro: Usuario não foi cadastrado com sucesso!" + erro)
    })
     
});


app.use('/',router);
app.use('/pagamento',router);
app.use('/lista',router);
app.use('/del-pagamento/:id',router);
app.use('/edit-pagamento/:id',router);
app.use ('/usuario', router);
app.use('/litas', router);
app.use('/del-usuario/:id',router);
app.use('/edit-usuario/:id',router);


app.listen(8080);

