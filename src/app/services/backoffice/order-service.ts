import axios from "axios";
import Service from "../service";

class OrderService extends Service {

    async fetchAssembleInstructions(orderId: string) {
        const response = await axios.get(`${this.BACKEND_URL}/orders/${orderId}/assemble-specifications`);

        return response.data;
    }

    async fetchOrderById(orderId: string) {
        const response = await axios.get(`${this.BACKEND_URL}/orders/${orderId}`);

        return response.data;
    }

    async updateOrder(order: IOrderUpdatePostData, filter: string) {
        const orderData = {order: order};

        const params = filter ? `?${filter}=true` : '';
        const response = await axios.put(`${this.BACKEND_URL}/orders/update${params}`, {
            ...orderData
        });

        return response.data;
    }

    async deliverOrder(orderId: string) {
        const response = await axios.put(`${this.BACKEND_URL}/orders/${orderId}/deliver`);

        return response.data;
    }

    async cancelOrder(orderId: string) {
        const response = await axios.put(`${this.BACKEND_URL}/orders/${orderId}/cancel`);

        return response.data;
    }

    async markAssembled(orderId: string) {
        const response = await axios.put(`${this.BACKEND_URL}/orders/${orderId}/assembled`);

        return response.data;
    }

    async markAssembledForced(orderId: string) {
        const response = await axios.put(`${this.BACKEND_URL}/orders/${orderId}/force-assemble`);

        return response.data;
    }
}

export default new OrderService();
