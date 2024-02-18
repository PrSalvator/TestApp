export class Image{
    public src: string;
    public name: string;

    constructor(src:string, name:string = "unknown"){
        this.name = name;
        this.src = src
    }
}