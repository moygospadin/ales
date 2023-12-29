import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useHttpClient } from "../../shared";
import "./Home.css";
export interface ITwit {
  answers: number;
  created_at: string;
  id: number;
  like: number;
  repost: number;
  title: string;
  updated_at: string;
}
export const Home = () => {
  const httpClient = useHttpClient();
  const [data, setData] = useState<ITwit[]>([]);
  const fetchData = async () => {
    try {
      const data = await httpClient.get<{ twits: ITwit[] }>("twits/");
      setData(data.twits);
      console.log("data", data);
    } catch (error) {}
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <div>Home page</div>
      <div className="homeContainer">
        <Link to={"/create_twit"}>create twit</Link>
        <Link to={"/login"}>login</Link>
        <Link to={"/register"}>register</Link>
      </div>
      <div className="twitContainer">
        {data.map((el) => (
          <p className="twit">{el.title}</p>
        ))}
      </div>
    </>
  );
};
