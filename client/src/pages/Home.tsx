import AddPerson from "@/containers/person/AddPerson";
import ListPerson from "@/containers/person/ListPerson";
import React, { useEffect, useState } from "react";
type HomeProps = { setAuth: (bool: boolean) => void; columns: any; data: [] };

const Home: React.FC<HomeProps> = () => {
  const [allPersons, setAllPersons] = useState([]);
  const [personsChange, setPersonsChange] = useState(false);
  const [name, setName] = useState("");

  const getProfile = async () => {
    try {
      const res = await fetch("http://localhost:5000/home/", {
        method: "GET",
        headers: { token: localStorage.token },
      });
      const parseData = await res.json();
      setAllPersons(parseData);
      setName(parseData[0].user_name);
    } catch (error) {
      console.error((error as Error).message);
    }
  };

  useEffect(() => {
    getProfile();
    setPersonsChange(false);
  }, [personsChange]);

  return (
    <>
      <h1>welcome back: {name}</h1>
      <AddPerson setPersonsChange={setPersonsChange} />
      <ListPerson allPersons={allPersons} setPersonsChange={setPersonsChange} />
    </>
  );
};
export default Home;
