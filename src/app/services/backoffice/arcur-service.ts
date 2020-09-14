import axios from 'axios'
import Service from '../service';

class ArcurService extends Service {

    public async fetchProducts() {
        const response = await axios.get(`${this.BACKEND_URL}/arcur/items`);

        return response.data;
    }

    public async fetchProduct(id: string) {
        const response = await axios.get(`${this.BACKEND_URL}/arcur/items/${id}`);

        return response.data;
    }

    async createOrder(items: ICartItem[]) {
        let data :IOrderUpdatePostData = {
            order_id : '',
            owner_id : '',
            products :items
        }
        const orderData = {order: data};

        const response = await axios.post(`${this.BACKEND_URL}/arcur/order`, {
            ...orderData
        });

        return response.data;
    }
}

export default new ArcurService();
