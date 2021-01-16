import Page from "../Page";


export default class QuestionPage extends Page {

    private _category: String = "";
    private _pageNumber: number = 0;

    constructor() {
        super("Question");
    }

    category(category: String) : QuestionPage {
        this._category = category;
        this.updatePageName();
        return this;
    }

    number(pageNumber: number) : QuestionPage {
        this._pageNumber = pageNumber;
        this.updatePageName();
        return this;
    }

    updatePageName() {
        this.name = this._category + " Question " + this._pageNumber;
    }
}