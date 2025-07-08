import { useState } from 'react'
import axios from 'axios';
import {
  TableRow, Grid, TableContainer, TableHead, TableCell, Paper, Table, TableBody,
  TextField, Stack, Button, Checkbox, FormControlLabel, FormGroup
} from '@mui/material';
import { useEffect } from 'react';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';


function Dashboard() {

  const [rows, setRows] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [todoName, setTodoname] = useState("");
  const token = localStorage.getItem("token");
  const API_URL = process.env.API_URL;

  const getUser = async () => {
    try {
      const res = await axios.get(`${API_URL}/todos`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setRows(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch todos.");
    } finally {
      setLoading(false);
    }
  }

  const addUser = async () => {
    try {
      const res = await axios.post(`${API_URL}/todos`,
        {todoName},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
    }
    catch (err) {
      console.log(err);
    }
    finally {
      getUser();
    }
  }

  const handleAddNewTodo = () => {
    if (todoName) {
      addUser();
      setTodoname("");
    }
    else {
      alert("Please Enter Name ");
    }
  }

  const handleDelete = async (todoId) => {
    try {
      const res = await axios.delete(`${API_URL}/todos/${todoId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      // console.log(res);      
    }
    catch (err) {
      console.log(err);
    }
    finally {
      getUser();
    }
  }

  const handleChangeDone = async (e, todoId) => {
    const completed = e.target.checked;
    try {
      const res = await axios.put(`${API_URL}/todos/${todoId}`, { completed },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      // console.log(res);
    }
    catch (err) {
      console.log(err);
    }
    finally {
      getUser();
    }
  }

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <Grid sx={{ maxWidth: 800, margin: "auto" }}>
        <Grid sx={{my:"20px"}}>
          <Stack direction="row" spacing={2}>

            <TextField id="outlined-basic" label="TodoName" size="small" variant="outlined" sx={{ margin: "10px" }} onChange={(e) => setTodoname(e.target.value)}  value={todoName}/>

            <Button variant="contained" onClick={handleAddNewTodo}> Add</Button>

          </Stack>
        </Grid>
        <TableContainer component={Paper}  >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>S.No</TableCell>
                <TableCell >Name</TableCell>
                <TableCell>Completed?</TableCell>
                <TableCell>Created_At</TableCell>
                <TableCell >Edit</TableCell>
                <TableCell >Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!loading && error === null && rows.length > 0 && rows?.map((row, index) => (
                <TableRow
                  key={row.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell >{index + 1}</TableCell>
                  <TableCell >{row.todoName}</TableCell>
                  <TableCell >{row.completed ? "Done" : "Not Done"}</TableCell>
                  <TableCell >{row.created_At}</TableCell>
                  <TableCell>
                    <FormGroup>
                      <FormControlLabel control={<Checkbox
                        checked={row.completed}
                        onChange={(e) => { handleChangeDone(e, row.id) }}
                      />} />
                    </FormGroup>
                  </TableCell>
                  <TableCell ><DeleteOutlineOutlinedIcon className='text-danger cursor-pointer' onClick={() => { handleDelete(row.id) }} /></TableCell>
                </TableRow>
              ))}
              {!loading && error === null && rows.length === 0 &&
                <TableRow>
                  <TableCell>
                    No Record Found
                  </TableCell>
                </TableRow>
              }
              {loading && error === null &&
                <TableRow>
                  <TableCell>
                    Loading...
                  </TableCell>
                </TableRow>
              }
              {!loading && error &&
                <TableRow>
                  <TableCell>
                    {error}
                  </TableCell>
                </TableRow>
              }
            </TableBody>
          </Table>
        </TableContainer>

      </Grid>
    </>
  )
}

export default Dashboard
