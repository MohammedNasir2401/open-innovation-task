import type { ApiResponse } from "../interfaces/api-response";

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3010';

export async function apiRequest<T>(endpoint: string, method = 'GET', data = {}): Promise<ApiResponse<T>> {
    try {
        let url = `${API_BASE_URL}/${endpoint}`;
        if (method === 'GET') {
            const params = new URLSearchParams(data as Record<string, string>);
            url += `?${params.toString()}`;
        }
        const res = await fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: method === 'GET' ? undefined : JSON.stringify(data),
        });
        const responseData = await res.json();
        if (!res.ok) {
            return {
                success: false,
                data: null,
                message: responseData.message || `HTTP error: ${res.status}`,
            };
        }
        return {
            success: true,
            data: responseData,
            message: 'OK',
        };
    } catch (error) {
        return {
            success: false,
            data: null,
            message: error instanceof Error ? error.message : 'An unexpected error occurred',
        };
    }
}
