import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import Blog from '../components/Blog';

describe('testing <Blog />', () => {
  let component;
  let mockHandler;

  beforeEach(() => {
    const blog = {
      title: 'Test blog',
      author: 'Test author',
      url: 'Test url',
      likes: 0,
      user: {
        username: 'katamatata',
      },
    };

    const user = {
      username: 'katamatata',
    };

    mockHandler = jest.fn();

    component = render(
      <Blog
        blog={blog}
        loggedUser={user}
        updateBlog={mockHandler}
        deleteBlog={() => {}}
      />
    );
  });

  test('renders its children', () => {
    expect(component.getByTestId('blog')).toBeDefined();
  });

  test('renders title and author, but does not render url or number of likes', () => {
    const blog = component.getByTestId('blog');
    expect(blog).toHaveTextContent('Test blog');
    expect(blog).toHaveTextContent('Test author');
    expect(blog).not.toHaveTextContent('Test url');
    expect(blog).not.toHaveTextContent('0');
  });

  test('renders url and number of likes after clicking the `view` button', () => {
    const view = component.getByText('view');
    fireEvent.click(view);

    const details = component.getByTestId('details');
    expect(details).toBeDefined();
    expect(details).toHaveTextContent('Test url');
    expect(details).toHaveTextContent('0');
  });

  test('clicking the `like` button calls event handler twice', () => {
    const view = component.getByText('view');
    fireEvent.click(view);

    const like = component.getByText('like');
    fireEvent.click(like);
    fireEvent.click(like);

    expect(mockHandler.mock.calls).toHaveLength(2);
  });

  test('clicking the `hide` button hides the details of the blog post', () => {
    const view = component.getByText('view');
    fireEvent.click(view);

    const hide = component.getByText('hide');
    fireEvent.click(hide);

    const blog = component.getByTestId('blog');
    expect(blog).not.toHaveTextContent('Test url');
    expect(blog).not.toHaveTextContent('0');
  });
});
