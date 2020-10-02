import axios from 'axios'
import Service from '../service';

class ReceptionService extends Service {

    public async createReception(data: IReceptionOrderPostData) {
        const receptionData = { reception : data };

        const response = await axios.post(`${this.BACKEND_URL}/supplier/order/reception`, {...receptionData});

        if (response.data.errors) {
            throw new Error(response.data.errors.body.join());
        }
        return response.data;
    }

    async buildReception(data: IBuildReception) {
        const receptionData = { build_reception : data };

        const response = await axios.post(`${this.BACKEND_URL}/supplier/order/reception/build`, {...receptionData});

        if (response.data.errors) {
            throw new Error(response.data.errors.body.join());
        }
        return response.data;
    }
}

export default new ReceptionService();
