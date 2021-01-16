import Page from "../Page"


export default class WelcomePage extends Page {

    private beginCallback: any;

    constructor() {
        super("Welcome");
        this.html = `<h1>Welcome to the Beemer Test!</h1>
        <p>Welcome! This test will measure the level of "Beemer" you are. You will be given a percentage result based on how similar you are to Beemer,
        along with a short analysis of what it should mean to be around your resulting percentage.<br />Click the start button below to begin!</p>
        <button id="startButton">Start</button>`;
    }

    onBeginClicked(callback: any): WelcomePage {
        this.beginCallback = callback;
        return this;
    }

    preRender() {

    }

    postRender() {
        $("button#startButton").on('click', this.beginCallback);
    }
}