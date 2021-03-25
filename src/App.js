import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";
import GithubCalendar from "react-github-calendar";

function App() {
  const [repoData, setRepoData] = useState([]);
  const [todayCommitCount, setTodayCommitCount] = useState(0);
  const [id, setId] = useState("");

  // useEffect 내부에서 state를 변경시킨 결과로, 컴포넌트의 재렌더링 발생
  // 렌더링시에 다시 useEffect가 실행되어서 무한 렌더링이 나타났던 것.
  useEffect(() => {
    axios.get("https://api.github.com/users/gyeolse/repos").then(({ data }) => {
      setRepoData(data);
    });
  }, []);

  const todayCount = () => {
    let today = new Date().toISOString().substr(0, 10);
    let commitCount = 0;
    repoData.map((v) => {
      if (v.updated_at.substr(0, 10) == today) {
        commitCount = commitCount + 1;
      }
      // console.log(v.updated_at.substr(0, 10));
    });

    setTodayCommitCount(commitCount);

    console.log("today Commit 안한 개수 : ", todayCommitCount);
  };

  return (
    <div className="App">
      <div>캘린더</div>
      <div>
        <GithubCalendar username="gyeolse" />
      </div>
      <div>오늘 커밋 개수 {todayCommitCount} 회 커밋</div>
      <div>
        <button onClick={todayCount}> 불러오기</button>
      </div>
    </div>
  );
}

export default App;
