import React, { useState } from "react";
import { Typography } from "antd";
import { useParams } from "react-router-dom";
import { useTokensQuery } from "../redux/api/token";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

const { Title } = Typography;

const Token = () => {
  const { user } = useParams();
  const [interval, setInterval] = useState(0);
  const { data } = useTokensQuery(
    { user__username: user, is_active: true },
    { pollingInterval: interval }
  );
  const renderTime = ({ remainingTime }) => {
    if (remainingTime === 0) {
      return <div className="timer">Too lale...</div>;
    }

    return (
      <div className="timer">
        <div className="value">{remainingTime}</div>
      </div>
    );
  };
  return (
    <>
      <Title>Tu token es</Title>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Title level={2}>{data && data[0].token}</Title>
        <div className="timer-wrapper" style={{ marginTop: 50 }}>
          <CountdownCircleTimer
            size={60}
            isPlaying
            duration={10}
            colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
            colorsTime={[10, 6, 3, 0]}
            onComplete={() => ({ shouldRepeat: true, delay: 1 })}
          >
            {renderTime}
          </CountdownCircleTimer>
        </div>
      </div>
    </>
  );
};

export default Token;
