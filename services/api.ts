import axios from 'axios';
import type { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import type { ArtworkResponse, ArtworkSearchResponse, Artwork } from '@/interfaces/interfaces';

const BASE_URL = 'https://api.artic.edu/api/v1';
const FIELDS = "id,title,description,artist_title,medium_display,date_display,publication_history,place_of_origin,thumbnail,dimensions,credit_line,publication_history,image_id";

// Create axios instance with default config
const api = {
  artworks: {
    getAll: async (page: number = 1, limit: number = 12): Promise<ArtworkResponse> => {
      try {
        const response = await axios.get<ArtworkResponse>(`${BASE_URL}/artworks`, {
          params: {
            page,
            limit,
            fields: FIELDS
          }
        });
        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          throw new Error(`Failed to fetch artworks: ${error.message}`);
        }
        throw error;
      }
    },

    getById: async (id: string): Promise<{data: Artwork}> => {
      try {
        const response = await axios.get<{data: Artwork}>(`${BASE_URL}/artworks/${id}`, {
          params: {
            fields: FIELDS
          }
        });
        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          throw new Error(`Failed to fetch artwork with id ${id}: ${error.message}`);
        }
        throw error;
      }
    },

    
    search: async (queryOrParams: string | Record<string, any>): Promise<ArtworkSearchResponse> => {
      try {
        let params: any;
    
        if (typeof queryOrParams === 'string') {
          params = {
            q: queryOrParams,
            fields: FIELDS,
          };
        } else {
          params = {
            ...queryOrParams,
            fields: FIELDS,
          };
        }
    
        const response = await axios.get<ArtworkSearchResponse>(`${BASE_URL}/artworks/search`, {
          params,
        });
    
        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          throw new Error(`Failed to search artworks: ${error.message}`);
        }
        throw error;
      }
    }
  }
};

export default api;