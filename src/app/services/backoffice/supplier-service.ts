import axios from 'axios'
import Service from '../service';

class SupplierService extends Service {

    public async fetchOrders() {
        const response = await axios.get(`${this.BACKEND_URL}/suppliers/orders/complete`);

        return response.data.order_list;
    }

    public async createOrder(data: IOrderPostData) {
        const order = {order : data };

        const response = await axios.post(`${this.BACKEND_URL}/suppliers/new-order`, {
            ...order,
        });

        return response.data;
    }

    public async fetchOrderById(id: string) {
        const response = await axios.get(`${this.BACKEND_URL}/suppliers/orders/${id}`);

        return response.data;
    }

    async fetchSupplierProducts(id: string) {
        const response = await axios.get(`${this.BACKEND_URL}/suppliers/${id}/products`);

        return response.data.supplier_products;
    }

    async fetchSuppliers() {
        const response = await axios.get(`${this.BACKEND_URL}/suppliers/summary`);

        return response.data.supplier_list;
    }
}

export default new SupplierService();
