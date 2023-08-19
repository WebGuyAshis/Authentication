module.exports.home = (req,res) =>{
    res.render('home',{
        title: 'Authentication',
        heading: 'Autnetication Using JWT'
    });
}

module.exports.signUp = (req,res)=>{
    res.render('sign_up',{
        title: 'Sign Up',
        heading: 'Create Your Accounnt!'
    });
}
