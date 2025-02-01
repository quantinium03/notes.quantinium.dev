---
id: Functional
aliases: []
tags: []
title: Functional
---

Rust ❤️  Haskell

## Closures
Closures are anonymous functions that can capture variables from their surrounding environment and help us define inline functions.

They don't require us to annotate the types of the parameters or the return value like `fn` functions do. Since they are typically short and are relevant only within a narrow context rather than in any arbitrary scenario, we don't need to explicitly tell the interface we wanna expose the user to as we do in functions.

We can still add type annotation if we feel like tho.
```rust
let expensive_closure = |num: u32| -> u32 {
    println!("calculating slowly...");
    thread::sleep(Duration::from_secs(2));
    num
};
```

Some reference how closures and functions are similar.
```rust
fn  add_one_v1   (x: u32) -> u32 { x + 1 }
let add_one_v2 = |x: u32| -> u32 { x + 1 };
let add_one_v3 = |x|             { x + 1 };
let add_one_v4 = |x|               x + 1  ;
```

The compiler while compiling assigns the type to the variable and are therefore locked. If we call the closure with a `String` at first, the compiler annotates the type of `String` to the variable in closure and will give an error if the same closure is called with some other data type.

```rust
let example_closure = |x| x;

let s = example_closure(String::from("hello"));
let n = example_closure(5); // this will give an error.
```

### Capturing references and moving ownership
Similar to how we pass variables to functions: borrowing immutably, borrowing mutably and taking ownership, the closures will decide which of these to use based on what body of the function does to the captured values.

- Borrowing immutably
```rust
fn main() {
    let list = vec![1, 2, 3];
    println!("Before defining closure: {list:?}");

    let only_borrows = || println!("From closure: {list:?}");

    println!("Before calling closure: {list:?}");
    only_borrows();
    println!("After calling closure: {list:?}");
}
```
here the closures only borrows the vector for printing, therefore it is passed as immutable references.

- Borrowing mutably
```rust
fn main() {
    let mut list = vec![1, 2, 3];
    println!("Before defining closure: {list:?}");

    let mut borrows_mutably = || list.push(7);

    borrows_mutably();
    println!("After calling closure: {list:?}");
}
```
here the closure takes a mutable reference to the vector cause we push an int into the vector.

- Taking ownership
We can give ownership of something to the closure by using the `move` keyword.
```rust
use std::thread;

fn main() {
    let list = vec![1, 2, 3];
    println!("Before defining closure: {list:?}");

    thread::spawn(move || println!("From thread: {list:?}"))
        .join()
        .unwrap();
}
```
This is helpful when we have to pass a closure to a new thread to move the data so that it's owned by the new thread.

### Moving captured values out of closure
A closure body can do any of the following: move a captured value out of the closure, mutate the captured value, neither move nor mutate the value, or capture nothing from the environment to begin with.

The way a closure captures and handles values from the environment affects which traits the closure implements, and traits are how functions and structs can specify what kinds of closures they can use. Closures will automatically implement one, two, or all three of these Fn traits, in an additive fashion, depending on how the closure’s body handles the values:
- `FnOnce` applies to closures that can be called once. All closures implement at least this trait, because all closures can be called. A closure that moves captured values out of its body will only implement `FnOnce` and none of the other `Fn` traits, because it can only be called once.
- `FnMut`  applies to closures that don’t move captured values out of their body, but that might mutate the captured values. These closures can be called more than once.
- `Fn` applies to closures that don’t move captured values out of their body and that don’t mutate captured values, as well as closures that capture nothing from their environment. These closures can be called more than once without mutating their environment, which is important in cases such as calling a closure multiple times concurrently.


