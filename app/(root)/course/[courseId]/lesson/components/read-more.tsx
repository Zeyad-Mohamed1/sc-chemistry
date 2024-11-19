"use client";
import React, { useState } from "react";

const ReadMore = ({ text }: { text: string }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Split text into words and limit to 100
  const words = text?.split(" ");
  const displayedText = isExpanded ? text : words?.slice(0, 100).join(" ");

  return (
    <div>
      <p>
        {displayedText}
        {!isExpanded && words?.length > 100 && "..."}

        {words?.length > 100 && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-primary hover:underline"
          >
            {isExpanded ? "عرض اقل" : "عرض المزيد"}
          </button>
        )}
      </p>
    </div>
  );
};

export default ReadMore;
