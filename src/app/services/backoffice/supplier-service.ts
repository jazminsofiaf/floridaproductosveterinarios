import axios from 'axios'
import Service from '../service';

class SupplierService extends Service {

    public async fetchOrders() {
        const response = await axios.get(`${this.BACKEND_URL}/suppliers/orders/complete`);

        return response.data.order_list;
    }

    public async createOrder(data: IOrderPostData) {
        const order = {order: data};

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

    async removeOrderItem(orderId: string, data: IOrderProduct) {
        const orderProduct = {order_product: data};

        const response = await axios.put(`${this.BACKEND_URL}/orders/supplier/${orderId}/remove`, {
            ...orderProduct
        });

        return response.data;
    }

    async createSupplier(data: ISupplierData) {
        const supplier = {supplier: data};

        const response = await axios.post(`${this.BACKEND_URL}/suppliers`, {
            ...supplier
        });

        return response.data;
    }

    async createSupplierProduct(data: ISupplierProduct) {
        const supplierProduct = {supplier_product: data};

        const response = await axios.post(`${this.BACKEND_URL}/suppliers/product`, {
            ...supplierProduct
        });

        return response.data;
    }

    async fetchSuppliersInfo() {
        const response = await axios.get(`${this.BACKEND_URL}/suppliers`);

        return response.data.supplier_list;
    }

    async fetchAccount(supplierId: string) {
        const response = await axios.get(`${this.BACKEND_URL}/suppliers/${supplierId}/account`);

        return response.data.account_transactions;
    }

    async addPayment(data: IPaymentPostData) {
        const payment = {payment: data};

        const response = await axios.post(`${this.BACKEND_URL}/suppliers/payment`, {
            ...payment,
        });

        return response.data;
    }
}

export default new SupplierService();
