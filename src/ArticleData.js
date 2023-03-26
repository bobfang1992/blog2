

export class ArticleData {
    constructor(title, date, url) {
        this.title = title;
        this.date = date;

        this.url = url;
    }
}

export const articles = [
    new ArticleData("C++ API Design", "2021-03-26", "cpp-api-design"),
    new ArticleData("Hello World", "2023-03-26", "hello-world"),
];