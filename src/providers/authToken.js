class AuthTokenProvider {

    getToken(){
        // Retrieves the user token from localStorage
        if(!localStorage.getItem("id_token"))
            return null;
        return localStorage.getItem("id_token");

    }

    setToken(idToken){
        console.log('Saving Token: ', idToken);
        // Saves user token to localStorage
        localStorage.setItem("id_token", idToken);
    }

    removeToken(){
        localStorage.removeItem("id_token");
    }
}
module.exports = new AuthTokenProvider();