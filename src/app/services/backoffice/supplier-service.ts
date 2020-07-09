import axios from 'axios'
import Service from '../service';

class SupplierService extends Service {

    public async fetchOrders() {
        const response = await axios.get(`${this.BACKEND_URL}/suppliers/orders/complete`);

        return response.data;
    }

    public async createOrder(data: IOrderPostData) {
        const response = await axios.post(`${this.BACKEND_URL}/suppliers/new-order`, {
            ...data,
        });

        return response.data;
    }
}

export default new SupplierService();
