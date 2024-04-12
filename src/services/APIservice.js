import axios from 'axios';

class APIService {
    constructor() {
        // Create an Axios instance, you might want to add base URL and headers here
        this.apiClient = axios.create({
            baseURL: 'http://localhost:5000',  
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    async fetchIssueCounts() {
        try {
            const response = await this.apiClient.get('/get_issue_counts');
            return response.data;
        } catch (error) {
            throw error;
        }
    }

}

export default APIService;