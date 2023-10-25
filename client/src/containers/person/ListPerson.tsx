import { Button } from "@/components/ui/button";
import DataTable from "react-data-table-component";
import EditPerson from "./EditPerson";
import { useEffect, useState } from "react";

type ListPersonProps = {
  setPersonsChange: (bool: boolean) => void;
  allPersons: any;
};

const ListPerson: React.FC<ListPersonProps> = ({
  allPersons,
  setPersonsChange,
}) => {
  const columns = [
    {
      name: "First Name",
      selector: (row: any) => row.person_fname,
    },
    {
      name: "Last Name",
      selector: (row: any) => row.person_lname,
    },
    {
      name: "Birthday",
      selector: (row: any) => row.person_bday,
    },
    {
      name: "Sex",
      selector: (row: any) => row.person_sex,
    },
    {
      name: "Address",
      selector: (row: any) => row.person_address,
    },
    {
      name: "",
      selector: (row: any) => (
        <div className="flex space-x-2">
          <EditPerson data={row} setPersonsChange={setPersonsChange} />
          <Button
            className="bg-red-700"
            onClick={() => deletePerson(row.person_id)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  const [persons, setPersons] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);
  function refreshPage() {
    setRefreshKey((prevKey) => prevKey + 1);
  }

  //* delete a person from the database
  async function deletePerson(id: number) {
    try {
      await fetch(`http://localhost:5000/home/persons/${id}`, {
        method: "DELETE",
        headers: { token: localStorage.token },
      });
      setPersons(persons.filter((person: any) => person.person_id !== id));
      refreshPage();
    } catch (error) {
      console.error((error as Error).message);
    }
  }

  useEffect(() => {
    setPersons(allPersons);
  }, [allPersons, refreshKey]);

  return (
    <div className="w-[1200px]">
      <DataTable columns={columns} data={allPersons} />
    </div>
  );
};

export default ListPerson;
