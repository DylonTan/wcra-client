import React, { useEffect } from "react";
import "./App.css";

const App = () => {
  useEffect(() => {
    const connection = new WebSocket("ws://esp8266.local:80");

    connection.onopen = () => {
      console.log('Connected')
    };

    connection.onmessage = (res) => {
      console.log(res.data);
    };

    connection.onerror = (err) => {
      console.log("WebSocket Error: " + err);
    };

    connection.onclose = () => {
      console.log("Disconnected");
    };

    window.addEventListener("keypress", (event) => {
      console.log(connection.readyState, WebSocket.OPEN)
      if (connection.readyState !== WebSocket.OPEN) {
        return;
      }

      const keyCode = event.keyCode;

      if (keyCode === 119) {
        connection.send("FORWARDS");
      } else if (keyCode === 97) {
        connection.send("LEFT");
      } else if (keyCode === 100) {
        connection.send("RIGHT");
      } else if (keyCode === 115) {
        connection.send("BACKWARDS");
      }
    });
  }, []);

  return (
    <div className="App">
      <h1>Hello why u wanna control me weirdo? </h1>
      <p>Press W, A, S or D to control</p>
    </div>
  );
};

export default App;
