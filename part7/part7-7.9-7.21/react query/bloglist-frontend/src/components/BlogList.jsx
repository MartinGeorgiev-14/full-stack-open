import {useState, forwardRef, useImperativeHandle} from "react"
import blogService from '../services/blogs'
import { useQuery } from "@tanstack/react-query"
import Toggable from "./Toggable"
import Blog from "./Blog"
import PropType from "prop-types"

const BlogList = (prop) => {
    const [sortType, setSortType] = useState(true)
    const result = useQuery({
        queryKey: ['blogs'],
        queryFn: blogService.getAll
      })

    const handleSort = (event) => {
        event.preventDefault()

        // high to low
        if(sortType){
            result.data.sort((a,b) => b.likes - a.likes)
            setSortType(!sortType)
        }
        // low to high
        else{
            result.data.sort((a,b) => a.likes - b.likes)
            setSortType(!sortType)
        }
    } 


    return (
        <div>
            <button type='submit' onClick={handleSort}>Sort</button>
            {result.isLoading === true ? <div>Loadnig</div> :
               result.data.map(blog =>{
                
                return(
                <Toggable key={blog.id} buttonLabelOpen={"View"} buttonLabelClose={"Close"}>
                    <Blog key={blog.id} blog={blog} user={prop.user} />
                </Toggable>
                )
               }
            )}
        </div>
    )
}

export default BlogList