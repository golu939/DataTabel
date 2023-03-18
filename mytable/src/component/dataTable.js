import axios from "axios";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

const CountriesTable = () => {
  const [search, setSearch] = useState([]);
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);

  const getDataTable = async () => {
    try {
      const response = await axios.get("https://restcountries.com/v2/all");
      setCountries(response.data);
      setFilteredCountries(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    {
      name: "Country Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Country Native Name",
      selector: (row) => row.nativeName,
      sortable: true,
    },
    {
      name: "Country Capital",
      selector: (row) => row.capital,
      sortable: true,
    },
    {
      name: "Country Flag",
      selector: (row) => <img width={50} height={50} src={row.flag} />,
      sortable: true,
    },
    {
      name: "Actoin",
      cell: (row) => (
        <button
          className="btn btn-primary"
          onClick={() => alert(row.alpha2Code)}
        >
          Country Codes
        </button>
      ),
    },
  ];

  useEffect(() => {
    getDataTable();
  }, []);

  useEffect(() => {
    const result = countries.filter((country) => {
      return country.name.uppercase().match(search.uppercase());
    });

    setFilteredCountries(result);
  }, [countries, search]);

  return (
    <DataTable
      title="Country List"
      columns={columns}
      data={filteredCountries}
      pagination
      fixedHeader
      fixedHeaderScrollHeight="380px"
      selectableRows
      selectableRowsHighlight
      highlightOnHover
      subHeader
      subHeaderComponent={
        <input
          type={"text"}
          placeholder="Search here"
          className="w-45 form control"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      }
    />
  );
};

export default CountriesTable;
