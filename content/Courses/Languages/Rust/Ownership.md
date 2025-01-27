Ownership is Rust's way of managing memory safety without a garbage collector. It enforces strict rules at compile time to ensure memory safety, prevent data races, and eliminate common bugs like null pointer dereferencing or use-after-free errors.
### Stack and Heap
The stack and heap are two regions of memory used for different purposes in a program. They differ in how memory is allocated, accessed, and managed.

#### Stack - 
- **Structure**: The stack is a LIFO (Last-In, First-Out) data structure. It grows and shrinks automatically as functions are called and return.
- **Allocation**: Memory is allocated in a contiguous block. Each function call creates a new stack frame, which contains local variables, function parameters, and return addresses.
- **Speed**: Extremely fast because memory allocation and deallocation are just pointer adjustments.
- **Size**: Limited in size (typically a few MB per thread).
- **Lifetime**: Memory is automatically reclaimed when a function returns (its stack frame is popped).
- **Use Case**: Ideal for small, fixed-size data with predictable lifetimes (e.g., local variables, function arguments).

```rust
fn main() {
    let x = 5; // `x` is stored on the stack
    let y = 10; // `y` is stored on the stack
    let sum = add(x, y); // Function call creates a new stack frame
    println!("Sum: {}", sum);
}

fn add(a: i32, b: i32) -> i32 {
    a + b // `a` and `b` are stored on the stack
}
```
#### Heap - 
- **Structure**: The heap is a more flexible memory region where data can be allocated and freed in any order.
- **Allocation**: Memory is allocated dynamically at runtime. You request a block of memory of a specific size, and the memory manager finds a suitable spot.
- **Speed**: Slower than the stack because it involves finding and managing memory blocks.
- **Size**: Much larger than the stack (limited by available system memory).
- **Lifetime**: Memory must be explicitly allocated and deallocated (or managed by a garbage collector or ownership system, as in Rust).
- **Use Case**: Ideal for data with dynamic size or unpredictable lifetimes (e.g., strings, collections, or large objects).

```rust
fn main() {
    let s = String::from("hello"); // `s` is stored on the heap
    println!("{}", s);
}
```
###  The Three Rules of Ownership
- **Each value in Rust has a single owner.** - 
	- At any given time, a piece of data is owned by exactly one variable.
	- When the owner goes out of scope, the value is dropped (memory is freed).
- **There can only be one owner at a time.**
	- If you assign a value to another variable or pass it to a function, the ownership is _moved_. The original owner no longer has access to the value.
- **Ownership can be borrowed, but with strict rules.** - 
	- Instead of transferring ownership, you can create references to the value. These references can be either:
		- **Immutable references (`&T`)**: Multiple immutable references are allowed, but no mutable references can exist simultaneously.
		- **Mutable references (`&mut T`)**: Only one mutable reference is allowed at a time, and no immutable references can coexist.


### Variable Scope
Variable scope refers to the region of code where a variable is valid and can be accessed. It is defined by where the variable is declared and how long it lives in memory.

- Block Scope 
```rust
{   // s is not valid here, it’s not yet declared 
	let s = "hello"; // s is valid from this point forward 
	// do stuff with s 
} 
// this scope is now over, and s is no longer valid
```

### String Type
- **String Literals vs. `String` Type**
    - **String literals**: Immutable, hardcoded text stored in the program's binary.
    - **`String` type**: Mutable, dynamically allocated on the heap, and can store text of unknown size at compile time (e.g., user input).
- **Creating a `String`**  
	- Use the `String::from` function to create a `String` from a string literal:
```rust
let s = String::from("hello");
```
- - **Ownership and Heap Memory**
    - The `String` type owns its heap-allocated data.
    - When a `String` goes out of scope, Rust automatically frees the memory (no manual memory management or garbage collection needed)

`String` can be mutated as they are heap allocated and we can append a string literal at the end of it. This isnt possible with string literals as they are hardcoded in programs binary.

```rust
    let mut s = String::from("hello");
    s.push_str(", world!"); // push_str() appends a literal to a String
    println!("{s}"); // This will print `hello, world!`
```
### Memory Allocation
There are two well know and most used ways to allocate data on the heap.

#### Manual Memory Management
- **How it works**:  
    Developers explicitly allocate and deallocate memory using functions like `malloc` (in C) or `new`/`delete` (in C++).
    - **Allocation**: Request memory from the heap using `malloc` or similar functions.
    - **Deallocation**: Free memory using `free` or similar functions when it’s no longer needed.
	
```c
int* arr = (int*)malloc(10 * sizeof(int)); // Allocate memory for 10 integers
if (arr == NULL) {
    // Handle allocation failure
}
// Use the array
free(arr); // Free the memory when done
```

- **Pros**:
    - Full control over memory allocation and deallocation.
    - Predictable performance (no garbage collection pauses).
- **Cons**:
    - Error-prone: Forgetting to free memory leads to **memory leaks**.
    - Freeing memory too early leads to **dangling pointers**.
    - Freeing memory twice leads to **undefined behavior**
	
#### **Garbage Collection (GC)**
- **How it works**:  
    The runtime system (e.g., in Java, Python, or Go) automatically tracks memory usage and reclaims memory that is no longer referenced by the program.
    - **Reference Counting**: Counts references to objects and frees memory when the count drops to zero (used in Python).
    - **Tracing GC**: Periodically scans the heap to identify unreachable objects (used in Java, Go).
	
```python
s = "hello"  # Memory is allocated automatically
s = "world"  # Old string "hello" is garbage collected
```

- **Pros**:
    - No manual memory management required.
    - Prevents memory leaks, dangling pointers, and double-free errors.
- **Cons**:
    - Overhead: GC introduces runtime performance costs (e.g., pauses for tracing).
    - Less control: Developers can’t predict exactly when memory will be freed.

#### Rust’s Approach: Ownership and Borrowing
Rust takes a unique approach that combines the best of both worlds:
- **No Garbage Collector**: Rust avoids runtime overhead by not using a GC.
- **No Manual Memory Management**: Rust enforces strict compile-time rules (ownership, borrowing, and lifetimes) to ensure memory safety.

```rust
fn main() {
    let x = 5;
    let y = x;
}
```

Here we can guess that `x` is being bound to 5 and the for y we make a copy of `x` and store it in y. This is how it happens for integers, floats, etc cause these are small data types and all can be done on compile time. 

For example the assembly of this may look like this.
```rust
mov dword ptr [rsp - 8], 5 
mov dword ptr [rsp - 4], 5
ret
```
The compiler being an intelligent being know the value of `x` is 5 so it just make two variable with value `5`.

But in case of data structures such as `String` this isn't possible as we don't know what the size of the `String` needs to be cause the user may append string literal 

[[Rust_Basics]]
