import { useEffect } from "react";
import { ctfg } from "../service";
import { challenges, setChallenges } from "../store/challenges";
import React from "react";

interface Challenge {
  name: string;
  value: number;
}

export default function ChallengeList() {
  useEffect(() => {
    async function fetchChallenges() {
      try {
        const resp = await ctfg.GetChallenges({});
        setChallenges(resp.challenges);
      } catch (e) {
        console.error(e);
      }
    }
    fetchChallenges();
  }, []);

  function sort(key: string) {
    if (challenges) {
      const sorted = challenges.sort((a: Challenge, b: Challenge) => {
        if (a[key] < b[key]) {
          return -1;
        }
        if (a[key] > b[key]) {
          return 1;
        }
        return 0;
      });
      setChallenges(sorted);
    }
  }

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
            <td>{challenge.value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}