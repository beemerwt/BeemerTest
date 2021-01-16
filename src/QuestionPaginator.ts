import QuestionPage from "./pages/QuestionPage";
import Paginator from "./Paginator";


export default class QuestionPaginator extends Paginator {

    private category: string;

    constructor(category: string) {
        super();
        this.category = category;
    }

    addPages(...pages: QuestionPage[]) {
        if (pages.length <= 0)
            throw "addPages cannot be called with 0 args";

        for (let i = 0; i < pages.length; i++) {
            const page = pages[i].category(this.category).number(i + 1);
            page.onNextQuestion(() => this.nextPage());
            page.onPrevQuestion(() => this.prevPage());
            this.pages.push(page);
        }
    }

    postRender(html: JQuery<HTMLDivElement>) {
        
    }
}