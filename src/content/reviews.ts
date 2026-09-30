import data from "./reviews.json";

export type Review = { author: string; rating: number; text: string; date: string | null };

export const PLACE_ID = "ChIJYXRbTc3uA4gRtZDvLWHXjLc";
export const REVIEWS_URL = `https://search.google.com/local/reviews?placeid=${PLACE_ID}`;
export const WRITE_REVIEW_URL = `https://search.google.com/local/writereview?placeid=${PLACE_ID}`;

export const RATING = data.rating as number | null;
export const REVIEW_COUNT = data.count as number | null;
export const REVIEWS = data.reviews as Review[];
export const hasReviews = RATING !== null && REVIEWS.length > 0;
