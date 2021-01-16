import QuestionPage from './pages/QuestionPage';
import ResultsPage from './pages/ResultsPage';
import WelcomePage from './pages/WelcomePage';
import Paginator from './Paginator';
import { QuestionType } from './Question';
import QuestionPaginator from './QuestionPaginator';

export default class BeemerTest {
    private html: JQuery<HTMLDivElement>;

    private identity: QuestionPaginator;
    private past: QuestionPaginator;
    private career: QuestionPaginator;
    private sexlife: QuestionPaginator;
    private future: QuestionPaginator;
    private hypothetical: QuestionPaginator;

    private finished: boolean = false;

    private paginator: Paginator = new Paginator();

    constructor() {
        $("body").append("<div class='beemer-test'></div>");
        this.html = $("div.beemer-test");

        this.identity = new QuestionPaginator("Identity");
        this.past = new QuestionPaginator("Past");
        this.career = new QuestionPaginator("Career");
        this.sexlife = new QuestionPaginator("Sexlife");
        this.future = new QuestionPaginator("Future");
        this.hypothetical = new QuestionPaginator("Hypothetical");

        this.addIdentityPages();

        this.paginator.renderPage(this.html, new WelcomePage().onBeginClicked(() => {
            this.paginator = this.identity;
            this.paginator.render(this.html);
        }));
    }

    addIdentityPages() {
        const pages = [
            new QuestionPage("Test Question", QuestionType.YesNo)
        ];
        
        this.identity.addPages(...pages);
    }

    nextCategory() {
        if (this.paginator === this.identity)
            this.paginator = this.past;
        else if (this.paginator == this.past)
            this.paginator = this.career;
        else if (this.paginator == this.career)
            this.paginator = this.sexlife;
        else if (this.paginator == this.sexlife)
            this.paginator = this.future;
        else if (this.paginator == this.future)
            this.paginator = this.hypothetical;
        else if (this.paginator == this.hypothetical)
            this.paginator.renderPage(this.html, new ResultsPage(this.getResults()));
    }

    nextQuestion() {
        if (this.paginator.finished() && !this.finished) {
            this.nextCategory();
            return;
        }

        this.paginator.nextPage();
    }

    getResults(): number {
        return 0;
    }
}