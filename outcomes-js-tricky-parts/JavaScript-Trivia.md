## 1. What is a potential pitfall with using typeof bar === "object" to determine if bar is an object? How can this pitfall be avoided?

- bar and "object" are objects, so === returns true. this may not be desired answer, null is considered and object

## 2. What will the code below output to the console and why?

- the line is shorthand for ` b = 3, var a=b` b is declared in global scope it does not have var let const, b becomes global variable. `var a = b` "a" is declared locally "a" can not be accessible outsid the function.

```javascript
a defined? false
b defined? true
```

## 3. What will the code below output to the console and why?

```
outer func:  this.foo = bar
outer func:  self.foo = bar
inner func:  this.foo = undefined
inner func:  self.foo = bar

```
