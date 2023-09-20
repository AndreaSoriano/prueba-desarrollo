import React, { useEffect, useState } from "react";
import { Typography } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import { useTokensQuery } from "../redux/api/token";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import moment from "moment-timezone";

const { Title } = Typography;

const Token = () => {
  const { user } = useParams();
  const navigate = useNavigate();
  const [token, setToken] = useState("You have no active token");
  const [interval, setInterval] = useState(0);

  useEffect(() => {
    if (!user) navigate("/");
  });

  const { data } = useTokensQuery(
    { user__username: user, is_active: true },
    { pollingInterval: interval }
  );

  useEffect(() => {
    if (data && data.length) {
      setToken(data[0].token);
      const milliseconds = moment(data[0].created_at)
        .add(60, "seconds")
        .diff(moment.tz("America/Scoresbysund"), "milliseconds");
      setInterval(milliseconds);
    } else {
      setToken("You have no active token");
      setInterval(0);
    }
  }, [data]);

  const renderTime = ({ remainingTime }) => {
    if (remainingTime === 0) {
      return <div className="timer">60</div>;
    }

    return (
      <div className="timer">
        <div className="value">{remainingTime}</div>
      </div>
    );
  };
  return (
    <>
      <Title>Your token is</Title>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Title level={2}>{token}</Title>
        <div className="timer-wrapper" style={{ marginTop: 50 }}>
          <CountdownCircleTimer
            size={60}
            isPlaying
            duration={interval / 1000}
            colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
            colorsTime={[60, 40, 20, 0]}
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
