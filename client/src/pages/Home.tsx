import AddPerson from "@/containers/person/AddPerson";
import ListPerson from "@/containers/person/ListPerson";
import { columns } from "@/containers/person/column";
import React, { useEffect, useState } from "react";
type HomeProps = { setAuth: (bool: boolean) => void; columns: any; data: [] };

const Home: React.FC<HomeProps> = ({ setAuth }) => {
  const [allpersons, setAllPersons] = useState([]);
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
      <ListPerson
        data={allpersons}
        columns={columns}
        setPersonsChange={setPersonsChange}
      />
    </>
  );
};
export default Home;
