import axios from "axios";
import Service from "../service";

class CustomerService extends Service {

    public async createCustomer(data: ICustomer) {
        const customer = {new_profile: data};

        const response = await axios.post(`${this.BACKEND_URL}/profiles`, {
            ...customer,
        });

        return response.data;
    }
}

export default new CustomerService();
