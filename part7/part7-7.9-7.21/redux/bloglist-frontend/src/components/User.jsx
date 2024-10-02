import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { TableContainer, Table, TableRow, TableCell, TableHead, Paper, TableBody } from "@mui/material";

const User = () => {
    const id = useParams().id 
    const user = useSelector(state => {
        return state.userList.find(u => u.id === id)
    })

    return (
        <>
            <h2>{user.name}</h2>
            <TableContainer component={Paper}>
                <Table >
                    <TableBody>
                        {user.blogs.map(blog => {
                            return(
                                <TableRow key={blog.id}>
                                    <TableCell>{blog.title}</TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
        // <div>
        //     <h2>{user.name}</h2>
        //     <h5>Added blogs</h5>
        //     <ul>
        //         {user.blogs.map(blog => (
        //             <li key={blog.id}>{blog.title}</li>
        //         ))}
        //     </ul>
        // </div>
    )
}

export default User