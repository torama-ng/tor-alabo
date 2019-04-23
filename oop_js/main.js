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
				const person = new Client('Timi', 10000);
				const person2 = new Client('Favour', 1000)
				person.deposit(3000)
				console.log(person.getBalance())
				console.log(person.clientInfo())
	// 			console.log(person2.clientInfo())
				

//
				