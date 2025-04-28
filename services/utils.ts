// Get the artwork image url
export const getArtworkImageUrl = (imageId: string | null) => {
  if (!imageId) return null;
  return `https://www.artic.edu/iiif/2/${imageId}/full/843,/0/default.jpg`;
};

export const buildSearchParams = (params: {
  query: string;
  category: string;
  style: string;
  timePeriod: string;
}) => {
  let searchText = params.query.trim();

  if (params.category !== 'all') {
    searchText += ` ${params.category}`;
  }

  if (params.style !== 'all') {
    searchText += ` ${params.style}`;
  }

  if (params.timePeriod !== 'all') {
    switch (params.timePeriod) {
      case '18th-century':
        searchText += ' 18th century';
        break;
      case '19th-century':
        searchText += ' 19th century';
        break;
      case '20th-century':
        searchText += ' 20th century';
        break;
      case 'contemporary':
        searchText += ' contemporary';
        break;
    }
  }

  const filters: Record<string, any> = {};

  if (searchText.trim() !== '') {
    filters['q'] = searchText.trim();
  }

  return filters;
};
