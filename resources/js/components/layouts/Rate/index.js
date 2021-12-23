import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { Container, Radio, Rating } from "./styles";
const Rate = ({ numberVoted, size, choice, handleGetNumStar, numStar }) => {
    const [rate, setRate] = useState(numStar || 0);

    const handleVoteStar = (givenRating) => {
        if (choice === true) {
            setRate(givenRating);
            handleGetNumStar(givenRating);
        }
    };

    useEffect(() => {
        return () => {
            setRate(0);
        };
    }, []);

    return (
        <Container style={{ fontSize: size || null }}>
            {[...Array(5)].map((item, index) => {
                const givenRating = index + 1;
                return (
                    <label key={givenRating}>
                        <Radio
                            type="radio"
                            value={givenRating}
                            onClick={() => handleVoteStar(givenRating)}
                        />
                        <Rating>
                            <FaStar
                                color={
                                    givenRating < rate || givenRating === rate
                                        ? "#fcec00"
                                        : "grey"
                                }
                            />
                        </Rating>
                    </label>
                );
            })}
        </Container>
    );
};

export default Rate;
