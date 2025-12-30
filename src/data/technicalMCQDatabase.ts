export const technicalMCQDatabase = [
  {
    id: 1,
    category: "C/C++ Programming",
    subcategory: "Pointers",
    difficulty: "Medium",
    question: "What will be the output of the following code?\n\n```cpp\nint arr[] = {10, 20, 30};\nint *p = arr;\nprintf(\"%d \", *p++);\nprintf(\"%d\", *p);\n```",
    options: [
      "10 20",
      "20 30", 
      "10 10",
      "Compilation Error"
    ],
    correctAnswer: 0,
    explanation: "*p++ first prints *p (which is 10), then increments p to point to next element. Second *p prints 20.",
    timeToSolve: 60
  },
  {
    id: 2,
    category: "C/C++ Programming", 
    subcategory: "Storage Classes",
    difficulty: "Medium",
    question: "What will be the output?\n\n```cpp\nvoid func() {\n    static int x = 5;\n    x++;\n    printf(\"%d \", x);\n}\nint main() {\n    func();\n    func();\n    func();\n    return 0;\n}\n```",
    options: [
      "5 5 5",
      "6 6 6",
      "6 7 8", 
      "5 6 7"
    ],
    correctAnswer: 2,
    explanation: "Static variable retains its value between function calls. First call: x=6, Second: x=7, Third: x=8",
    timeToSolve: 90
  },
  {
    id: 3,
    category: "C/C++ Programming",
    subcategory: "Increment/Decrement",
    difficulty: "Hard",
    question: "What will be the value of x?\n\n```cpp\nint i = 5;\nint x = i++ + ++i;\nprintf(\"%d\", x);\n```",
    options: [
      "11",
      "12",
      "13",
      "Undefined Behavior"
    ],
    correctAnswer: 3,
    explanation: "This is undefined behavior because i is modified twice between sequence points without intervening sequence point.",
    timeToSolve: 120
  },
  {
    id: 4,
    category: "C/C++ Programming",
    subcategory: "Macros",
    difficulty: "Medium",
    question: "What will be the output?\n\n```cpp\n#define SQUARE(x) x*x\nint main() {\n    int result = SQUARE(3+2);\n    printf(\"%d\", result);\n    return 0;\n}\n```",
    options: [
      "25",
      "11",
      "10",
      "15"
    ],
    correctAnswer: 1,
    explanation: "Macro expands to 3+2*3+2 = 3+6+2 = 11. Should use parentheses: #define SQUARE(x) ((x)*(x))",
    timeToSolve: 90
  },
  {
    id: 5,
    category: "OOPs",
    subcategory: "Inheritance",
    difficulty: "Medium",
    question: "In C++, if a base class has a private member, can it be accessed in the derived class?",
    options: [
      "Yes, directly",
      "Yes, through public functions only",
      "No, never",
      "Only through protected inheritance"
    ],
    correctAnswer: 1,
    explanation: "Private members cannot be accessed directly in derived class, but can be accessed through public/protected member functions of base class.",
    timeToSolve: 60
  },
  {
    id: 6,
    category: "OOPs",
    subcategory: "Polymorphism",
    difficulty: "Hard",
    question: "What will be the output?\n\n```cpp\nclass Base {\npublic:\n    virtual void show() { cout << \"Base\"; }\n};\nclass Derived : public Base {\npublic:\n    void show() { cout << \"Derived\"; }\n};\nint main() {\n    Base *ptr = new Derived();\n    ptr->show();\n    return 0;\n}\n```",
    options: [
      "Base",
      "Derived",
      "Compilation Error",
      "Runtime Error"
    ],
    correctAnswer: 1,
    explanation: "Virtual function enables runtime polymorphism. Base pointer pointing to Derived object calls Derived's show() method.",
    timeToSolve: 90
  },
  {
    id: 7,
    category: "Data Structures",
    subcategory: "Time Complexity",
    difficulty: "Medium",
    question: "What is the time complexity of the following code?\n\n```cpp\nfor(int i=0; i<n; i++) {\n    for(int j=i; j<n; j++) {\n        // some operation\n    }\n}\n```",
    options: [
      "O(n)",
      "O(n log n)",
      "O(n²)",
      "O(2^n)"
    ],
    correctAnswer: 2,
    explanation: "Outer loop runs n times, inner loop runs (n-i) times. Total: n + (n-1) + (n-2) + ... + 1 = n(n+1)/2 = O(n²)",
    timeToSolve: 120
  },
  {
    id: 8,
    category: "Data Structures",
    subcategory: "Stack Operations",
    difficulty: "Easy",
    question: "What is the time complexity of push and pop operations in a stack?",
    options: [
      "O(n) for both",
      "O(1) for both",
      "O(log n) for both",
      "O(1) for push, O(n) for pop"
    ],
    correctAnswer: 1,
    explanation: "Both push and pop operations in stack are O(1) as they only involve adding/removing element from top.",
    timeToSolve: 30
  },
  {
    id: 9,
    category: "Data Structures",
    subcategory: "Binary Search Tree",
    difficulty: "Medium",
    question: "What is the worst-case time complexity for searching in a Binary Search Tree?",
    options: [
      "O(log n)",
      "O(n)",
      "O(n log n)",
      "O(1)"
    ],
    correctAnswer: 1,
    explanation: "In worst case, BST becomes a skewed tree (like linked list), so searching takes O(n) time.",
    timeToSolve: 60
  },
  {
    id: 10,
    category: "Algorithms",
    subcategory: "Sorting",
    difficulty: "Medium",
    question: "When does Quick Sort have its worst-case time complexity?",
    options: [
      "When array is randomly arranged",
      "When array is already sorted",
      "When array has duplicate elements",
      "When array size is odd"
    ],
    correctAnswer: 1,
    explanation: "Quick Sort's worst case is O(n²) when pivot is always the smallest/largest element, which happens when array is already sorted.",
    timeToSolve: 90
  },
  {
    id: 11,
    category: "Algorithms",
    subcategory: "Sorting Stability",
    difficulty: "Medium",
    question: "Which of the following sorting algorithms is NOT stable?",
    options: [
      "Merge Sort",
      "Bubble Sort",
      "Quick Sort",
      "Insertion Sort"
    ],
    correctAnswer: 2,
    explanation: "Quick Sort is not stable because it may change the relative order of equal elements during partitioning.",
    timeToSolve: 60
  },
  {
    id: 12,
    category: "Operating Systems",
    subcategory: "Process Scheduling",
    difficulty: "Medium",
    question: "Round Robin scheduling algorithm is best suited for which type of systems?",
    options: [
      "Batch processing systems",
      "Real-time systems",
      "Time-sharing systems",
      "Embedded systems"
    ],
    correctAnswer: 2,
    explanation: "Round Robin is designed for time-sharing systems where each process gets equal CPU time slice.",
    timeToSolve: 60
  },
  {
    id: 13,
    category: "Operating Systems",
    subcategory: "Deadlock",
    difficulty: "Hard",
    question: "Which of the following is NOT a necessary condition for deadlock?",
    options: [
      "Mutual Exclusion",
      "Hold and Wait",
      "Preemption",
      "Circular Wait"
    ],
    correctAnswer: 2,
    explanation: "The four necessary conditions are: Mutual Exclusion, Hold and Wait, No Preemption, and Circular Wait. Preemption prevents deadlock.",
    timeToSolve: 90
  },
  {
    id: 14,
    category: "Operating Systems",
    subcategory: "Memory Management",
    difficulty: "Medium",
    question: "What happens when a page fault occurs?",
    options: [
      "Process is terminated",
      "Required page is loaded from secondary storage to main memory",
      "CPU switches to another process",
      "System restarts"
    ],
    correctAnswer: 1,
    explanation: "Page fault occurs when required page is not in main memory. OS loads the page from secondary storage.",
    timeToSolve: 60
  },
  {
    id: 15,
    category: "DBMS",
    subcategory: "SQL Queries",
    difficulty: "Medium",
    question: "What will COUNT(*) return if there are NULL values in the table?",
    options: [
      "Number of non-NULL rows only",
      "Total number of rows including NULL",
      "0",
      "Error"
    ],
    correctAnswer: 1,
    explanation: "COUNT(*) counts all rows including those with NULL values. COUNT(column_name) excludes NULL values.",
    timeToSolve: 60
  },
  {
    id: 16,
    category: "DBMS",
    subcategory: "Normalization",
    difficulty: "Medium",
    question: "Removing partial dependency from a table results in which normal form?",
    options: [
      "1NF",
      "2NF",
      "3NF",
      "BCNF"
    ],
    correctAnswer: 1,
    explanation: "2NF (Second Normal Form) is achieved by removing partial dependencies. Table must be in 1NF and have no partial dependencies.",
    timeToSolve: 90
  },
  {
    id: 17,
    category: "DBMS",
    subcategory: "Keys",
    difficulty: "Easy",
    question: "What is the difference between Candidate Key and Primary Key?",
    options: [
      "No difference",
      "Primary Key can have NULL values, Candidate Key cannot",
      "Candidate Key is a set of attributes that can uniquely identify a tuple, Primary Key is chosen from Candidate Keys",
      "Primary Key can have duplicates"
    ],
    correctAnswer: 2,
    explanation: "Candidate Keys are all possible keys that can uniquely identify a record. Primary Key is one Candidate Key chosen by database designer.",
    timeToSolve: 60
  },
  {
    id: 18,
    category: "Computer Networks",
    subcategory: "OSI Model",
    difficulty: "Medium",
    question: "At which OSI layer does data encryption typically occur?",
    options: [
      "Physical Layer",
      "Data Link Layer",
      "Network Layer",
      "Presentation Layer"
    ],
    correctAnswer: 3,
    explanation: "Presentation Layer (Layer 6) is responsible for data encryption, decryption, compression, and format conversion.",
    timeToSolve: 60
  },
  {
    id: 19,
    category: "Computer Networks",
    subcategory: "IP Addressing",
    difficulty: "Medium",
    question: "Which IP address class has the range 128.0.0.0 to 191.255.255.255?",
    options: [
      "Class A",
      "Class B",
      "Class C",
      "Class D"
    ],
    correctAnswer: 1,
    explanation: "Class B addresses range from 128.0.0.0 to 191.255.255.255 with default subnet mask 255.255.0.0.",
    timeToSolve: 60
  },
  {
    id: 20,
    category: "Computer Networks",
    subcategory: "Protocols",
    difficulty: "Easy",
    question: "What is the default port number for HTTP?",
    options: [
      "21",
      "23",
      "80",
      "443"
    ],
    correctAnswer: 2,
    explanation: "HTTP uses port 80, HTTPS uses 443, FTP uses 21, Telnet uses 23.",
    timeToSolve: 30
  },
  {
    id: 21,
    category: "Java Programming",
    subcategory: "Exception Handling",
    difficulty: "Medium",
    question: "What will be the output?\n\n```java\ntry {\n    int x = 10/0;\n} catch(ArithmeticException e) {\n    System.out.print(\"Caught \");\n} finally {\n    System.out.print(\"Finally\");\n}\n```",
    options: [
      "Caught Finally",
      "Finally",
      "Caught",
      "Runtime Error"
    ],
    correctAnswer: 0,
    explanation: "ArithmeticException is caught and 'Caught' is printed, then finally block executes printing 'Finally'.",
    timeToSolve: 60
  },
  {
    id: 22,
    category: "Java Programming",
    subcategory: "Collections",
    difficulty: "Medium",
    question: "Which collection allows duplicate elements and maintains insertion order?",
    options: [
      "HashSet",
      "TreeSet",
      "ArrayList",
      "HashMap"
    ],
    correctAnswer: 2,
    explanation: "ArrayList allows duplicates and maintains insertion order. HashSet/TreeSet don't allow duplicates, HashMap stores key-value pairs.",
    timeToSolve: 60
  },
  {
    id: 23,
    category: "Python Programming",
    subcategory: "Data Types",
    difficulty: "Easy",
    question: "What will be the output?\n\n```python\nx = [1, 2, 3]\ny = x\ny.append(4)\nprint(x)\n```",
    options: [
      "[1, 2, 3]",
      "[1, 2, 3, 4]",
      "[4]",
      "Error"
    ],
    correctAnswer: 1,
    explanation: "y = x creates a reference, not a copy. Both x and y point to same list object, so modifying y affects x.",
    timeToSolve: 60
  },
  {
    id: 24,
    category: "Python Programming",
    subcategory: "Functions",
    difficulty: "Medium",
    question: "What will be the output?\n\n```python\ndef func(a, b=[]):\n    b.append(a)\n    return b\n\nprint(func(1))\nprint(func(2))\n```",
    options: [
      "[1] [2]",
      "[1] [1, 2]",
      "[1, 2] [1, 2]",
      "Error"
    ],
    correctAnswer: 1,
    explanation: "Mutable default arguments are dangerous. The same list object is used across function calls, so second call appends to existing list.",
    timeToSolve: 90
  },
  {
    id: 25,
    category: "Web Technologies",
    subcategory: "HTML/CSS",
    difficulty: "Easy",
    question: "Which HTML tag is used to create a hyperlink?",
    options: [
      "<link>",
      "<a>",
      "<href>",
      "<url>"
    ],
    correctAnswer: 1,
    explanation: "<a> (anchor) tag with href attribute is used to create hyperlinks in HTML.",
    timeToSolve: 30
  },
  {
    id: 26,
    category: "Web Technologies",
    subcategory: "JavaScript",
    difficulty: "Medium",
    question: "What will be the output?\n\n```javascript\nconsole.log(typeof null);\nconsole.log(typeof undefined);\n```",
    options: [
      "null undefined",
      "object undefined",
      "null null",
      "object object"
    ],
    correctAnswer: 1,
    explanation: "typeof null returns 'object' (this is a known JavaScript quirk), typeof undefined returns 'undefined'.",
    timeToSolve: 60
  },
  {
    id: 27,
    category: "Aptitude",
    subcategory: "Time and Work",
    difficulty: "Medium",
    question: "A can complete a work in 12 days and B can complete the same work in 18 days. If they work together, in how many days will they complete the work?",
    options: [
      "6 days",
      "7.2 days",
      "8 days",
      "9 days"
    ],
    correctAnswer: 1,
    explanation: "A's rate = 1/12, B's rate = 1/18. Combined rate = 1/12 + 1/18 = 5/36. Time = 1/(5/36) = 36/5 = 7.2 days.",
    timeToSolve: 120
  },
  {
    id: 28,
    category: "Aptitude",
    subcategory: "Probability",
    difficulty: "Medium",
    question: "What is the probability of getting at least one head when two coins are tossed?",
    options: [
      "1/4",
      "1/2",
      "3/4",
      "1"
    ],
    correctAnswer: 2,
    explanation: "Total outcomes: HH, HT, TH, TT. Favorable outcomes (at least one head): HH, HT, TH. Probability = 3/4.",
    timeToSolve: 90
  },
  {
    id: 29,
    category: "Logical Reasoning",
    subcategory: "Number Series",
    difficulty: "Medium",
    question: "Find the next number in the series: 2, 6, 12, 20, 30, ?",
    options: [
      "40",
      "42",
      "44",
      "46"
    ],
    correctAnswer: 1,
    explanation: "Pattern: 1×2=2, 2×3=6, 3×4=12, 4×5=20, 5×6=30, 6×7=42. Each term is n×(n+1).",
    timeToSolve: 90
  },
  {
    id: 30,
    category: "Logical Reasoning",
    subcategory: "Blood Relations",
    difficulty: "Medium",
    question: "If A is the brother of B, B is the sister of C, and C is the father of D, what is A to D?",
    options: [
      "Father",
      "Uncle",
      "Grandfather",
      "Brother"
    ],
    correctAnswer: 1,
    explanation: "A is brother of B, B is sister of C (so A is brother of C), C is father of D. Therefore, A is uncle of D.",
    timeToSolve: 90
  },
  {
    id: 31,
    category: "C/C++ Programming",
    subcategory: "Arrays",
    difficulty: "Medium",
    question: "What will be the output?\n\n```cpp\nint arr[5] = {1, 2, 3};\nprintf(\"%d\", arr[4]);\n```",
    options: [
      "Garbage value",
      "0",
      "3",
      "Compilation Error"
    ],
    correctAnswer: 1,
    explanation: "Uninitialized array elements are automatically initialized to 0 in C/C++.",
    timeToSolve: 60
  },
  {
    id: 32,
    category: "C/C++ Programming",
    subcategory: "Strings",
    difficulty: "Hard",
    question: "What will be the output?\n\n```cpp\nchar str[] = \"Hello\\0World\";\nprintf(\"%d\", strlen(str));\n```",
    options: [
      "10",
      "11",
      "5",
      "6"
    ],
    correctAnswer: 2,
    explanation: "strlen() counts characters until it encounters null character (\\0). It stops at first \\0, so length is 5.",
    timeToSolve: 90
  },
  {
    id: 33,
    category: "C/C++ Programming",
    subcategory: "Structures",
    difficulty: "Medium",
    question: "What is the size of the following structure?\n\n```cpp\nstruct Test {\n    char c;\n    int i;\n    char d;\n};\n```",
    options: [
      "6 bytes",
      "9 bytes",
      "12 bytes",
      "Depends on compiler"
    ],
    correctAnswer: 3,
    explanation: "Structure size depends on padding and alignment rules which vary by compiler and architecture. Typically 12 bytes due to padding.",
    timeToSolve: 120
  },
  {
    id: 34,
    category: "OOPs",
    subcategory: "Constructors",
    difficulty: "Medium",
    question: "In which order are constructors called in inheritance?\n\n```cpp\nclass A { A() { cout << \"A\"; } };\nclass B : public A { B() { cout << \"B\"; } };\nB obj;\n```",
    options: [
      "B A",
      "A B",
      "Only B",
      "Compilation Error"
    ],
    correctAnswer: 1,
    explanation: "Base class constructor is called first, then derived class constructor. Output: AB",
    timeToSolve: 60
  },
  {
    id: 35,
    category: "OOPs",
    subcategory: "Abstraction",
    difficulty: "Easy",
    question: "Can we create an object of an abstract class in C++?",
    options: [
      "Yes, always",
      "No, never",
      "Only if it has no pure virtual functions",
      "Only through pointers"
    ],
    correctAnswer: 1,
    explanation: "Abstract classes cannot be instantiated. They can only be used as base classes.",
    timeToSolve: 30
  },
  {
    id: 36,
    category: "Data Structures",
    subcategory: "Queue",
    difficulty: "Easy",
    question: "In a circular queue with size 5, if front=2 and rear=4, how many elements are present?",
    options: [
      "2",
      "3",
      "4",
      "5"
    ],
    correctAnswer: 1,
    explanation: "Elements at positions 2, 3, 4. Total = 3 elements.",
    timeToSolve: 60
  },
  {
    id: 37,
    category: "Data Structures",
    subcategory: "Linked List",
    difficulty: "Medium",
    question: "What is the time complexity to insert a node at the beginning of a singly linked list?",
    options: [
      "O(1)",
      "O(n)",
      "O(log n)",
      "O(n²)"
    ],
    correctAnswer: 0,
    explanation: "Inserting at beginning requires only updating head pointer, which is O(1) operation.",
    timeToSolve: 45
  },
  {
    id: 38,
    category: "Data Structures",
    subcategory: "Hashing",
    difficulty: "Medium",
    question: "Which collision resolution technique uses linked lists?",
    options: [
      "Linear Probing",
      "Quadratic Probing",
      "Chaining",
      "Double Hashing"
    ],
    correctAnswer: 2,
    explanation: "Chaining uses linked lists to store multiple elements that hash to the same index.",
    timeToSolve: 60
  },
  {
    id: 39,
    category: "Algorithms",
    subcategory: "Searching",
    difficulty: "Easy",
    question: "Binary search can be applied on:",
    options: [
      "Unsorted array",
      "Sorted array only",
      "Linked list only",
      "Any data structure"
    ],
    correctAnswer: 1,
    explanation: "Binary search requires sorted array to work correctly by dividing search space in half.",
    timeToSolve: 30
  },
  {
    id: 40,
    category: "Algorithms",
    subcategory: "Recursion",
    difficulty: "Hard",
    question: "What will be the output?\n\n```cpp\nint func(int n) {\n    if(n <= 1) return 1;\n    return n * func(n-1);\n}\nprintf(\"%d\", func(5));\n```",
    options: [
      "15",
      "25",
      "120",
      "Stack Overflow"
    ],
    correctAnswer: 2,
    explanation: "This calculates factorial. func(5) = 5*4*3*2*1 = 120",
    timeToSolve: 90
  },
  {
    id: 41,
    category: "Algorithms",
    subcategory: "Greedy",
    difficulty: "Medium",
    question: "Which algorithm uses greedy approach?",
    options: [
      "Dijkstra's shortest path",
      "Bellman-Ford algorithm",
      "Floyd-Warshall algorithm",
      "Dynamic Programming"
    ],
    correctAnswer: 0,
    explanation: "Dijkstra's algorithm uses greedy approach by always selecting the vertex with minimum distance.",
    timeToSolve: 60
  },
  {
    id: 42,
    category: "Operating Systems",
    subcategory: "Threads",
    difficulty: "Medium",
    question: "What is shared between threads of the same process?",
    options: [
      "Stack",
      "Registers",
      "Heap memory",
      "Program Counter"
    ],
    correctAnswer: 2,
    explanation: "Threads share heap memory, code, and data sections. Each thread has its own stack and registers.",
    timeToSolve: 60
  },
  {
    id: 43,
    category: "Operating Systems",
    subcategory: "Virtual Memory",
    difficulty: "Hard",
    question: "What is thrashing in OS?",
    options: [
      "CPU running at 100%",
      "Excessive page faults causing performance degradation",
      "Memory leak",
      "Disk failure"
    ],
    correctAnswer: 1,
    explanation: "Thrashing occurs when system spends more time swapping pages than executing processes due to insufficient memory.",
    timeToSolve: 90
  },
  {
    id: 44,
    category: "DBMS",
    subcategory: "Transactions",
    difficulty: "Medium",
    question: "Which property ensures that transaction is treated as a single unit?",
    options: [
      "Atomicity",
      "Consistency",
      "Isolation",
      "Durability"
    ],
    correctAnswer: 0,
    explanation: "Atomicity ensures that transaction is all-or-nothing. Either all operations complete or none do.",
    timeToSolve: 60
  },
  {
    id: 45,
    category: "DBMS",
    subcategory: "Joins",
    difficulty: "Medium",
    question: "Which join returns all records from both tables?",
    options: [
      "INNER JOIN",
      "LEFT JOIN",
      "RIGHT JOIN",
      "FULL OUTER JOIN"
    ],
    correctAnswer: 3,
    explanation: "FULL OUTER JOIN returns all records from both tables, with NULL for non-matching records.",
    timeToSolve: 60
  },
  {
    id: 46,
    category: "DBMS",
    subcategory: "Indexing",
    difficulty: "Hard",
    question: "What is the disadvantage of having too many indexes on a table?",
    options: [
      "Slower SELECT queries",
      "Slower INSERT/UPDATE/DELETE operations",
      "More disk space",
      "Both B and C"
    ],
    correctAnswer: 3,
    explanation: "Indexes speed up SELECT but slow down INSERT/UPDATE/DELETE as indexes need to be updated. They also consume disk space.",
    timeToSolve: 90
  },
  {
    id: 47,
    category: "Computer Networks",
    subcategory: "TCP/UDP",
    difficulty: "Medium",
    question: "Which protocol is connection-oriented?",
    options: [
      "UDP",
      "TCP",
      "IP",
      "ICMP"
    ],
    correctAnswer: 1,
    explanation: "TCP is connection-oriented (establishes connection before data transfer). UDP is connectionless.",
    timeToSolve: 45
  },
  {
    id: 48,
    category: "Computer Networks",
    subcategory: "Subnetting",
    difficulty: "Hard",
    question: "How many hosts can be addressed in a /26 network?",
    options: [
      "32",
      "62",
      "64",
      "128"
    ],
    correctAnswer: 1,
    explanation: "/26 means 26 bits for network, 6 bits for hosts. 2^6 = 64 addresses, minus 2 (network and broadcast) = 62 usable hosts.",
    timeToSolve: 120
  },
  {
    id: 49,
    category: "Java Programming",
    subcategory: "Strings",
    difficulty: "Medium",
    question: "What will be the output?\n\n```java\nString s1 = \"Hello\";\nString s2 = \"Hello\";\nSystem.out.println(s1 == s2);\n```",
    options: [
      "true",
      "false",
      "Compilation Error",
      "Runtime Error"
    ],
    correctAnswer: 0,
    explanation: "String literals are stored in string pool. Both s1 and s2 refer to same object in pool, so == returns true.",
    timeToSolve: 90
  },
  {
    id: 50,
    category: "Java Programming",
    subcategory: "Multithreading",
    difficulty: "Hard",
    question: "Which method is used to start a thread in Java?",
    options: [
      "run()",
      "start()",
      "execute()",
      "begin()"
    ],
    correctAnswer: 1,
    explanation: "start() method is used to start a thread. It internally calls run() method in a new thread.",
    timeToSolve: 45
  },
  {
    id: 51,
    category: "Python Programming",
    subcategory: "Decorators",
    difficulty: "Hard",
    question: "What will be the output?\n\n```python\ndef decorator(func):\n    def wrapper():\n        print(\"Before\")\n        func()\n        print(\"After\")\n    return wrapper\n\n@decorator\ndef hello():\n    print(\"Hello\")\n\nhello()\n```",
    options: [
      "Hello",
      "Before Hello After",
      "Before After Hello",
      "Error"
    ],
    correctAnswer: 1,
    explanation: "Decorator wraps the function. Output: Before, Hello, After (each on new line).",
    timeToSolve: 120
  },
  {
    id: 52,
    category: "Python Programming",
    subcategory: "List Comprehension",
    difficulty: "Medium",
    question: "What will be the output?\n\n```python\nresult = [x**2 for x in range(5) if x % 2 == 0]\nprint(result)\n```",
    options: [
      "[0, 1, 4, 9, 16]",
      "[0, 4, 16]",
      "[1, 9]",
      "[0, 2, 4]"
    ],
    correctAnswer: 1,
    explanation: "List comprehension squares even numbers from 0-4. Even numbers: 0, 2, 4. Squares: 0, 4, 16.",
    timeToSolve: 90
  },
  {
    id: 53,
    category: "Web Technologies",
    subcategory: "CSS",
    difficulty: "Medium",
    question: "Which CSS property is used to change text color?",
    options: [
      "text-color",
      "color",
      "font-color",
      "text-style"
    ],
    correctAnswer: 1,
    explanation: "The 'color' property is used to set the color of text in CSS.",
    timeToSolve: 30
  },
  {
    id: 54,
    category: "Web Technologies",
    subcategory: "React",
    difficulty: "Medium",
    question: "What is the purpose of useState hook in React?",
    options: [
      "To fetch data from API",
      "To manage component state",
      "To handle side effects",
      "To create routes"
    ],
    correctAnswer: 1,
    explanation: "useState is a React hook used to add state management to functional components.",
    timeToSolve: 60
  },
  {
    id: 55,
    category: "Aptitude",
    subcategory: "Profit & Loss",
    difficulty: "Medium",
    question: "A shopkeeper sells an item at 20% profit. If he had bought it at 10% less and sold for Rs. 5 more, he would have gained 30%. What is the cost price?",
    options: [
      "Rs. 100",
      "Rs. 150",
      "Rs. 200",
      "Rs. 250"
    ],
    correctAnswer: 2,
    explanation: "Let CP = x. SP = 1.2x. New CP = 0.9x, New SP = 1.2x + 5. Profit = 30%. Solving: 0.9x * 1.3 = 1.2x + 5. x = 200.",
    timeToSolve: 180
  },
  {
    id: 56,
    category: "Aptitude",
    subcategory: "Permutation & Combination",
    difficulty: "Hard",
    question: "In how many ways can 5 boys and 3 girls be arranged in a row such that no two girls are together?",
    options: [
      "14400",
      "28800",
      "43200",
      "57600"
    ],
    correctAnswer: 0,
    explanation: "Arrange 5 boys: 5! ways. Create 6 gaps. Choose 3 gaps for girls: 6P3. Total = 5! × 6P3 = 120 × 120 = 14400.",
    timeToSolve: 180
  },
  {
    id: 57,
    category: "Logical Reasoning",
    subcategory: "Coding-Decoding",
    difficulty: "Medium",
    question: "If COMPUTER is coded as RFUVQNPC, how is MACHINE coded?",
    options: [
      "NBDIJOF",
      "LZXCHMD",
      "NZXCHMD",
      "LBDIJOF"
    ],
    correctAnswer: 2,
    explanation: "Each letter is shifted by +1 position. M→N, A→Z (wraps), C→X, H→C, I→H, N→M, E→D. Answer: NZXCHMD.",
    timeToSolve: 120
  },
  {
    id: 58,
    category: "Logical Reasoning",
    subcategory: "Puzzles",
    difficulty: "Hard",
    question: "A clock shows 3:00. What is the angle between hour and minute hands?",
    options: [
      "90 degrees",
      "60 degrees",
      "45 degrees",
      "30 degrees"
    ],
    correctAnswer: 0,
    explanation: "At 3:00, minute hand is at 12 and hour hand is at 3. Each hour represents 30 degrees. 3 × 30 = 90 degrees.",
    timeToSolve: 90
  },
  {
    id: 59,
    category: "C/C++ Programming",
    subcategory: "Bitwise Operators",
    difficulty: "Hard",
    question: "What will be the output?\n\n```cpp\nint x = 5, y = 10;\nprintf(\"%d\", x ^ y);\n```",
    options: [
      "5",
      "10",
      "15",
      "0"
    ],
    correctAnswer: 2,
    explanation: "XOR operation: 5 (0101) ^ 10 (1010) = 15 (1111). XOR returns 1 when bits are different.",
    timeToSolve: 90
  },
  {
    id: 60,
    category: "Data Structures",
    subcategory: "Trees",
    difficulty: "Hard",
    question: "What is the maximum number of nodes in a binary tree of height h?",
    options: [
      "2^h",
      "2^h - 1",
      "2^(h+1) - 1",
      "2^(h-1)"
    ],
    correctAnswer: 2,
    explanation: "Maximum nodes = 2^0 + 2^1 + ... + 2^h = 2^(h+1) - 1. This occurs in a complete binary tree.",
    timeToSolve: 120
  }
];

export const mcqCategories = [
  {
    name: "C/C++ Programming",
    subcategories: ["Pointers", "Storage Classes", "Increment/Decrement", "Macros", "Memory Management"],
    difficulty: "High",
    importance: "Most Important",
    questionCount: 12
  },
  {
    name: "OOPs",
    subcategories: ["Inheritance", "Polymorphism", "Encapsulation", "Abstraction", "Constructors"],
    difficulty: "Medium",
    importance: "Very Important", 
    questionCount: 8
  },
  {
    name: "Data Structures",
    subcategories: ["Time Complexity", "Stack Operations", "Binary Search Tree", "Arrays", "Linked Lists"],
    difficulty: "Medium",
    importance: "Very Important",
    questionCount: 11
  },
  {
    name: "Algorithms", 
    subcategories: ["Sorting", "Searching", "Graph Algorithms", "Dynamic Programming"],
    difficulty: "Medium",
    importance: "Important",
    questionCount: 8
  },
  {
    name: "Operating Systems",
    subcategories: ["Process Scheduling", "Deadlock", "Memory Management", "File Systems"],
    difficulty: "Medium", 
    importance: "Important",
    questionCount: 8
  },
  {
    name: "DBMS",
    subcategories: ["SQL Queries", "Normalization", "Keys", "Transactions", "Indexing"],
    difficulty: "Medium",
    importance: "Important", 
    questionCount: 8
  },
  {
    name: "Computer Networks",
    subcategories: ["OSI Model", "IP Addressing", "Protocols", "TCP/UDP"],
    difficulty: "Easy-Medium",
    importance: "Moderate",
    questionCount: 6
  },
  {
    name: "Programming Languages",
    subcategories: ["Java", "Python", "JavaScript", "C#"],
    difficulty: "Medium",
    importance: "Important",
    questionCount: 8
  },
  {
    name: "Web Technologies", 
    subcategories: ["HTML/CSS", "JavaScript", "React", "Node.js"],
    difficulty: "Easy-Medium",
    importance: "Moderate",
    questionCount: 6
  },
  {
    name: "Aptitude",
    subcategories: ["Time and Work", "Probability", "Permutation & Combination", "Profit & Loss"],
    difficulty: "Medium",
    importance: "Important",
    questionCount: 5
  },
  {
    name: "Logical Reasoning",
    subcategories: ["Number Series", "Blood Relations", "Coding-Decoding", "Puzzles"],
    difficulty: "Medium", 
    importance: "Important",
    questionCount: 5
  }
];

export const companyWiseMCQFocus = {
  "TCS": ["C/C++", "Java", "Aptitude", "Logical Reasoning"],
  "Infosys": ["C/C++", "OOPs", "DBMS", "Aptitude"],
  "Wipro": ["C/C++", "Data Structures", "OS", "Networks"],
  "Cognizant": ["Programming", "DBMS", "Web Technologies", "Aptitude"],
  "Accenture": ["C/C++", "Java", "Logical Reasoning", "Aptitude"],
  "Amazon": ["Data Structures", "Algorithms", "OOPs", "OS"],
  "Microsoft": ["C/C++", "Data Structures", "OS", "DBMS"],
  "Google": ["Algorithms", "Data Structures", "OS", "Networks"],
  "Adobe": ["C/C++", "OOPs", "Data Structures", "Web Technologies"]
};
