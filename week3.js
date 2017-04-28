// NOTES
// There is no notion of a "server" in any of the below code, so this example
// is meant to run locally (in the integrated terminal) without a server
// to run this example, simply type "node week3.js" into the terminal

// Uncomment each function to see the example:

/////////////////////
// Code Examples
/////////////////////

//showObjectLiteralNotation();
//showFunctionClosures();
//showFunctionConstructor();
//showThisKeyword();
//showPrototypalInheritance();
//showVarLetConst();
//showExceptionHandling();
//showChainingPromises();
//showArrowFunctions();
showLexicalThis();

/////////////////////
// Example Functions:
/////////////////////

function showObjectLiteralNotation() {

    console.log("\n-----------------------");
    console.log("Object Literal Notation");
    console.log("-----------------------\n");

    // Create an "architect" object using 
    // "Object Literal" notation

    var architect = {
        name: "Joe",
        age: 34,
        occupation: "Architect",
        setAge: function (newAge) { this.age = newAge },
        setName: function (newName) { this.name = newName }
    };

    // Create two new architect objects, using "architect"
    // as their prototype

    var architect1 = Object.create(architect);
    var architect2 = Object.create(architect);

    // Call the 'setName' method on Architect2

    architect2.setName("Mary");

    console.log("architect1.name: " + architect1.name);
    console.log("architect2.name: " + architect2.name);

}

function showFunctionClosures() {

    console.log("\n-----------------------");
    console.log("Function Closures");
    console.log("-----------------------\n");

    function counter() {
        var localCounter = 0; // declare "localCounter" within the "counter()" function scope

        return function () { // return a new function that references "localCounter"
            localCounter++; // increment it by 1
            return localCounter; // return the value of "localcounter"
        };

    }

    // call the counter() function and get a reference to the new function
    var count = counter();

    // call the new function

    console.log("count(): " + count());
    console.log("count(): " + count());
    console.log("count(): " + count());

    function architect(setName, setAge) {
        var name = setName;
        var age = setAge;
        var occupation = "architect";
        return {
            setName: function (newName) { name = newName },
            setAge: function (newAge) { age = newAge },
            getName: function () { return name },
            getAge: function () { return age }
        }
    }

    var architect1 = architect("Joe", 34);
    var architect2 = architect("Mary", 49);

    console.log("architect1.name: " + architect1.name);

    console.log("architect1.getName(): " + architect1.getName());
    console.log("architect2.getName(): " + architect2.getName());
}

function showFunctionConstructor() {

    console.log("\n-----------------------");
    console.log("Function Constructor");
    console.log("-----------------------\n");

    // Declare a function to initialize our "new" object with
    // properties (ie: "objectProperty")
    function myObjectInitializer(initialVal) {
        this.objectProperty = initialVal;
    }

    // add methods (ie: "objectMethod") to the myObjectInitializer function prototype
    myObjectInitializer.prototype.objectMethod = function () { return this.objectProperty };

    // create a new object and initialize the objectProperty with the value "Hello"
    var myObject = new myObjectInitializer("Hello");

    // execute the "objectMethod" on the new object
    console.log("myObject.objectMethod(): " + myObject.objectMethod());

    function architect(setName, setAge) {
        this.name = setName;
        this.age = setAge;
        this.occupation = "architect";
    }

    architect.prototype.setName = function (newName) { this.name = newName };
    architect.prototype.setAge = function (newAge) { this.age = newAge };
    architect.prototype.getName = function () { return this.name };
    architect.prototype.getAge = function () { return this.age };

    var architect1 = new architect("Joe", 34);
    var architect2 = new architect("Mary", 49);

    console.log("architect1.name: " + architect1.name);
    console.log("architect1.getName()): " + architect1.getName());
    console.log("architect2.getName(): " + architect2.getName());
}

function showThisKeyword() {

    console.log("\n-----------------------");
    console.log("'this' Keyword");
    console.log("-----------------------\n");

    function architect(setName, setAge) {
        this.name = setName;
        this.age = setAge;
        this.occupation = "architect";
    }

    architect.prototype.setName = function (newName) { this.name = newName };
    architect.prototype.setAge = function (newAge) { this.age = newAge };
    architect.prototype.getName = function () { return this.name };
    architect.prototype.getAge = function () { return this.age };

    var architect1 = new architect("Joe", 34);
    var architect2 = new architect("Mary", 49);

    architect.prototype.outputNameDelay = function () {
        setTimeout(function () {
            console.log(this.name);
        }, 1000);
    }

    architect2.outputNameDelay();

    architect.prototype.outputNameDelayFixed = function () {
        var that = this;
        setTimeout(function () {
            console.log(that.name);
        }, 1000);
    };

    architect2.outputNameDelayFixed();
}

function showPrototypalInheritance() {

    console.log("\n-----------------------");
    console.log("Prototypal Inheritance");
    console.log("-----------------------\n");

    function architect(setName, setAge) {
        this.name = setName;
        this.age = setAge;
        this.occupation = "architect";
    }

    architect.prototype.setName = function (newName) { this.name = newName },
        architect.prototype.setAge = function (newAge) { this.age = newAge },
        architect.prototype.getName = function () { return this.name },
        architect.prototype.getAge = function () { return this.age }

    var architect1 = new architect("Joe", 34);
    var architect2 = new architect("Mary", 49);

    architect.prototype.newMethod = function () {
        return "Hello: " + this.name;
    };

    console.log("architect2.newMethod(): " + architect2.newMethod());
}

function showVarLetConst() {

    console.log("\n-----------------------");
    console.log("var vs. let vs. const");
    console.log("-----------------------\n");

    for (var i = 0; i < 5; i++) {
        // ...
    }

    console.log("using var: " + typeof i);

    for (let j = 0; j < 5; j++) {
        // ...
    }

    console.log("using let: " + typeof j);

    for (const k = 0; k < 5; k++) { // TypeError: Assignment to constant variable.
        // ...
    }

    console.log("using const: " + typeof k);
}

function showExceptionHandling() {

    console.log("\n-----------------------");
    console.log("Exception Handling");
    console.log("-----------------------\n");

    // Using built in functionality

    let x = 30, y = 0;

    let z = x / y;

    if (isFinite(z)) {
        console.log("success! " + x + "/" + y + "=" + z);
    } else {
        console.log(x + " is not divisible by " + y);
    }

    // Using try, catch & finally to catch an exception

    const PI = 3.14159;

    console.log("trying to change PI!");

    try {
        PI = 99;
    } catch (ex) {
        console.log("uh oh, an error occurred: " + ex.message);
        // outputs: uh oh, an error occurred: Assignment to constant variable.
    } finally {
        console.log("always execute code in this block");
    }

    console.log("Alas, it cannot be done, PI remains: " + PI);

    // throw and catch a with a custom error

    function divide(x, y) {
        if (y == 0) {
            throw new Error("Division by Zero!");
        }
        return x / y;
    }

    let a = 3, b = 0, c;

    try {
        c = divide(a, b);
    } catch (ex) {
        console.log("uh oh, an error occurred: " + ex.message);
        c = NaN;
    }

    console.log(a + " / " + b + " = " + c);
}


function showChainingPromises() {

    console.log("\n-----------------------");
    console.log("Chaining Promises");
    console.log("-----------------------\n");

    // output "A" after a random time between 0 & 3 seconds
    function outputA() {

        var randomTime = Math.floor(Math.random() * 3000) + 1;

        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                console.log("A");
                resolve("outputA() complete");
            }, randomTime);
        });
    }

    // output "B" after a random time between 0 & 3 seconds
    function outputB(msg) {
        // NOTE: msg holds the 'resolve' message from the 
        // previous function in the chain
        var randomTime = Math.floor(Math.random() * 3000) + 1;

        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                console.log("B");
                resolve("outputB() complete");
                //reject("outputB() failed"); // test "rejecting"
            }, randomTime);
        });
    }

    // output "C" after a random time between 0 & 3 seconds
    function outputC(msg) {
        // NOTE: msg holds the 'resolve' message from the 
        // previous function in the chain
        var randomTime = Math.floor(Math.random() * 3000) + 1;

        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                console.log("C");
                resolve("outputA() complete");
            }, randomTime);
        });
    }

    // invoke the functions in order

    outputA()
        .then(outputB)
        .then(outputC)
        .catch(function (rejectMsg) {
            // catch any errors here
            console.log(rejectMsg);
        });
}


function showArrowFunctions() {

    console.log("\n-----------------------");
    console.log("Arrow Functions");
    console.log("-----------------------\n");

    var outputMessage = function () {
        console.log("Hello Function Expression");
    };

    // is the same as:

    var outputMessageArrow = () => console.log("Hello Arrow Function");

    // invoke each function to see the result

    outputMessage();
    outputMessageArrow();
}

function showLexicalThis() {

    console.log("\n-----------------------");
    console.log("'Lexical This' with Arrow Functions");
    console.log("-----------------------\n");

    function architect(setName, setAge) {
        this.name = setName;
        this.age = setAge;
        this.occupation = "architect";
    }

    architect.prototype.setName = function (newName) { this.name = newName };
    architect.prototype.setAge = function (newAge) { this.age = newAge };
    architect.prototype.getName = function () { return this.name };
    architect.prototype.getAge = function () { return this.age };

    var architect1 = new architect("Joe", 34);
    var architect2 = new architect("Mary", 49);

    architect.prototype.outputNameDelay = function () {
        setTimeout(() => { console.log(this.name); }, 1000);
    };

    architect2.outputNameDelay();
}

