

export default class Page {

    name: string;
    private _html: string;

    constructor(name: string) {
        this.name = name;
        this._html = "";
    }

    set html(html: string) { this._html = html; }
    get html(): string { return this._html; }

    preRender() {}
    postRender() {}

    render(html: JQuery<HTMLDivElement>) {
        this.preRender();
        //html.empty();
        html.html(this.html);
        this.postRender();
    }
}