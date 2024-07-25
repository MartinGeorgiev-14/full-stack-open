import {useState, forwardRef, useImperativeHandle} from "react"

import Toggable from "./Toggable"
import Blog from "./Blog"
import PropType from "prop-types"

const BlogList = ({blogs, setBlogs, userData}) => {
    const [sortType, setSortType] = useState(true)

    const handleSort = (event) => {
        event.preventDefault()

        // high to low
        if(sortType){
            const sorted = blogs.sort((a,b) => b.likes - a.likes)
            setBlogs(sorted)
            setSortType(!sortType)
        }
        // low to high
        else{
            const sorted = blogs.sort((a,b) => a.likes - b.likes)
            setBlogs(sorted)
            setSortType(!sortType)
        }
    } 

    return (
        <div>
            <button type='submit' onClick={handleSort}>Sort</button>
            {blogs.map(blog =>
                <Toggable key={blog.id} buttonLabelOpen={"View"} buttonLabelClose={"Close"}>
                    <Blog key={blog.id} blog={blog} blogs={blogs} setBlogs={setBlogs} userData={userData} />
                </Toggable>
            )}
        </div>
    )
}

BlogList.propTypes = {
    blogs: PropType.array.isRequired,
    setBlogs: PropType.func.isRequired,
}

export default BlogList