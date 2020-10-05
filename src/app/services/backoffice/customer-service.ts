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

    async fetchProducts(userId: string) {
        const response = await axios.get(`${this.BACKEND_URL}/price-list/${userId}`);

        return response.data.price_list;
    }

    async createOrder(data: IOrderPostData) {
        const order = {order : data };

        const response = await axios.post(`${this.BACKEND_URL}/orders`, {
            ...order,
        });

        return response.data;
    }

    async fetchOrders() {
        const response = await axios.get(`${this.BACKEND_URL}/orders/users/complete`);

        return response.data.order_list;
    }

    async fetchAccount(customerId: string) {
        const response = await axios.get(`${this.BACKEND_URL}/profiles/${customerId}/account`);

        return response.data.account_transactions;
    }
}

export default new CustomerService();
