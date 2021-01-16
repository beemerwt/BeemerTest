import Paginator from './Paginator';

export default class BeemerTest {
    private iframe: JQuery<HTMLIFrameElement>;

    private identity: Paginator = new Paginator();
    private past: Paginator = new Paginator();
    private career: Paginator = new Paginator();
    private sexlife: Paginator = new Paginator();
    private future: Paginator = new Paginator();
    private hypothetical: Paginator = new Paginator();
    private results: Paginator = new Paginator();

    private finished: boolean = false;

    private category: Paginator;

    constructor() {
        this.iframe = $("iframe#beemer-test");
        this.category = this.identity;
        this.render();
    }

    nextCategory() {
        if (this.category === this.identity)
            this.category = this.past;
        else if (this.category == this.past)
            this.category = this.career;
        else if (this.category == this.career)
            this.category = this.sexlife;
        else if (this.category == this.sexlife)
            this.category = this.future;
        else if (this.category == this.future)
            this.category = this.hypothetical;
        else if (this.category == this.hypothetical) {
            this.category = this.results;
            this.finished = true;
        }
    }

    nextQuestion() {

        if (this.category.finished()) {
            this.nextCategory();
            return;
        }

        this.category.nextPage();
    }

    render() {
        const title = this.iframe.append("<p>TEST</p>");
    }
}