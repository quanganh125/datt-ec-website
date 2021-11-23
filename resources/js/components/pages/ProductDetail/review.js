import React from "react";
import StarRatings from "react-star-ratings";

export default function Review({ data }) {
    return (
        <div className="reviewContainer">
            <div className="review-user">{data.user_name}</div>
            <div className="review-rating">
                <StarRatings
                    rating={data.rating}
                    starDimension="15px"
                    starSpacing="0"
                    starRatedColor="#d0011b"
                />
            </div>
            <div className="review-cmt">
                <p> {data.comment} </p>
            </div>
        </div>
    );
}
