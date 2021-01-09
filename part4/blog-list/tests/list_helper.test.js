const listHelper = require('../utils/list_helper');

describe('dummy', () => {
  test('dummy returns 1', () => {
    const blogs = [];
    const result = listHelper.dummy(blogs);
    expect(result).toBe(1);
  });
});

describe('total likes', () => {
  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    expect(result).toBe(7);
  });

  test('when list of blogs, equals the sum of likes in all of the blogs', () => {
    const result = listHelper.totalLikes(listOfBlogs);
    expect(result).toBe(24);
  });

  test('of empty array is zero', () => {
    expect(listHelper.totalLikes([])).toBe(0);
  });
});

describe('favourite blog', () => {
  test('when list has only one blog, equals that blog formatted object', () => {
    const result = listHelper.favouriteBlog(listWithOneBlog);
    expect(result).toEqual({
      title: 'React patterns',
      author: 'Michael Chan',
      likes: 7,
    });
  });

  test('when list of blogs, equals blog with most likes formatted object', () => {
    const result = listHelper.favouriteBlog(listOfBlogs);
    expect(result).toEqual({
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12,
    });
  });

  test('of empty array throws an error', () => {
    expect(() => {
      listHelper.favouriteBlog([]);
    }).toThrow('List is empty');
  });
});

// lists of blogs for testing purposes:
const listWithOneBlog = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0,
  },
];

const listOfBlogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url:
      'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0,
  },
];
