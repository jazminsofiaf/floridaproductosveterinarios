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

    async fetchCustomers() {
        const response = await axios.get(`${this.BACKEND_URL}/profiles/summary`);

        return response.data.customers_summary;
    }

    async addPayment(data: IPaymentPostData) {
        const payment = {payment: data};

        const response = await axios.post(`${this.BACKEND_URL}/profiles/payment`, {
            ...payment,
        });

        return response.data;
    }
}

export default new CustomerService();
