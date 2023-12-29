import { Blog } from "../../components/Blog";
import { Header } from "../../components/Header/Header";
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
  return (
    <>
      <Header />
      <Blog />
    </>
  );
};
