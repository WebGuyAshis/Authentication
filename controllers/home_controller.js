module.exports.home = (req,res) =>{
    res.render('home',{
        title: 'Authentication',
        heading: 'Autnetication Using JWT'
    })

}