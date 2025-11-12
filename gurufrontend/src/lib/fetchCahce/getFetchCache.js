const apiCache = new Map();

export const getFetchCache = async (fetchFuncOrUrl, retries = 3, delay = 2000) => {
  // Tentukan key cache
  const cacheKey = typeof fetchFuncOrUrl === "string" ? fetchFuncOrUrl : fetchFuncOrUrl.toString();

  if (apiCache.has(cacheKey)) {
    return apiCache.get(cacheKey);
  }

  for (let i = 0; i < retries; i++) {
    try {
      let responseData;

      if (typeof fetchFuncOrUrl === "string") {
        
        const response = await fetch(fetchFuncOrUrl);
        if (response.status === 429) throw new Error("Too Many Requests");
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        responseData = await response.json();
        
      } else {

        responseData = await fetchFuncOrUrl();

      }

      apiCache.set(cacheKey, responseData);
      return responseData;

    } catch (err) {
      if (i === retries - 1) throw err;
      console.log(`Retrying... attempt ${i + 1} of ${retries}`);
      await new Promise((res) => setTimeout(res, delay));
    }
  }
};
