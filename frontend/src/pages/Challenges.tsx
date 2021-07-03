import { usePublicAccessCheck } from "../util/auth";

export default function Challenges() {
  usePublicAccessCheck("challenges_visibility");
  return <p>challenges</p>;
}
