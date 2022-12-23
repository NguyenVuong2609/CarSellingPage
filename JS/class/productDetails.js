export class Product {
    constructor(name, img, price, id, group, quantity) {
        this.name = name;
        this.img = img;
        this.price = price;
        this.id = id;
        this.group = group;
        this.quantity = quantity;
    }
    getName(){
        return this.name;
    }
    setName(name){
        return this.name = name;
    }
    getImg(){
        return this.img;
    }
    setIMG(img){
        return this.img = img;
    }
    getPrice(){
        return this.price;
    }
    setPrice(price){
        return this.price = price;
    }
    getID(){
        return this.id;
    }
    setID(id){
        return this.id = id;
    }
    getGroup(){
        return this.group;
    }
    setGroup(group){
        return this.group = group;
    }
    getQuantity(){
        return this.quantity;
    }
    setQuantity(quantity){
        return this.quantity = quantity;
    }
}