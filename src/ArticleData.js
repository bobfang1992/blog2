

export class ArticleData {
    constructor(title, date, content, url) {
        this.title = title;
        this.date = date;
        this.content = content;
        this.url = url;
    }
}

export const articles = [
    new ArticleData("Hello World", "2023-03-26", "This is my first blog post", "hello-world"),
];