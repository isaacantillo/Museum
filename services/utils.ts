// Get the artwork image url
export const getArtworkImageUrl = (imageId: string | null) => {
    if (!imageId) return null;
    return `https://www.artic.edu/iiif/2/${imageId}/full/843,/0/default.jpg`;
  };

  