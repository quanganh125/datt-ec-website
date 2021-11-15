import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { Container, Radio, Rating } from "./styles";
const Rate = ({ numberVoted, size, choice }) => {
    const [rate, setRate] = useState(numberVoted || 0);
    return (
        <Container style={{ fontSize: size || null }}>
            {[...Array(5)].map((item, index) => {
                const givenRating = index + 1;
                return (
                    <label key={givenRating}>
                        <Radio
                            type="radio"
                            value={givenRating}
                            onClick={() => {
                                if (choice === true) setRate(givenRating);
                            }}
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
