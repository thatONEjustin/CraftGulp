export class Greeter {
    private greetWith;
    constructor(str) {
        this.greetWith = str;
    }

    say() {
        return this.greetWith;
    }
}