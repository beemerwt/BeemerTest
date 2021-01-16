import Page from "../Page";


export default class ResultsPage extends Page {

    private results: number;

    constructor(results: number) {
        super("Results");
        this.results = results;
    }
}