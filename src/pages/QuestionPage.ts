import Page from "../Page";
import { QuestionType } from "../Question";


export default class QuestionPage extends Page {

    private _category: string = "";
    private _pageNumber: number = 0;
    private prevCallback: any;
    private nextCallback: any;

    private type: QuestionType;
    private question: string;
    private answer: any | null;

    constructor(question: string, questionType: QuestionType) {
        super("Question");
        this.type = questionType;
        this.question = question;

        this.html = `
        <h1 class="questionCategory"></h1>
        <h2 class="questionNumber"></h2>
        <p>${question}</p>
        <button class="previousQuestion">Prev.</button>
        <button class="skipQuestion">Skip</button>`;
    }

    private updatePageName() {
        this.name = this._category + " Question " + this._pageNumber;
    }

    category(category: string) : QuestionPage {
        this._category = category;
        this.updatePageName();
        return this;
    }

    number(pageNumber: number) : QuestionPage {
        this._pageNumber = pageNumber;
        this.updatePageName();
        return this;
    }

    onNextQuestion(nextCallback: any) : QuestionPage {
        this.nextCallback = nextCallback;
        return this;
    }

    onPrevQuestion(prevCallback: any): QuestionPage {
        this.prevCallback = prevCallback;
        return this;
    }

    postRender() {
        $("h1.questionCategory").text(this._category);
        $("h2.questionNumber").text("Question " + this._pageNumber);
        $("button.skipQuestion").on('click', this.nextCallback);
        $("button.prevQuestion").on('click', this.prevCallback);
    }
}