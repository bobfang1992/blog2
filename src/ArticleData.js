

export class ArticleData {
    constructor(title, date, url) {
        this.title = title;
        this.date = date instanceof Date ? date.toLocaleString() : date; // Convert the date to a string if it's a Date object
        this.url = url;
    }
}

export const articles = [
    new ArticleData("Hello World", new Date("2023-03-26"), "/blog/hello-world"),
];