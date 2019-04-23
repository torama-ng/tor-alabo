// Object Literals
			// const client = {
			// name:'Alabo',
			// 	balance:1000,
			// 	membership: function() {
			// 		letname;
			// 		if(this.balance >1000){
			// 		name = 'Gold'
			// 		}else if(this.balance>500){
			// 		name = 'Platinum'
			// 		}else{
			// 		name = 'Normal'
			// 		}
			// 		returnname;
			// 	}
			// }
			// console.log(Client.name)

// Object Constructor
			// function Client(name, balance){
			// 	this.name = name;
			// 	this.balance = balance;
			// 	this.membership = function(){
			// 		let name;
			// 		if(this.balance > 1000){
			// 			name = 'Gold';
			// 		}else if(this.balance > 500){
			// 			name = 'Platinum';
			// 		}else{
			// 			name = 'Normal';
			// 		}
			// 		return name;
			// 	}
			// }

			// const person = new Client('Timi', 10000);
			// const person2 = new Client('Favour', 1000)
			// const person3 = new Client('Ebidemie', 800)  
			// console.log(person)
			// console.log(person.membership() )
			// console.log(person2)
			// console.log(person2.membership() )
			// console.log(person3)
			// console.log(person3.membership() )

// Constructors for Data Types

	// String Comparison in Object Oriented Javascript

			// const name1 = 'Amaebi';
			// const name2 = new String('Amaebi')
			// console.log(typeof name1)
			// console.log(typeof name2)

	// Constructors for Numbers

			// const num = 40;
			// const num2 = new Number(50)
			// console.log(typeof num, typeof num2)

	// Constructors for Booleans

			// const bool = true;
			// const bool2 = new Boolean(false)
			// console.log(bool, bool2)

	// constructor for Functions

			// const function1 = function(a,b){return a ** b;}
			// const function2 = new Function('a','b', 'return a * b'); 
			// console.log(typeof function1(3,6))
			// console.log(typeof function2(4,6))

	// Constructors with Objects
			// const person = {name: 'Layefa'};
			// const person1 = new Object({name:'Layefa Ogidi'});
			// console.log(typeof person)
			// console.log(typeof person1);

// Constructors for Arrays

			// const array1 = [1,2,3,4,5,6];
			// const array2 = new Array(1,2,3,4,5,6,7,8,9);
			// console.log(typeof array1)
			// console.log(typeof array2)

// Prototypes in Object Oriented Pragramming
			function Client(name, balance){
							this.name = name;
							this.balance = balance;
							
						}
// Seperating the Methods from the Constructor Object
	Client.prototype.membership = function(){
		let name;
		if(this.balance > 1000){
			name = 'Gold';
		}else if(this.balance > 500){
			name = 'Platinum';
		}else{
			name = 'Normal';
		}
		return name;
	}
// Method to Get Client Info
	Client.prototype.clientInfo = function(){
		return `Name: ${this.name}, Balance: $${this.balance}, Membership: ${this.membership()} `
	}

// Method to Withdraw from the Account
       Client.prototype.withdraw = function(amount){
		   this.balance -= amount;
	   }
// Method to Deposit from the Account
    Client.prototype.deposit = function(amount){
		this.balance += amount;
	}
//	Method to Check  the Balance
  Client.prototype.getBalance = function(){
		return this.balance;
  }
				// const person = new Client('Timi', 10000);
				// const person2 = new Client('Favour', 1000)
				// person.deposit(2000)
				// console.log(person.getBalance())
	// 			console.log(person.clientInfo())
	// 			console.log(person2.clientInfo())

// Create a Business constructor and Inherit name and balance from the Client Object
				// function Business(name,balance, phone, category){
				// 	// Inheriting properties from the Client object
				// 	Client.call(this, name, balance);
				// 	// The actual Business object Properties
				// 	this.phone = phone;
				// 	this.category = category;
				// }
				
				
// Inherit the Prototypes
// Business.prototype = Object.create(Client.prototype);

// Return the Constructor as Business
// Business.prototype.constructor = Business;

// Method to Get Business Info
// Business.prototype.bizInfo = function(){
// 	return `Name: ${this.name}, 
// Balance: $${this.balance}, 
// Membership: ${this.membership()},
// Category: ${this.category},
// Phone: ${this.phone} `
// }
// Create a Business
// const business = new Business(
// 	'Asoft Solutions', 
// 9000000000, '08156211847', 
// 'Consultancy and Logistics')
				 
// console.log(business.bizInfo())

// Object Create

// const user = {
// 	getBal: function(){
// 		return `Hello ${this.name}, your balance is $${this.balance}`
// 	},
// 	withdraw: function(amount){
// 		return this.balance -= amount;
// 	}
// }
// Create a new Object and give a balance
// const dozie = Object.create(user);

// Attach the properties
// dozie.name = 'Dozie';
// dozie.balance = 200000;

// console.log(typeof dozie)
// console.log(dozie.getBal())
// dozie.withdraw(45382)
// console.log(dozie.getBal())

// ES6 way of creating Object Constructors using the class keyword
class User {
	// To the constructor
	constructor(name, balance){
		this.name =name;
		this.balance = balance;
	}
	membership(){
		let name;
		if(this.balance >1000){
		name = 'Gold'
		}else if(this.balance>500){
		name = 'Platinum'
		}else{
		name = 'Normal'
		}
		return name;
	}
	userInfo(){
		return `Name: ${this.name}, 
		Balance: $${this.balance}, 
		Membership: ${this.membership()} `

	}
	deposit(amount){
		return this.balance += amount;
	}
	withdraw(amount){
	 return	this.balance -= amount;
	}
	getBalance(){
		return this.balance;
	}
	 welcome() {
	return `Hi ${this.name}, welcome Trader Soft`;
	}
}
// Inheritance in ES6
class Business extends User {
	constructor(name, balance, phone, category){
		super(name, balance)
		this.phone = phone;
		this.category = category;
	}
	// Over writting 
	userInfo(){
		return `Name: ${this.name}, 
		Balance: $${this.balance}, 
		Membership: ${this.membership()},
		Category: ${this.category},
		Phone: ${this.phone}  `

	}

	// Static Method Doesn't Require Instantiation. 
	/* the above comment because i was 
	playing with the static keyword  */
	 welcome() {
		return 'Hi welcome to Asoft Technologies';
	}

}
// Create new User
const Bee = new User('Bee', 120);
Bee.deposit(6000)
console.log(Bee.userInfo())
console.log(Bee.welcome())

// Instantiate the subclass
const business = new Business('Asoft ICT Services', 45378894, '07038067136', 'Programming, Software, Digital Marketing')

console.log(business.userInfo())
console.log(business.welcome())