import { useSelector } from "react-redux";
import User from './User'
import { Link } from "react-router-dom";
import { TableContainer, Table, TableRow, TableCell, TableHead, Paper, TableBody } from "@mui/material";
const UserList = () => {
    const users = useSelector(state => state.userList)

    const styles = {
        display: "flex",
        flexDirection: "column",
    }
    return (
        <>
        <h2>User List</h2>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Blogs created</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            users.map(user => {
                                return (
                                    <TableRow key={user.id}>
                                        <TableCell>
                                            <Link to={`/user/${user.id}`}>{user.name}</Link>
                                        </TableCell>
                                        <TableCell>{user.blogs.length}</TableCell>
                                    </TableRow>
                                )
                            })
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )

}

export default UserList