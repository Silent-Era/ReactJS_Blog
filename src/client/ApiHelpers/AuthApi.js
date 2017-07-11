import $ from 'jquery'
const baseUrl = 'http://localhost:3001'

class AuthApi{
    static loginReq(user){
        return $.post({
                url:`${baseUrl}/user/login`,
                data:JSON.stringify(user),
                contentType:'application/json'
            })
    }

    static registerReq(user){
        return $.post({
                url:`${baseUrl}/user/register`,
                data:JSON.stringify(user),
                contentType:'application/json'
            })
    }
}

export default AuthApi