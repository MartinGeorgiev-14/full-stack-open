import {useState} from "react"
import blogService from "../services/blogs"
import PropType from "prop-types"

const BlogCreator = ({blogs, setBlogs, setMessage}) => {

    const [title, setTitle] = useState(null)
    const [url, setUrl] = useState(null)
    const [author, setAuthor] = useState({})
 
    const blogForm = async (data) => {
        data.preventDefault()
    
        if(!(title && url && author)){
            setMessage({text: "Please fill all the fields", type: "error"})
            return
        }

        const blog = {
            title: title,
            url: url,
            author: author,
            likes: 0
        }
        const result = await blogService.postBlog(blog)

        console.log(result, "created")

        if(result.error){
            setMessage({text: `Error saving blog ${result.error}`, type: "error"})
            return
        }

        const blogList = blogs.concat(result)
        setBlogs(blogList)
        setMessage({text: `A new blog "${result.title}" by ${result.author} has been created`, type: "success"})
        
    }

    return(
        <form onSubmit={blogForm}>
            <div>
                Title:
                <input type="text" className="title-in" onChange={(data) => setTitle(data.target.value)} data-testid='title'/>
            </div>
            <div>
                URL:
                <input type="text" className="url-in" onChange={(data) => setUrl(data.target.value)} data-testid='url'/>
            </div>
            <div>
                Author:
                <input type="text" className="author-in" onChange={(data) => setAuthor(data.target.value)} data-testid='author'/>
            </div>
            <div>
                <button type="input" className="save-btn">Save</button>
            </div>
        </form>
    )
}

// BlogCreator.propTypes = {
//     blogs: PropType.array.isRequired,
//     setBlogs: PropType.func.isRequired,
//     setMessage: PropType.func.isRequired
// }

export default BlogCreator;