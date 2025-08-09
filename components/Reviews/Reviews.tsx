"use client";

import React from "react";
import css from "./Reviews.module.css";
import { useQuery } from "@tanstack/react-query";
import { fetchReviews } from "@/lib/api";

interface ReviewsProps {
  id: string;
  type: string;
}

const Reviews = ({ id, type }: ReviewsProps) => {
  const { data: reviews } = useQuery({
    queryKey: ["reviews", id],
    queryFn: () => fetchReviews(type, id),
  });

  if (!reviews?.length) {
    return null;
  }

  return (
    <div className={css.reviews}>
      <h2 className={css.title}>Reviews</h2>
      {reviews?.map((review, index) => {
        return (
          <details
            key={review.id ?? index}
            className={css.details}
            open={index === 0}
          >
            <summary className={css.summary}>
              <span style={{ color: "orange" }}>User: </span> {""}
              {review.author}
            </summary>
            <p className={css.paragraph}>{review.content}</p>
          </details>
        );
      })}
    </div>
  );
};

export default Reviews;
