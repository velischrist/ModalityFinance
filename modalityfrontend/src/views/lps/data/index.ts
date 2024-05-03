// data/index.ts
export type LPs = {
    id: number;
    lp_name: string;
    total_invested: string;
    positions: number;
};

// Define the base URL for your API
const API_BASE_URL = 'http://localhost:8000/api/lps/';

export const fetchLPs = async (): Promise<LPs[]> => {
    console.log("test")
    const response = await fetch(API_BASE_URL);
    if (!response.ok) {
        throw new Error('Failed to fetch data');
    }
    return response.json();
};
