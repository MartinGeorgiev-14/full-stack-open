
const loginWith = async (page, username, password) => {
    await page.getByRole('button', {name: 'Login'}).click()
    await page.getByTestId('username').fill(username)
    await page.getByTestId('password').fill(password)
    await page.getByRole('button', {name: 'Log in'}).click()
}  

const createFirstBlog = async (page, title, url, author) => {
    await page.getByRole('button', {name: 'Create blog'}).click()
    await page.getByTestId('title').fill(title)
    await page.getByTestId('url').fill(url)
    await page.getByTestId('author').fill(author)
    await page.getByRole('button', {name: 'Save'}).click()

    // await page.getByText(title).waitFor()
    // await page.getByText(url).waitFor()
    // await page.getByText(author).waitFor()
}

const createBlog = async (page, title, url, author) => {
    await page.getByTestId('title').fill(title)
    await page.getByTestId('url').fill(url)
    await page.getByTestId('author').fill(author)
    await page.getByRole('button', {name: 'Save'}).click()
}
export {loginWith, createFirstBlog, createBlog} 