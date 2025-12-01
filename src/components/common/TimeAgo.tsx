import React from "react";

interface TimeAgoProps {
    date?: string | Date;
}

function TimeAgo({ date }: TimeAgoProps) {
    const getTimeAgo = (): string => {
        if (!date) return "";

        const past =
            typeof date === "string"
                ? new Date(date.replace(" ", "T") + "Z")
                : new Date(date);

        const now = new Date();
        const diff = Math.floor((now.getTime() - past.getTime()) / 1000);

        if (isNaN(past.getTime())) return "";

        if (diff < 0) return "just now";
        if (diff < 60) return `${diff} seconds ago`;
        if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
        if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
        if (diff < 604800) return `${Math.floor(diff / 86400)} days ago`;

        return past.toLocaleDateString();
    };

    return <span className="text-sm text-gray-500 italic">{getTimeAgo()}</span>;
};

export default TimeAgo;
