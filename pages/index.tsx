import type { NextPage } from "next";
import React from "react";

const Home: NextPage = () => {
  const [text, setText] = React.useState("");
  React.useEffect(() => {
    (async () => {
      const data = await fetch("/posts").then((res) => res.json());
      console.log(data);
    })();
  }, []);
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          (async () => {
            const { v4: uuidv4 } = require("uuid");
            const data = await fetch("/posts", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                id: uuidv4(),
                title: text,
              }),
            }).then((res) => res.json());
            console.log(data);
          })();
        }}
      >
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.currentTarget.value)}
        />
        <button>post</button>
      </form>
    </div>
  );
};

export default Home;
