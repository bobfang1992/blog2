

export class ArticleData {
    constructor(title, date, url) {
        this.title = title;
        this.date = date;
        this.url = url;
    }
}

export const articles = [
    new ArticleData("C++ API Design", "2021-03-26", "https://dorafmon.notion.site/C-API-Design-aa144e05f6ae48378873ea5be97fec82"),
    new ArticleData("Hello World", "2023-03-26", "/blog/hello-world"),
];