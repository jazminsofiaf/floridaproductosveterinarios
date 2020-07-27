import axios from "axios";
import Service from "../service";

class ProductService extends Service {

    async fetchProducts() {
        const response = await axios.get(`${this.BACKEND_URL}/product/summary`);

        return response.data.products_summary;
    }

    async fetchProductsInfo() {
        const response = await axios.get(`${this.BACKEND_URL}/product/info`);

        return response.data;
    }

    async createProduct(data: IDistributorProduct) {
        const product = {product: data};

        const response = await axios.post(`${this.BACKEND_URL}/product/new`, {
            ...product
        });

        return response.data;
    }
}

export default new ProductService();
