const apiCache = new Map();
const pendingRequests = new Map();

export const getFetchCache = async (fetchFuncOrUrl, retries = 2, delay = 1000) => {
  const cacheKey = typeof fetchFuncOrUrl === "string" ? fetchFuncOrUrl : fetchFuncOrUrl.toString();

  // Return cached data immediately
  if (apiCache.has(cacheKey)) {
    return apiCache.get(cacheKey);
  }

  // Prevent duplicate requests
  if (pendingRequests.has(cacheKey)) {
    return pendingRequests.get(cacheKey);
  }

  const requestPromise = (async () => {
    for (let i = 0; i < retries; i++) {
      try {
        const responseData = typeof fetchFuncOrUrl === "string" 
          ? await fetch(fetchFuncOrUrl).then(res => {
              if (res.status === 429) throw new Error("Rate limited");
              if (!res.ok) throw new Error(`HTTP ${res.status}`);
              return res.json();
            })
          : await fetchFuncOrUrl();

        apiCache.set(cacheKey, responseData);
        pendingRequests.delete(cacheKey);
        return responseData;
      } catch (err) {
        if (i === retries - 1) {
          pendingRequests.delete(cacheKey);
          throw err;
        }
        await new Promise(res => setTimeout(res, delay * (i + 1)));
      }
    }
  })();

  pendingRequests.set(cacheKey, requestPromise);
  return requestPromise;
};
