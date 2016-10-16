// Клиент может заказать пиццу на сайте
// Если у клиента день рождения, ему полагается специальная сладкая пицца
// При вводе промокода "ABCD", скидка 100 рублей
// При заказе 2х пицц с 10:00 по 16:00 скидка 20%
// 5% от заказа на бонусный счет
// Для оплаты заказа можно использовать средства с бонусного счета

let Pizza = {
    "Margarita" : {"price": 100},
    "Pepperoni" : {"price": 250},
    "HamAndCheese" : {"price": 200},
    "Sweet" : {"price" : 0}
};

class Order {
    makePizzaOrder(customer, pizzasOrdered, orderTime, promoCode){
        this.customer = new Customer (customer);
        this.pizzasOdered = pizzasOrdered;
        this.orderTime = orderTime;
        this.promoCode = promoCode;
        return (true);
    }
    calculateOrderAmount(){
        let result = 0;
        for (let _pizza in pizzasOrdered) {
            result += pizzasOrdered[_pizza].quantity * Pizza[_pizza].price;
        }
       return (result);
    }
    addBirthdayPizzaIfBirthday(){
        if (this.customer.isBirthday()) {pizzasOrdered.Sweet = { quantity : 1 }};
    }
}

class Customer {
    constructor(data){
        this.name = data.name;
        this.birthday = data.birthday;
        this.bonusAccount = data.bonusAccount;
    };
    isBirthday() {
        let _date = new Date();
        return ((_date.getDate() + "." +  (_date.getMonth() + 1)) === this.birthday) ? true : false;
    };
}


let order = new Order;
let pizzasOrdered = {
    "Margarita" : {quantity: 2},
    "Pepperoni" : {quantity: 1},
    "HamAndCheese" : {quantity: 1}
};

let customer = {
    "name": "Ivan",
    "birthday": "16.10",
    "bonusAccount" : "500"
};

order.makePizzaOrder(customer, pizzasOrdered, "16:45");
order.addBirthdayPizzaIfBirthday();
console.log("Amount: " + order.calculateOrderAmount() + "\nOrder Time: " + order.orderTime);
