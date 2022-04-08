import type { NextPage } from "next";
import useSwr from "swr";
import { useSWRHandler } from "swr/dist/use-swr";
import styles from "../styles/Home.module.css";
import fetcher from "../utils/fetcher";

const Home: NextPage = () => {
  const { data } = useSwr(
    `
    ${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/me
  `,
    fetcher
  );

  if (data) {
    return <div>Welcome! {data.username}</div>;
  }
  return <div className={styles.container}>Please login</div>;
};

export default Home;
