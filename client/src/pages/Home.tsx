import React from "react";

type HomeProps = { setAuth: (bool: boolean) => void };

const Home: React.FC<HomeProps> = ({ setAuth }) => {
  console.log(setAuth);
  return <div>Home page</div>;
};
export default Home;
