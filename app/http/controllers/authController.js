function authController(){
    return{
        login(req,res){
            res.render("Auth/login")
        },
        register(req,res){
            res.render("Auth/register")
        }
    }
}
module.exports=authController