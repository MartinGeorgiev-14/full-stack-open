import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogCreator from './BlogsCreator'
import loginServices from '../services/login'

const userCreditentials = {
    username: "geq13",
    password: "123456aA@"
}

const blog = {
    title: "Cool title here",
    url: 'https://www.cooltitlehereofficialsite.com',
    author: 'Martin Cooler'
}

test('checks if a new blog is created', async () => {

    await loginServices.loginTest(userCreditentials)

    const postBlog = vi.fn()
    const { container } = render(<BlogCreator postBlog={postBlog} />)
    const user = userEvent.setup()
    screen.debug()
    const title = container.querySelector('.title-in')
    const url = container.querySelector('.url-in')
    const author = container.querySelector('.author-in')
    const button = container.querySelector('.save-btn')

    await user.type(title, blog.title)
    await user.type(url, blog.url)
    await user.type(author, blog.author)
    await user.click(button)

    expect(postBlog.mock.calls).toHaveLength(1)
    expect(postBlog.mock.calls[0][0]).toStrictEqual({title: blog.title, url: blog.url, author: blog.author})

})
