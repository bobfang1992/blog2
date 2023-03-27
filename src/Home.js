import React, { useEffect, useState } from 'react';
import { articles } from './ArticleData'
import { Client } from "@notionhq/client";

const notion = new Client({
    auth: process.env.REACT_APP_NOTION_API_KEY,
});

function ArticleListing(article) {
    return (
        <>
            <a href={article.url}><h2>{article.title}</h2></a>
            <p>{article.date}</p>
        </>
    )
}

function Home() {
    const [items, setItems] = useState([]);
    const databaseId = "c3561f23082f491fa4b502a83db609ea";

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await notion.databases.query({ database_id: databaseId });
                const items = response.results.map((item) => item.title[0].plain_text);
                setItems(items);
            } catch (error) {
                console.error("Error fetching Notion data:", error);
            }
        };

        fetchData();
    }, [databaseId]);
    console.log(items);
    return (
        <>
            <h1>Blog Roll</h1>

            <ul>
                {
                    articles.map((article) => (
                        <li key={article.url}>{ArticleListing(article)}</li>
                    ))}
            </ul>
        </>
    )
}
export default Home;