import {useState} from "react"
import PropType from "prop-types"
import { useMutation } from "@tanstack/react-query"
import blogService  from "../services/blogs"
import { useQueryClient } from "@tanstack/react-query"

const BlogCreator = (prop) => {

    const [title, setTitle] = useState(null)
    const [url, setUrl] = useState(null)
    const [author, setAuthor] = useState({})
    const queryClient = useQueryClient()

    const newBlog = useMutation({
        mutationFn: blogService.postBlog,
        onSuccess: (result) => {
            const blogs = queryClient.getQueryData(['blogs'])
            queryClient.setQueryData(['blogs'], blogs.concat(result))
            prop.message.setNotificationMessage(`A new blog "${result.title}" by ${result.author} has been created`, 'success')
        },
        onError: (error) => {
            prop.message.setNotificationMessage(`Error saving blog: ${error}`, 'error')
        }
    })

    const blogForm = async (data) => {
        data.preventDefault()

        if(!(title && url && author)){
            prop.message.setNotificationMessage("Please fill all the fields", 'error')
            return
        }

        const blog = {
            title: title,
            url: url,
            author: author,
            likes: 0
        }
       
        newBlog.mutate(blog)        
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