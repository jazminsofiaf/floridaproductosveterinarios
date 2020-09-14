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

}

export default new ArcurService();
