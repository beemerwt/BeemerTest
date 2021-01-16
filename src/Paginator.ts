import Page from './Page';

export default class Paginator {

    pages: Page[] = [];
    index: number = 0;

    addPages(...pages: (string | Page)[]) {
        if (pages.length <= 0)
            throw "addPages cannot be called with 0 args";

        pages.forEach(page => {
            if (typeof(page) === 'string')
                this.pages.push(new Page(page as string));
            else
                this.pages.push(page as Page);
        });
    }

    nextPage() {
        if (this.index === this.pages.length - 1)
            return;
        this.index = this.index + 1;
    }

    prevPage() {
        if (this.index === 0)
            return;
        this.index = this.index - 1;
    }

    finished() {
        return this.index === this.pages.length - 1;
    }

    render(html: JQuery<HTMLDivElement>) {
        this.pages[this.index].render(html);
    }

    renderPage(html: JQuery<HTMLDivElement>, page: Page) {
        page.render(html);
    }
}