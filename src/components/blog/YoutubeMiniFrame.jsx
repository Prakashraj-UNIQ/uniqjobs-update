"use client";

export default function YoutubeMiniFrame({ url }) {
    const getEmbedUrl = (videoUrl) => {
        try {
            let videoId = "";

            if (videoUrl.includes("watch?v=")) {
                videoId = videoUrl.split("watch?v=")[1]?.split("&")[0];
            } else if (videoUrl.includes("youtu.be/")) {
                videoId = videoUrl.split("youtu.be/")[1]?.split("?")[0];
            } else if (videoUrl.includes("m.youtube.com/watch?v=")) {
                videoId = videoUrl.split("watch?v=")[1]?.split("&")[0];
            }

            if (!videoId) return videoUrl;

            return `https://www.youtube.com/embed/${videoId}`;
        } catch {
            return videoUrl;
        }
    };

    const embed = getEmbedUrl(url);

    return (
        <div
            className="cursor-pointer rounded-md shadow overflow-hidden"
            onClick={() => window.open(url, "_blank")}
        >
            <iframe
                width="100%"
                height="180"
                src={embed}
                className="rounded"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            />
        </div>
    );
}
