// Клиент может заказать пиццу на сайте
// Если у клиента день рождения, ему полагается специальная сладкая пицца
// При вводе промокода "ABCD", скидка 100 рублей
// При заказе 2х пицц с 10:00 по 16:00 скидка 20%
// 5% от заказа на бонусный счет
// Для оплаты заказа можно использовать средства с бонусного счета

import assert from 'assert'
import {Order, Customer} from '../src/Pizza'

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
            let bonusPointsExpected = orderAmount * 0.05;
            customer.addBonus(orderAmount);
            assert.equal(customer.bonusAccount, bonusPointsExpected);
        })
    });
    suite('I want to pay with bonus points', function() {
        suite('I have enough points', function() {
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
    });

})