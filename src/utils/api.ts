export const formatPhotoUrl = (
  url: string,
  newWidth: string,
  newHeight: string
) => url.replace(/\{width\}/, newWidth).replace(/\{height\}/, newHeight);
