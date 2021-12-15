import "./styles.css";
import { useState } from "react";
import { TextLimiter } from "./text-limiter";

export default function App() {
  const [content, setContent] = useState(
    "Start editing to see some magic happen!"
  );

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>
        <outfit-limiter max-lines="2">{content}</outfit-limiter>
      </h2>
      <hr />
      <h2>
        <TextLimiter maxLines={2}>{content}</TextLimiter>
      </h2>
      <h2>
        <TextLimiter maxHeight={60}>{content}</TextLimiter>
      </h2>
      <h2>
        <TextLimiter textFit={true}>{content}</TextLimiter>
      </h2>
      <textarea value={content} onChange={(e) => setContent(e.target.value)} />
    </div>
  );
}
