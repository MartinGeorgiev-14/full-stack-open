import { render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import BlogList from './BlogList'
import Toggable from './Toggable'
import loginService from '../services/login'


describe('<Toggable/>', () => {
    
    const blog = {
        title: "Some blog",
        author: "Martin Georgiev",
        url: "https://example.com",
        likes: 10,
        id: "123"
    }

    const realBlog = {
        title: 'Testings',
        url: 'www.testings.com',
        author: 'Testera123',
        id: '669681733ccc8fa3f948d751'
    }

    const userCreditentials = {
        username: "geq13",
        password: "123456aA@"
    }

    let container

    beforeEach(() => {
       container = render(
            <Toggable key={blog.id} buttonLabelOpen={"View"} buttonLabelClose={"Close"}>
                <Blog key={blog.id} blog={blog}/> 
            </Toggable>
        ).container

    })

    // test("checks if blog's title and author are rendered", async () => {
    //     const div = container.querySelector(".heading")

    //     screen.debug(div);
        
    //     expect(div).toHaveTextContent(`${blog.title} ${blog.author}`)
    //     expect(div).not.toHaveTextContent(blog.url)
    //     expect(div).not.toHaveTextContent(blog.likes.toString())    
    //     expect(div).toBeDefined()
    // })

    // test("check if url and likes are shown when the button is clicked", async () => {
    //     const user = userEvent.setup()
    //     const button = screen.getByText("View")
    //     const heading = container.querySelector('.heading')
    //     const content = container.querySelector('.content')

    //     await user.click(button)

    //     expect(heading).toHaveStyle("display: none")
    //     expect(content).toHaveStyle("display: block")
    //     expect(content).toHaveTextContent(blog.url)
    //     expect(content).toHaveTextContent(blog.likes.toString())

    // })

    test("check if like button is clicked twice", async () => {
        const updateLikes = vi.fn()
        const user = userEvent.setup()
        const { container } = render(
            <Toggable key={realBlog.id} buttonLabelOpen={"View"} buttonLabelClose={"Close"}>
                <Blog key={realBlog.id} blog={realBlog} updateLikes={updateLikes}/> 
            </Toggable>
        )

        const heading = container.querySelector('.heading')
        const content = container.querySelector('.content')
        const showButton = container.querySelector('.open-btn')
        const button = container.querySelector('.like-btn')

        await loginService.loginTest(userCreditentials)
        await user.click(showButton)
        await user.click(button)
        await user.click(button)
        
        expect(heading).toHaveStyle('display: none')
        expect(content).toHaveStyle('display: block')
        expect(updateLikes).toHaveBeenCalledTimes(2)

    })
    
})

