import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import userEvent from '@testing-library/user-event';
import MutationObserver from 'mutationobserver-shim';

import Article from './Article';

const testArticle = {
    id: "7",
    author: "test author",
    headline: "test headline",
    createOn: "test date",
    summary: "test summary",
    body: "test body"
}

const testArticleNoAuthor = {
    id: "7",
    author: null,
    headline: "test headline",
    createOn: "test date",
    summary: "test summary",
    body: "test body"
}

test('renders component without errors', ()=> {
    render(<Article article={testArticle}/>);
});

test('renders headline, author from the article when passed in through props', ()=> {
    render(<Article article={testArticle}/>);
    
    const author = screen.getByTestId("author");
    const headline = screen.getByTestId("headline");
    const summary = screen.getByTestId("summary");
    const body = screen.getByTestId("body");
    
    expect(author).toBeInTheDocument();
    expect(headline).toBeInTheDocument();
    expect(summary).toBeInTheDocument();
    expect(body).toBeInTheDocument();
    expect(author).toHaveTextContent("test author");
    expect(headline).toHaveTextContent("test headline");
    expect(summary).toHaveTextContent("test summary");
    expect(body).toHaveTextContent("test body");
});

test('renders "Associated Press" when no author is given', ()=> {
    render(<Article article={testArticleNoAuthor}/>);

    const altAuthor = screen.getByTestId("author");

    expect(altAuthor).toHaveTextContent("Associated Press");
});

test('executes handleDelete when the delete button is pressed', ()=> {
    const mockDelete = jest.fn();
    
    render(<Article article={testArticle} handleDelete={mockDelete}/>);
    
    const article = screen.getByTestId("article");
    const deleteButton = screen.getByTestId("deleteButton");
    
    expect(article).toBeInTheDocument();
    expect(deleteButton).toBeInTheDocument();
    
    userEvent.click(deleteButton);
    
    expect(mockDelete).toBeCalledTimes(1);
});

//Task List: 
//1. Complete all above tests. Create test article data when needed.