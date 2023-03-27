import React, { useEffect, useState } from 'react';
import { articles, ArticleData } from './ArticleData';

const notion_api = "https://us-central1-bobfang-blog-notion-proxy.cloudfunctions.net/notionProxy";

function ArticleListing({ title, date, url }) {
    return (
        <>
            <a href={url}><h2>{title}</h2></a>
            <p>{date}</p>
        </>
    );
}

function parseToArticleData(pages) {
    return pages.map(page => {
        const title = page.properties.Name.title[0].plain_text;
        const date = new Date(page.created_time);
        const url = page.url.replace("https://www.notion.so", "https://dorafmon.notion.site");
        return new ArticleData(title, date, url);
    });
}

function Home() {
    const [items, setItems] = useState([]);
    const databaseId = "c3561f23082f491fa4b502a83db609ea";

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${notion_api}/query?databaseId=${databaseId}`, {
                    method: "POST",
                });
                const data = await response.json();
                const items = data.results;
                let articleDataArray = parseToArticleData(items);
                articleDataArray = [...articleDataArray, ...articles];
                articleDataArray.sort((a, b) => b.date - a.date);
                setItems([...articleDataArray]);
            } catch (error) {
                console.error("Error fetching Notion data:", error);
            }
        };

        fetchData();
    }, [databaseId]);

    return (
        <>
            <h1>Blog Roll</h1>
            <ul>
                {items.map((article) => (
                    <li key={article.url}>
                        <ArticleListing title={article.title} date={article.date} url={article.url} />
                    </li>
                ))}
            </ul>
        </>
    );
}

export default Home;
