import Page from './Page';

export default class Paginator {

    private pages: Page[] = [];
    private index: number = 0;

    addPages(...pages: (String | Page)[]) {
        if (pages.length <= 0)
            throw "addPages cannot be called with 0 args";

        pages.forEach(page => {
            if (typeof(page) === 'string') {
                this.pages.push(new Page(page as String));
            } else {
                this.pages.push(page as Page);
            }
        })
    }

    nextPage() {
        this.index = this.index + 1;
    }

    finished() {
        return this.index === this.pages.length - 1;
    }

    render(html: JQuery<HTMLDivElement>) {

    }

    renderPage(html: JQuery<HTMLDivElement>, page: Page) {
        page.render(html);
    }
}