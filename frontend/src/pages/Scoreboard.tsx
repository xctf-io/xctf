import { usePublicAccessCheck } from "../util/auth";

export default function Scoreboard() {
  usePublicAccessCheck("score_visibility");
  return <p>scoreboard</p>;
}
