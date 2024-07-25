const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createFirstBlog, createBlog } = require('./helper')


describe('Blog app', () => {
    beforeEach(async ({ page, request }) => {
        await request.post('/api/testing/reset')
        await request.post('/api/users', {
            data: {
                name: "pesho",
                username: 'geq13',
                password: '123456aA@'
            }
        })

        await page.goto('/')
    })

    test('Login form in show', async ({ page }) => {
        await page.getByRole('button', { name: 'Login' }).click()

        await expect(page.getByTestId('username-div')).toBeVisible()
        await expect(page.getByTestId('password-div')).toBeVisible()
        await expect(page.getByRole('button', { name: 'Log in' })).toBeVisible()
    })

    describe('Login', () => {
        test('succeed with correct credentials', async ({ page }) => {
            await loginWith(page, 'geq13', '123456aA@')

            const message = await page.getByText('Successfully logged in')

            await expect(message).toBeVisible()
        })

        test('fails with wrong credentials', async ({ page }) => {
            await loginWith(page, 'geq13', 'goffy ahh password')

            const message = await page.getByText('Invalid username or password')

            await expect(message).toBeVisible()
        })

        describe('When logged in', () => {
            beforeEach(async ({ page }) => {
                await loginWith(page, 'geq13', '123456aA@')
            })

            test('a new blog can be created', async ({ page }) => {
                await createFirstBlog(page, 'cool title', 'www.cool-title.com', 'cool dude')

                await expect(page.getByText('cool title cool dude')).toBeVisible()
                await expect(page.getByText('www.cool-title.com')).not.toBeVisible()
            })

            describe('When a blog is created', () => {
                beforeEach(async ({ page }) => {
                    await createFirstBlog(page, 'cool title', 'www.cool-title.com', 'cool dude')
                })

                test('a blog can be liked', async ({ page }) => {
                    const blogs = await page.$$('.div-blog')
                    const blogsContainer = []
                    await page.getByText("cool title cool dude").getByRole('button', {name: 'View'}).click()

                    for(blogDiv of blogs){
                        const likes = await blogDiv.$eval('.div-likes', div => parseInt(div.innerText))

                        blogsContainer.push(likes)
                    }

                    await page.getByText(blogsContainer[0]).getByRole('button', {name: 'like'}).click()
                    await expect(page.getByText(blogsContainer[0] + 1)).toBeVisible()
                })

                test('a blog can be deleted', async ({ page }) => {
                    page.on('dialog', dialog => dialog.accept());

                    const blog = await page.getByText('cool title cool dude')
                    await blog.getByRole('button', { name: 'View' }).click()
                    await page.getByRole('button', { name: 'Delete' }).click()

                    await expect(blog).not.toBeVisible()
                    await expect(page.getByText('www.cool-title.com')).not.toBeVisible()
                    await expect(page.getByText('cool dude')).not.toBeVisible()
                })
            })

            describe('when blogs are sorted', () => {
                beforeEach(async ({ page }) => {
                    await createFirstBlog(page, 'cool title 1', 'www.cool-title-1.com', 'cool dude 1')
                    await createBlog(page, 'cool title 2', 'www.cool-title-2.com', 'cool dude 2')
                    await createBlog(page, 'cool title 3', 'www.cool-title-3.com', 'cool dude 3')
                })

                test("if blogs are sorted by likes", async ({ page }) => {
                    await page.getByRole('button', { name: "Sort" }).click()

                    const normalBlogDivs = await page.$$('.div-blog')
                    const normalBlogData = []

                    for (const blogDiv of normalBlogDivs) {
                        const url = await blogDiv.$eval('div:nth-child(1)', div => div.innerText)
                        const author = await blogDiv.$eval('div:nth-child(2)', div => div.innerText)
                        const likes = await blogDiv.$eval('.div-likes', div => parseInt(div.innerText))

                        normalBlogData.push({ url, author, likes })
                    }
                   
                    normalBlogData.sort((a, b) => b.likes - a.likes);

                    const sortedBlogDivs = await page.$$('.div-blog')
                    const sortedBlogData = []

                    for(const blogDiv of sortedBlogDivs) {
                        const url = await blogDiv.$eval('div:nth-child(1)', div => div.innerText)
                        const author = await blogDiv.$eval('div:nth-child(2)', div => div.innerText)
                        const likes = await blogDiv.$eval('.div-likes', div => parseInt(div.innerText))

                        sortedBlogData.push({ url, author, likes })
                    }

                    for (let i = 0; i < sortedBlogData.length; i++) {
                        expect(sortedBlogData[i].likes).toBeGreaterThanOrEqual(normalBlogData[i].likes)
                    }
                })
            })



        })
    })
})