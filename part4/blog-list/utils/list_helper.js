const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const sumOfLikes = blogs.reduce((acc, blog) => acc + blog.likes, 0);
  return sumOfLikes;
};

const favouriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return { error: 'List is empty' };
  }
  const mostLikedBlog = blogs.reduce((mostLiked, blog) =>
    mostLiked.likes > blog.likes ? mostLiked : blog
  );

  return {
    title: mostLikedBlog.title,
    author: mostLikedBlog.author,
    likes: mostLikedBlog.likes,
  };
};

module.exports = { dummy, totalLikes, favouriteBlog };
