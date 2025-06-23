import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div>
      <h1 style={{ fontSize: "2rem", color: "red" }}>
        404 - ページが見つかりません
      </h1>
      <p>指定されたページは存在しません。</p>
      <Link to={"/"}>return home</Link>
    </div>
  );
}
