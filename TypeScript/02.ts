// Creating variable for my favorite fruit and printing it
let fruit: string = "Banana";
console.log(`My favorite fruit is ${fruit}`);






// This is the function to double the given number
function doubleIt(num: number): void {
  console.log(`2 times of the ${num} is ${num * 2}`);
}
// Calling the doubleIt function
doubleIt(3);
doubleIt(34);






/* This is the class Person
 * with
 * the sayHello method which greets everyone
 */
class Person {
  sayHello() {
    console.log("Hello everyone...");
  }
}

/* Making object of the Person class and
 * calling sayHello method
 */
let person = new Person();
person.sayHello();
