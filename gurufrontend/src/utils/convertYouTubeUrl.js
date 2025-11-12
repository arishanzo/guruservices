export function convertYouTubeUrl(url) {
  if (!url) return null;

  try {
    let videoId = "";

    // Format: https://www.youtube.com/watch?v=VIDEO_ID
    if (url.includes("watch?v=")) {
      const params = new URL(url).searchParams;
      videoId = params.get("v");
    }

    // Format: https://www.youtube.com/live/VIDEO_ID
    else if (url.includes("/live/")) {
      videoId = url.split("/live/")[1].split("?")[0];
    }

    // Format: https://youtube.com/shorts/VIDEO_ID
    else if (url.includes("/shorts/")) {
      videoId = url.split("/shorts/")[1].split("?")[0];
    }

    // Format: https://m.youtube.com/watch?v=VIDEO_ID
    else if (url.includes("m.youtube.com")) {
      const params = new URL(url).searchParams;
      videoId = params.get("v");
    }

    // Kalau sudah embed
    else if (url.includes("/embed/")) {
      return url;
    }

    // Return embed link
    return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
  } catch (error) {
    console.error("Gagal convert YouTube URL:", error);
    return null;
  }
}
