import WelcomePage from './pages/WelcomePage';
import Paginator from './Paginator';

export default class BeemerTest {
    private html: JQuery<HTMLDivElement>;

    private identity: Paginator = new Paginator();
    private past: Paginator = new Paginator();
    private career: Paginator = new Paginator();
    private sexlife: Paginator = new Paginator();
    private future: Paginator = new Paginator();
    private hypothetical: Paginator = new Paginator();
    private results: Paginator = new Paginator();

    private finished: boolean = false;

    private paginator: Paginator = new Paginator();

    constructor() {
        this.html = $("body").append("<div class='beemer-test'></div>");
        this.html.css({
            'width': 800,
            'height': 500,
            'text-align': 'center',
            'border': '1px solid black',
            'padding': 10
        });

        this.paginator.renderPage(this.html, new WelcomePage().onBeginClicked(() => {
            this.paginator = this.identity;
            console.log("This is a test callback!");
            this.paginator.render(this.html);
        }));
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
        else if (this.paginator == this.hypothetical) {
            this.paginator = this.results;
            this.finished = true;
        }
    }

    nextQuestion() {
        if (this.paginator.finished()) {
            this.nextCategory();
            return;
        }

        this.paginator.nextPage();
    }
}