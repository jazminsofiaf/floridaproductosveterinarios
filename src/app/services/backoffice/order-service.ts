import axios from "axios";
import Service from "../service";

class OrderService extends Service {

    async fetchAssembleInstructions(orderId: string) {
        const response = await axios.get(`${this.BACKEND_URL}/orders/${orderId}/assemble-specifications`);

        return response.data;
    }

    async fetchOrderById(orderId: string) {
        const response = await axios.get(`${this.BACKEND_URL}/orders/${orderId}/assemble-specifications`);

        return response.data;
    }

    async deliverOrder(orderId: string) {
        const response = await axios.put(`${this.BACKEND_URL}/orders/${orderId}/deliver`);

        return response.data;
    }

    async markAssembled(orderId: string) {
        const response = await axios.put(`${this.BACKEND_URL}/orders/${orderId}/assembled`);

        return response.data;
    }
}

export default new OrderService();
