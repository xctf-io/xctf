import { useEffect } from "react";
import { ctfg } from "../service";
import { challenges } from "../store/challenges";

interface Challenge {
  name: string;
  category: string;
  value: number;
  solved: boolean;
}

export default function ChallengeList() {
  useEffect(() => {
    async function fetchChallenges() {
      try {
        const resp = await ctfg.GetChallenges({});
        challenges.set(resp.challenges);
      } catch (e) {
        console.error(e);
      }
    }
    fetchChallenges();
  }, []);

  function sort(key: string) {}

  return (
    <table>
      <thead>
        <tr>
          <th>
            <a href="#" onClick={() => sort("name")}>
              Name
            </a>
          </th>
          <th>
            <a href="#" onClick={() => sort("category")}>
              Category
            </a>
          </th>
          <th>
            <a href="#" onClick={() => sort("value")}>
              Value
            </a>
          </th>
          <th>
            <a href="#" onClick={() => sort("solved")}>
              Solved
            </a>
          </th>
        </tr>
      </thead>
      <tbody>
        {challenges && challenges.map((challenge: Challenge) => (
          <tr key={challenge.name}>
            <td>{challenge.name}</td>
            <td>{challenge.category}</td>
            <td>{challenge.value}</td>
            <td>{challenge.solved ? "Yes" : "No"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}