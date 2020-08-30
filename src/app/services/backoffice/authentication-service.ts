import axios from "axios";
import Service from "../service";

class AuthenticationService extends Service {

    public async login(credentials: ICredential) {
        const credentialsData = {user: credentials};

        const response = await axios.post(`${this.BACKEND_URL}/users/login`, {
            ...credentialsData,
        });

        return response.data;
    }

    public async isLogged() {

        const response = await axios.get(`${this.BACKEND_URL}/users/isLogged`)

        return response.data;
    }
}

export default new AuthenticationService();
