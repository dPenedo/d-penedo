---
title: "About data types in JavaScript"
description: "Explanation and examples of data types in JavaScript"
publishDate: "29 Oct 2024"
tags: ["JavaScript", "types"]
---

# Data Types in JavaScript

[JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript), is a weakly typed and dynamic language. Variables can change their type during execution (a feature modified in [TypeScript](https://www.typescriptlang.org/)).

There are two types of data in JavaScript: primitive and non-primitive. Primitives are immutable, meaning their value cannot change once created. In contrast, non-primitive data is mutable, meaning its content can change. Additionally, primitives are stored in static memory (*stack*), while non-primitive data is stored in dynamic memory (*heap*).

## Primitive Data
Primitive data is stored directly in static memory (*stack*). There are **7 types of [primitive data](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures)**:
- **Undefined**: A variable that has not been assigned a value.
- **Null**: An intentional absence of value for an object.
- **Boolean**: Can have a value of true or false.
- **Number**: There are two numeric types: Number and BigInt. Number represents floating-point values and three symbolic values: +Infinity, -Infinity, and NaN ("Not A Number").
- **BigInt**: Can represent integers with arbitrary precision. It is used by adding "n" after the integer or with a constructor.
- **String**: Represents textual data. Strings in JavaScript are immutable.
- **Symbol**: A unique and immutable primitive value that can be used as a property key for an object.

Let's take a look at them and access the types by using the [typeof operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof):

```javascript
// 1. Undefined
let myUndefined; // Declared but not assigned
console.log(typeof myUndefined, myUndefined);
// Output: undefined undefined

// 2. Null
let myNull = null; // Explicit null value
console.log(typeof myNull, myNull);
// Output: object null

// 3. Boolean
let myBoolean = true; // Boolean value
console.log(typeof myBoolean, myBoolean);
// Output: boolean true

// 4. Number
let myInteger = 25; // Integer
let myFloat = 36.6; // Float
console.log(typeof myInteger, myInteger);
// Output: number 25
console.log(typeof myFloat, myFloat);
// Output: number 36.6

// 5. BigInt
let myBigInt = 1234567890123456789012345678901234567890n; // BigInt
console.log(typeof myBigInt, myBigInt);
// Output: bigint 1234567890123456789012345678901234567890n

// 6. String
let myString = "This is dPenedo's Blog!"; // String
console.log(typeof myString, myString);
// Output: string This is dPenedo's Blog!

// 7. Symbol
let mySymbol = Symbol('description'); // Symbol
console.log(typeof mySymbol, mySymbol);
// Output: symbol Symbol(description)
```



## Non-Primitive or Reference Data
Non-primitive or reference data are objects stored in dynamic memory (*heap*). Instead of storing the actual value directly, the variable assigned contains a reference to the location in memory where the object is stored. This means multiple variables can refer to the same object, which can lead to unexpected effects if the object is modified from different places. Reference data includes:
- [JavaScript Objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects): Containers of `key-value` pairs that can be mutable. They are used to store collections of data and complex entities.
- [Arrays in JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array): Technically, they are also objects, storing **collections of ordered data** and allowing access to elements via an index.
- [JavaScript Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions): Objects that store code, being *first-class*, they can be assigned to variables or passed as arguments.

Now let's take a look of them with some examples:
```javascript
// 1. JavaScript Object
let myObject = {
    name: "dPenedo",
    thisBlogRules: true
};// Object with key-value pairs
console.log(typeof myObject, myObject);
// Output: object { name: 'dPenedo', thisBlogRules: true }

// Accessing object properties
console.log(myObject.name); // Output: dPenedo
console.log(myObject['thisBlogRules']); // Output: true

// 2. Array
let myArray = [10, 20, 30, 40]; // Array storing ordered data
console.log(typeof myArray, myArray); // Output: object [10, 20, 30, 40]

// Accessing array elements by index
console.log(myArray[1]); // Output: 20
console.log(myArray.length); // Output: 4

// 3. JavaScript Function
let myFunction = function() { // Function as an object
    return "You are on dPenedo's Blog!";
};
console.log(typeof myFunction, myFunction());
// Output: function You are on dPenedo's Blog!

// Assigning a function to a variable
let anotherFunction = myFunction;
console.log(anotherFunction());
// Output: You are on dPenedo's Blog!
```



- **Dates, Regular Expressions, Errors, etc.**: Language-specific objects that provide additional functionality:
  - **Dates**: Objects used to handle and manipulate dates and times.
    ```javascript
    const now = new Date();
    console.log(now); // Output: current date and time
    ```
  - **Regular Expressions**: Objects used to perform searches and manipulations on strings.
    ```javascript
    const regex = /abc/;
    console.log(regex.test("abcdef")); // Output: true
    ```
  - **Errors**: Objects used to handle exceptions and errors in code.
    ```javascript
    try {
      throw new Error("An error occurred");
    } catch (error) {
      console.log(error.message); // Output: An error occurred
    ```

## Conclusion

Understanding data types in JavaScript is crucial for effective programming, and it can be a little tricky at times. By recognizing the differences between primitive and non-primitive data, developers can manage data more efficiently and avoid common errors. Primitives are straightforward, immutable values that cannot be changed once they are created. This immutability ensures that operations on primitive data types do not inadvertently affect other variables, making them predictable and easy to work with.

In contrast, non-primitive data types like objects, arrays, and functions offer greater flexibility and complexity, allowing the creation of complex data structures and logic. However, this flexibility comes with the risk of unintended side effects, as non-primitive types are mutable and can be altered through references.

It's worth considering how TypeScript enhances this topic. TypeScript adds a layer of type safety and static typing to JavaScript, making it easier to identify and resolve type-related errors during development. By enforcing strict type definitions, TypeScript helps developers maintain a clearer understanding of their data structures and reduces the likelihood of bugs associated with type coercion in JavaScript.

Ultimately, a solid grasp of data types, their characteristics, and how they behave in both JavaScript and TypeScript will empower you to write cleaner, more robust code and enable you to take full advantage of the features available in modern web development.

W
