export class Order {
    makePizzaOrder(customer, pizzasOrdered, orderTime, promoCode){
        this.customer = new Customer (customer);
        this.pizzasOrdered = pizzasOrdered;
        this.orderTime = orderTime;
        this.promoCode = promoCode;
        this.addBirthdayPizzaIfBirthday();
        return (true);
    }
    calculateOrderAmount(){
        let result = 0;
        for (let _pizza in this.pizzasOrdered) {
            result += this.pizzasOrdered[_pizza].quantity * Pizza[_pizza].price;
        }
        return (this.makeDayTimeDiscount(result) - this.calculatePromoDiscount(this.promoCode));
    }
    addBirthdayPizzaIfBirthday(){
        if (this.customer.isBirthday()) {this.pizzasOrdered.Sweet = { quantity : 1 }};
    }
    calculatePromoDiscount(promoCode){
        return (typeof PromoCodes[promoCode] === "undefined") ? 0 : PromoCodes[promoCode].discount;

    }
    checkDayTimeDiscount() {
        let quantity = 0;
        for (let _pizza in this.pizzasOrdered) {
            quantity += this.pizzasOrdered[_pizza].quantity;
        }
        return (quantity >= 2 && 10 < this.orderTime.substr(0, 2) && 15 >= this.orderTime.substr(0, 2)) ? true : false;
    }
    makeDayTimeDiscount(amount){
        return this.checkDayTimeDiscount() ? amount * 0.8 : amount;
    }
    payWithBonus(){
        return this.customer.bonusAccount >= this.calculateOrderAmount() ? true : false;
    }


}

export class Customer {
    constructor(data){
        this.name = data.name;
        this.birthday = data.birthday;
        this.bonusAccount = data.bonusAccount;
    };
    isBirthday() {
        let _date = new Date();
        return ((_date.getDate() + "." +  (_date.getMonth() + 1)) === this.birthday) ? true : false;
    };
    addBonus (amount){
        this.bonusAccount += amount * 0.05;
        return this.bonusAccount;
    }
}

let Pizza = {
    "Margarita" : {"price" : 100},
    "Pepperoni" : {"price" : 250},
    "HamAndCheese" : {"price" : 200},
    "Sweet" : {"price" : 0}
};

let PromoCodes = {
    "ABCD":   {"discount" : 100}
};