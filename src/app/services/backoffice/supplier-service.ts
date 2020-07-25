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

    async solicitSupplierOrder(orderId: string) {
        const response = await axios.put(`${this.BACKEND_URL}/orders/supplier/${orderId}/solicit`);

        return response.data;
    }

    async fetchSuppliers() {
        const response = await axios.get(`${this.BACKEND_URL}/suppliers/summary`);

        return response.data.supplier_list;
    }

    async fetchSuppliersById(supplierId: string) {
        const response = await axios.get(`${this.BACKEND_URL}/suppliers/${supplierId}`);

        return response.data.supplier;
    }

    async updateOrder(data: IOrderUpdatePostData) {
        const orderData = {order: data};

        const response = await axios.put(`${this.BACKEND_URL}/suppliers/orders/update`, {
            ...orderData
        });

        return response.data;
    }

    async updateLink(data: IProductLink) {
        const link = {link: data};

        const response = await axios.put(`${this.BACKEND_URL}/suppliers/product/link`, {
            ...link
        });

        return response.data;
    }
}

export default new SupplierService();
