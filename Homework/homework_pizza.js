// Клиент может заказать пиццу на сайте
// Если у клиента день рождения, ему полагается специальная сладкая пицца
// При вводе промокода "ABCD", скидка 100 рублей
// При заказе 2х пицц с 10:00 по 16:00 скидка 20%
// 5% от заказа на бонусный счет
// Для оплаты заказа можно использовать средства с бонусного счета

////Тесты////////////////////////////////////////////////
var assert = require('assert');

suite('When I order pizza', function() {
    suite('I ordered pizza', function () {
        test('Order received', function () {
            let order = new Order;
            let pizzasOrdered = {"HamAndCheese" : {quantity: 1}};
            let orderReceived = order.makePizzaOrder("", pizzasOrdered, "", "");

            assert.equal(orderReceived, true);
        })
    });
    suite('It is my Birthday', function() {
        test('Sweet pizza added', function(){
            let order = new Order;
            let pizzasOrdered = {};
            let _date = new Date;
            let today = _date.getDate() + "." +  (_date.getMonth() + 1)
            let customer = {"birthday": today};
            order.makePizzaOrder(customer, pizzasOrdered, "", "");
            assert.equal(pizzasOrdered["Sweet"].quantity, 1)
        })
    });
    suite('Promo code ABCD entered', function() {
        test('Discount 100 received', function(){
            let order = new Order;
            let pizzasOrdered = {"HamAndCheese" : {quantity: 1}};
            order.makePizzaOrder("", pizzasOrdered, "", "ABCD");
            assert.equal(order.calculateOrderAmount(), 100);
        })
    });
    suite('Random promo code entered', function() {
        test('Discount NOT received', function(){
            let order = new Order;
            let pizzasOrdered = {"HamAndCheese" : {quantity: 1}};
            order.makePizzaOrder("", pizzasOrdered, "", "ABCDaasdas");
            assert.equal(order.calculateOrderAmount(), 200);
        })
    });
    suite('I order two pizzas between 10 and 16', function() {
        test('Discount 20% received', function(){
            let order = new Order;
            let pizzasOrdered = {"HamAndCheese" : {quantity: 2}};
            let discountTime = "15:45"
            order.makePizzaOrder("", pizzasOrdered, discountTime, "");
            assert.equal(order.calculateOrderAmount(), 320);
        })
    });
    suite('Bonus points added', function() {
        test('Added 5% of amount', function(){
            let _customer = {"bonusAccount" : 0};
            let customer = new Customer(_customer);
            let orderAmount = 1000;
            let bonusPointsReceived = customer.addBonus(orderAmount);
            let bonusPointyExpected = orderAmount * 0.05;
            assert.equal(bonusPointsReceived, bonusPointyExpected);
        })
    });
    suite('I want to pay with bonus points', function() {
        test('Order payed with bonus points', function(){
            let order = new Order;
            let pizzasOrdered = {"HamAndCheese" : {quantity: 1}};
            let customer = {"bonusAccount" : 200};
            order.makePizzaOrder(customer, pizzasOrdered, "", "");
            assert(order.payWithBonus());
        })
    });
    suite('I do NOT have enough bonus points', function() {
        test('Order NOT payed with bonus points', function(){
            let order = new Order;
            let pizzasOrdered = {"HamAndCheese" : {quantity: 1}};
            let customer = {"bonusAccount" : 0};
            order.makePizzaOrder(customer, pizzasOrdered, "", "");
            assert(!order.payWithBonus());
        })
    });

})






////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
let Pizza = {
    "Margarita" : {"price" : 100},
    "Pepperoni" : {"price" : 250},
    "HamAndCheese" : {"price" : 200},
    "Sweet" : {"price" : 0}
};

let PromoCodes = {
    "ABCD":   {"discount" : 100}
};

class Order {
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
    addBonus (amount){
        this.bonusAccount += amount * 0.05;
        return this.bonusAccount;
    }
}

