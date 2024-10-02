import { useState, forwardRef, useImperativeHandle, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { setBlogs, changeSort } from "../reducers/blogsReducer"
import { getAll } from "../services/blogs"
import BlogCreator from "./BlogsCreator"
import Toggable from "./Toggable"
import Blog from "./Blog"
import PropType from "prop-types"
import { Link } from "react-router-dom"
import { Button, Paper, TableContainer, Table, TableCell, TableBody, TableRow } from "@mui/material"

const BlogList = () => {
    const dispatch = useDispatch()
    const blogs = useSelector(data => data.blogs.content)
    const sortType = useSelector(data => data.blogs.sortType)



    useEffect(() => {
        getAll().then(blogs => {
            dispatch(setBlogs(blogs))
        })
    }, [])

    const handleSort = (event) => {
        event.preventDefault()
        const blogToSort = [...blogs]


        // high to low
        if (sortType) {
            const sorted = blogToSort.sort((a, b) => b.likes - a.likes)
            dispatch(setBlogs(sorted))
            dispatch(changeSort())
        }
        // low to high
        else {
            const sorted = blogToSort.sort((a, b) => a.likes - b.likes)
            dispatch(setBlogs(sorted))
            dispatch(changeSort())
        }
    }

    return (
        <div>
            <div style={{ display: 'flex', flexDirection: 'column', width: 'fit-content', gap: '0.5rem', marginBottom: '1rem' }}>
                <Toggable buttonLabelOpen={"Create blog"} buttonLabelClose={"Cancel"}>
                    <BlogCreator />
                </Toggable>
                <Button type="submit" variant="contained" color="primary" onClick={handleSort}>Sort</Button>
            </div>

            <TableContainer component={Paper}>
                <Table>
                    <TableBody>
                        {blogs.map(blog => {
                            return (
                                <TableRow key={blog.id}>
                                    <TableCell>
                                        <Link to={'/blog/' + blog.id}>{blog.title}</Link>
                                    </TableCell>
                                </TableRow>
                            )
                        })}

                    </TableBody>
                </Table>
            </TableContainer>

        </div>
    )
}


export default BlogList