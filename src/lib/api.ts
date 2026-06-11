const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || "http://localhost:1337";

export async function fetchAPI(path: string, urlParamsObject: Record<string, any> = {}) {
  try {
    const url = new URL(`/api${path}`, STRAPI_URL);
    
    // Simplistic query builder for things like ?populate=*
    Object.keys(urlParamsObject).forEach((key) => {
      url.searchParams.append(key, urlParamsObject[key]);
    });

    const response = await fetch(url.href, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      if (response.status === 404) {
        console.warn(`Strapi endpoint ${path} returned 404. This is normal if the Single Type content hasn't been created/published yet in the Admin panel.`);
        return { data: null };
      }
      console.error(response.statusText);
      throw new Error(`An error occurred fetching ${path}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return { data: null }; // Fallback gracefully if strapi is entirely unreachable
  }
}

// Helper to resolve media URLs from Strapi
export function getStrapiMedia(media: any) {
  if (!media) return null;
  
  // Handling Strapi 5 media response
  // If it's a direct url string (fallback)
  if (typeof media === 'string') {
    if (media.startsWith("http") || media.startsWith("//")) return media;
    return `${STRAPI_URL}${media}`;
  }

  // If it's an object containing the url
  const url = media.url || media.data?.attributes?.url || media.data?.url;
  
  if (!url) return null;

  if (url.startsWith("http") || url.startsWith("//")) {
    return url;
  }

  return `${STRAPI_URL}${url}`;
}
