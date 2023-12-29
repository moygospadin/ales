import { useEffect, useState } from "react";
import { ITwit } from "../../routes";
import { useHttpClient } from "../../shared";
import { EditTwit } from "../EditTwit";
import { Footer } from "../Footer";
import { Post } from "../Post";
import "./Blog.css";
export function Blog() {
  const httpClient = useHttpClient();
  const [featuredPosts, setData] = useState<ITwit[]>([]);
  const [open, setOpen] = useState(false);
  const [twit, setTwit] = useState<null | ITwit>(null);
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
  const handleDelete = async (twit: ITwit) => {
    await httpClient.delete(`/twits/${twit.id}/`);
    fetchData();
  };

  const close = () => {
    setTwit(null);
    setOpen(false);
    fetchData();
  };
  const handleEdit = (twit: ITwit) => {
    setOpen(true);
    setTwit(twit);
  };
  return (
    <>
      <EditTwit isOpen={open} twit={twit} close={close} />
      <div className="blogContainer">
        {featuredPosts.map((post) => (
          <Post
            key={post.title}
            twit={post}
            onDelete={() => handleDelete(post)}
            onEdit={() => handleEdit(post)}
          />
        ))}
      </div>
      <Footer
        title="Footer"
        description="Something here to give the footer a purpose!"
      />
    </>
  );
}
