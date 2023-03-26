

export class ArticleData {
    constructor(title, date, url) {
        this.title = title;
        this.date = date;

        this.url = url;
    }
}

export const articles = [
    new ArticleData("Hello World", "2023-03-26", "hello-world"),
];