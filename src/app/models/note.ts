import { Image } from "./image";

export class Note{
    public userId : string;
    public date: Date;
    public header: string;
    public text: string;
    public images: Image[];
    public id: string = "";
    constructor(userId:string, date:Date, header:string, text:string, images:Image[]){
        this.userId = userId;
        this.date = date;
        this.header = header;
        this.text = text;
        this.images = images;
    }
}