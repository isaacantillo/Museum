export interface Artwork {
  id: number;
  title: string;
  description: string | null;
  artist_title: string | null;
  medium_display: string | null;
  date_display: string | null;
  publication_history: string | null;
  place_of_origin: string | null;
  thumbnail: {
    lqip: string;
    width: number;
    height: number;
    alt_text: string;
  } | null;
  dimensions: string | null;
  credit_line: string | null;
}

export interface ArtworkResponse {
  data: Artwork[];
  pagination: {
    total: number;
    limit: number;
    offset: number;
    total_pages: number;
    current_page: number;
  };
}

export interface ArtworkSearchResponse {
  data: Artwork[];
  pagination: {
    total: number;
    limit: number;
    offset: number;
    total_pages: number;
    current_page: number;
  };
}
