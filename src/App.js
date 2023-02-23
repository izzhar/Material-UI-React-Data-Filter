import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import dummy from "./data";
import "./App.css";
import { Box } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

const columns = [
  { field: "Name", headerName: "Name", width: 400 },
  { field: "Position", headerName: "Position", width: 400 },
  { field: "Office", headerName: "Office", width: 400 },
];

export const FILTER_LIST = [
  {
    id: "name",
    title: "Name",
  },
  {
    id: "position",
    title: "position",
  },
  {
    id: "office",
    title: "Office",
  },
];

let rows = [];

const App = () => {
  const [employeeData, setEmployeeData] = React.useState([]);
  const [search, setSearch] = React.useState("");
  const [getEvent, setGetEvent] = React.useState([]);
  React.useEffect(() => {
    rows = [...dummy];
    let data = rows.map((item, index) => ({ ...item, id: index + 1 }));
    setEmployeeData(data);
  }, [dummy]);

  let tempData = [...employeeData];
  const temp = tempData.filter((item) => {
    if (getEvent.includes("name")) {
      if (search === "") {
        return item;
      } else if (item.Name.toLowerCase().includes(search.toLocaleLowerCase())) {
        return item;
      }
    } else if (getEvent.includes("office")) {
      if (search === "") {
        return item;
      } else if (
        item.Office.toLowerCase().includes(search.toLocaleLowerCase())
      ) {
        return item;
      }
    } else if (getEvent.includes("position")) {
      if (search === "") {
        return item;
      } else if (
        item.Position.toLowerCase().includes(search.toLocaleLowerCase())
      ) {
        return item;
      }
    } else {
      if (search === "") {
        return item;
      } else if (item.Name.toLowerCase().includes(search.toLocaleLowerCase())) {
        return item;
      }
    }
  });
  const handleChange = (achievementId) => (event) => {
    const target = event.target;
    if (target.checked) {
      let Idset = getEvent;
      Idset.push(achievementId);
      setGetEvent([...Idset]);
    } else {
      let Idset = getEvent;
      let index = Idset.findIndex((x) => x === achievementId);
      if (index !== -1) Idset.splice(index, 1);
      setGetEvent([...Idset]);
    }
  };
  console.log("getEvents", getEvent);
  return (
    <div className="tableAlign">
      <input
        className="search"
        placeholder="search"
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div>
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={getEvent}
              onChange={handleChange}
              style={{ width: "154px", float: "right" }}
              label="Filter"
            >
              {FILTER_LIST.map((launch) => (
                <>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          id={launch.id}
                          name="getEventList"
                          checked={getEvent.some((data) => data === launch.id)}
                          onChange={handleChange(launch.id)}
                        />
                      }
                      label={launch.title}
                    />
                  </FormGroup>
                </>
              ))}
            </Select>
          </FormControl>
        </Box>
      </div>

      <DataGrid
        rows={temp}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />
    </div>
  );
};

export default App;
