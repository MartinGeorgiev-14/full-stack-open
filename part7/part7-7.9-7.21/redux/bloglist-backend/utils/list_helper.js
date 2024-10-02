const _ = require('lodash');


const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const result = blogs.reduce((total, blog) => total + blog.likes, 0)

    return result
}

const favoriteBlog = (blogs) => {
    const result = blogs.sort((blog1, blog2) => blog1.likes - blog2.likes)

    console.log(result)
    return result.length === 0 ? null : result[result.length - 1]
}

const mostBlogs = (blogs) => {
    const count = _.countBy(blogs, "author");
    const result = _.map(count, (count, user) => ({author: user, blogs: count}))
    
    return result.length === 0 ? null : result[0]
}

const mostLikes = (blogs) => {
    
    const likesByUser = _.reduce(blogs, (result, post) => {
        if (!result[post.author]) {
          result[post.author] = 0;
        }
        result[post.author] += post.likes;
        return result;
      }, {});
   
    const result = _.map(likesByUser, (likes, user) => ({author: user, likes: likes}));
    
    return result.length === 0? null : result[0]
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes,

}