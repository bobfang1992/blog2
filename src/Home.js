import React from 'react';
import { articles } from './ArticleData'

function ArticleListing(article) {
    return (
        <>
            <a href={`/blog/` + article.url}><h2>{article.title}</h2></a>
            <p>{article.date}</p>
        </>
    )
}

function Home() {
    return (
        <>
            <h1>Blog Roll</h1>

            <ul>
                {
                    articles.map((article) => (
                        <li>{ArticleListing(article)}</li>
                    ))}
            </ul>
        </>
    )
}
export default Home;