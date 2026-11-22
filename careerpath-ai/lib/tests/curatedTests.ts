import { CareerTest } from "./types";

export const CURATED_CAREER_TESTS: CareerTest[] = [
  {
    id: "test-frontend-react-nextjs",
    slug: "frontend-react-nextjs",
    title: "Frontend & Modern React Mastery",
    category: "Frontend",
    difficulty: "Intermediate",
    description:
      "Assess your core frontend capabilities across React 19 hooks, Next.js App Router, TypeScript state management, and web performance optimization.",
    durationMinutes: 15,
    totalQuestions: 8,
    passingScore: 70,
    skillsCovered: ["React", "Next.js", "TypeScript", "Performance", "State Management"],
    questions: [
      {
        id: 1,
        question: "What is the primary architectural advantage of React Server Components (RSC) in Next.js App Router?",
        options: [
          "They completely replace client components and remove all browser interactivity",
          "They execute on the server and keep their large dependencies out of the client JavaScript bundle",
          "They allow direct access to browser localStorage without hydration",
          "They automatically convert all SQL queries into GraphQL endpoints"
        ],
        correctAnswer: 1,
        explanation:
          "React Server Components execute only on the server, streaming HTML and serialized payloads without bundling server-side libraries (like database clients or markdown parsers) into client-side JS.",
        skill: "Next.js"
      },
      {
        id: 2,
        question: "When should you prefer the `useCallback` hook in React?",
        options: [
          "On every single function declared inside a component body",
          "When passing callback functions to memoized child components to prevent unnecessary re-renders",
          "To trigger asynchronous data fetching when the component unmounts",
          "To synchronize document title changes with state mutations"
        ],
        correctAnswer: 1,
        explanation:
          "useCallback returns a memoized version of the callback function that only changes if dependencies change. It is most valuable when passing callbacks to optimized children that rely on reference equality to prevent re-renders.",
        skill: "React"
      },
      {
        id: 3,
        question: "In TypeScript, what does the `unknown` type represent compared to `any`?",
        options: [
          "It is completely identical to `any` in every compiler setting",
          "It is a type-safe counterpart to `any`; you cannot operate on an `unknown` value without first narrowing its type",
          "It can only hold primitive string or boolean values",
          "It forces the variable to be assigned to null"
        ],
        correctAnswer: 1,
        explanation:
          "unknown represents any value, but unlike `any`, TypeScript prevents you from calling methods or accessing properties on it until you narrow its type through type guards or assertions.",
        skill: "TypeScript"
      },
      {
        id: 4,
        question: "How does the Next.js `revalidateTag()` function assist with data caching?",
        options: [
          "It clears the user's browser cookie cache immediately",
          "It purges specific tagged cache entries on-demand in the Next.js Data Cache across server instances",
          "It converts static pages to dynamic client-only components",
          "It restarts the Node.js production container"
        ],
        correctAnswer: 1,
        explanation:
          "revalidateTag() allows on-demand cache invalidation for fetch requests or unstable_cache calls tagged with that string identifier, ensuring fresh data without rebuilding.",
        skill: "Next.js"
      },
      {
        id: 5,
        question: "What causes a React component hydration error in Server-Side Rendering (SSR)?",
        options: [
          "Using CSS Tailwind utility classes instead of inline styles",
          "A mismatch between the HTML generated on the server and the initial React tree rendered in the browser",
          "Defining more than two useState hooks in a single component",
          "Importing icons from lucide-react"
        ],
        correctAnswer: 1,
        explanation:
          "Hydration errors occur when the server-rendered HTML does not match the client's initial render (e.g. using `window`, `Date.now()`, or browser-only APIs during the initial render pass).",
        skill: "Performance"
      },
      {
        id: 6,
        question: "In modern React, what is the purpose of the `useTransition` hook?",
        options: [
          "To configure CSS transition animations between route changes",
          "To mark a state update as non-urgent, allowing the browser to stay responsive during intensive renders",
          "To automatically retry failed API network requests",
          "To serialize form data into JSON strings"
        ],
        correctAnswer: 1,
        explanation:
          "useTransition lets you mark updates as transitions, telling React that urgent interactions (like typing into an input) should interrupt heavy rendering passes.",
        skill: "React"
      },
      {
        id: 7,
        question: "Which Core Web Vital metric measures visual stability and unexpected layout shifts?",
        options: [
          "LCP (Largest Contentful Paint)",
          "FID / INP (Interaction to Next Paint)",
          "CLS (Cumulative Layout Shift)",
          "TTFB (Time to First Byte)"
        ],
        correctAnswer: 2,
        explanation:
          "CLS (Cumulative Layout Shift) measures the total of all unexpected layout shift scores that occur during the lifespan of a web page.",
        skill: "Performance"
      },
      {
        id: 8,
        question: "Why should keys provided to elements in a React list be stable, unique, and predictable?",
        options: [
          "To ensure CSS animations execute in reverse order",
          "To help React identify which items have changed, been added, or removed during reconciliation",
          "To prevent the browser from caching image assets",
          "To bind DOM events directly to the window object"
        ],
        correctAnswer: 1,
        explanation:
          "Stable and unique keys allow React's diffing algorithm to correctly match virtual DOM elements with real DOM nodes, avoiding costly re-renders and subtle state bugs.",
        skill: "State Management"
      }
    ]
  },
  {
    id: "test-backend-node-system-design",
    slug: "backend-node-system-design",
    title: "Backend, APIs & System Architecture",
    category: "Backend",
    difficulty: "Intermediate",
    description:
      "Test your understanding of Node.js concurrency, relational databases, indexing, JWT security, and scalable REST/system design.",
    durationMinutes: 15,
    totalQuestions: 8,
    passingScore: 70,
    skillsCovered: ["Node.js", "Databases", "APIs & REST", "Security", "System Architecture"],
    questions: [
      {
        id: 1,
        question: "How does the Node.js event loop handle asynchronous I/O operations without multi-threading your JavaScript code?",
        options: [
          "It creates a new OS thread for every line of JavaScript code",
          "It uses libuv and non-blocking kernel system calls, delegating blocking tasks to a thread pool and queuing callbacks",
          "It freezes the server until the file read or database query completes",
          "It converts all asynchronous operations into synchronous while loops"
        ],
        correctAnswer: 1,
        explanation:
          "Node.js runs JS on a single thread but delegates I/O and intensive work to libuv's thread pool and OS kernel mechanisms, queuing completion callbacks onto event loop phases.",
        skill: "Node.js"
      },
      {
        id: 2,
        question: "What is the primary role of a B-Tree index on a PostgreSQL column?",
        options: [
          "To automatically compress image data stored in that column",
          "To reduce search time complexity from O(N) full-table scan to O(log N) for equality and range queries",
          "To prevent duplicate values from ever being inserted",
          "To encrypt the column contents on disk"
        ],
        correctAnswer: 1,
        explanation:
          "A B-tree index orders values in a balanced hierarchical structure, allowing the database query planner to find records in O(log N) operations without scanning every row.",
        skill: "Databases"
      },
      {
        id: 3,
        question: "Which of the following describes an idempotent HTTP method in RESTful API design?",
        options: [
          "A method that always takes less than 10 milliseconds to respond",
          "A method where making multiple identical requests has the same intended effect on the server state as a single request",
          "A method that does not require any authentication headers",
          "A method that only transmits encrypted binary payloads"
        ],
        correctAnswer: 1,
        explanation:
          "Methods like GET, PUT, and DELETE are idempotent because executing them once or multiple times produces the same resulting server state.",
        skill: "APIs & REST"
      },
      {
        id: 4,
        question: "Why should sensitive JWT (JSON Web Tokens) or session tokens usually be stored in `httpOnly` cookies rather than `localStorage`?",
        options: [
          "httpOnly cookies have no size limitations",
          "httpOnly cookies cannot be read by client-side JavaScript, significantly reducing the risk of token theft via XSS (Cross-Site Scripting)",
          "localStorage is wiped automatically every 5 minutes",
          "Browsers do not support sending Authorization headers"
        ],
        correctAnswer: 1,
        explanation:
          "httpOnly cookies are inaccessible to document.cookie in JS, preventing malicious injected scripts (XSS attacks) from exfiltrating authentication tokens.",
        skill: "Security"
      },
      {
        id: 5,
        question: "In database transactions, what does the 'I' in the ACID acronym stand for?",
        options: [
          "Iteration",
          "Isolation",
          "Indexing",
          "Idempotency"
        ],
        correctAnswer: 1,
        explanation:
          "Isolation ensures that concurrent execution of transactions leaves the database in the same state that would have been obtained if the transactions were executed sequentially.",
        skill: "Databases"
      },
      {
        id: 6,
        question: "What is the purpose of implementing a Token Bucket or Leaky Bucket algorithm on an API gateway?",
        options: [
          "To compress outbound JSON responses",
          "To enforce rate limiting and protect backend services from denial-of-service or burst overload",
          "To convert SQL queries into NoSQL documents",
          "To handle user avatar uploads"
        ],
        correctAnswer: 1,
        explanation:
          "Token Bucket and Leaky Bucket algorithms are industry standards for API rate limiting, regulating traffic flow and preventing server degradation.",
        skill: "System Architecture"
      },
      {
        id: 7,
        question: "What is the N+1 query problem commonly encountered with Object-Relational Mappers (ORMs)?",
        options: [
          "When an application queries one parent record, then issues N separate database queries to load related child records for each parent",
          "When a database table has N columns plus 1 primary key",
          "When a query times out after N+1 seconds",
          "When N users connect to the database at the same millisecond"
        ],
        correctAnswer: 0,
        explanation:
          "The N+1 query problem occurs when an ORM fetches a list of N entities and then executes an extra query for each entity to retrieve its associations, easily solved with JOINs or batching.",
        skill: "Databases"
      },
      {
        id: 8,
        question: "In microservices or distributed architectures, what problem does a Circuit Breaker pattern solve?",
        options: [
          "It replaces HTTPS with plain TCP for speed",
          "It stops cascading failures by quickly rejecting requests to a failing downstream service until it recovers",
          "It forces database queries to run in parallel",
          "It invalidates the client's cache whenever a server reboot occurs"
        ],
        correctAnswer: 1,
        explanation:
          "The Circuit Breaker pattern monitors calls to external services. When failures reach a threshold, it trips open to immediately return fallbacks and prevent thread starvation across the cluster.",
        skill: "System Architecture"
      }
    ]
  },
  {
    id: "test-fullstack-web-modern",
    slug: "fullstack-web-modern",
    title: "Full Stack Web & Cloud Development",
    category: "Full Stack",
    difficulty: "Advanced",
    description:
      "Comprehensive evaluation of end-to-end full stack workflows: server actions, schema migrations, security headers, relational modeling, and client hydration.",
    durationMinutes: 20,
    totalQuestions: 8,
    passingScore: 75,
    skillsCovered: ["Full Stack", "TypeScript", "Next.js", "PostgreSQL", "Web Security"],
    questions: [
      {
        id: 1,
        question: "What security vulnerability arises if you interpolate unsanitized user input directly into an SQL query string?",
        options: [
          "Cross-Site Request Forgery (CSRF)",
          "SQL Injection (SQLi)",
          "Server-Side Request Forgery (SSRF)",
          "Broken Object Level Authorization (BOLA)"
        ],
        correctAnswer: 1,
        explanation:
          "SQL Injection happens when untrusted user input alters the query structure. Using parameterized queries or ORMs like Drizzle protects against this completely.",
        skill: "Web Security"
      },
      {
        id: 2,
        question: "How do Next.js Server Actions improve form submissions compared to legacy client-side fetch APIs?",
        options: [
          "They disable all server-side validation",
          "They can be called directly as form actions with built-in progressive enhancement and type-safe server execution",
          "They can only run inside Docker containers",
          "They convert every image upload to WebP format"
        ],
        correctAnswer: 1,
        explanation:
          "Server Actions can be passed directly to form `action` props, working even before client JS hydrates, and simplifying data mutations with automatic cache revalidation.",
        skill: "Next.js"
      },
      {
        id: 3,
        question: "What is the purpose of the `Content-Security-Policy` (CSP) HTTP response header?",
        options: [
          "To compress CSS and JavaScript files",
          "To restrict the origins from which scripts, styles, images, and other assets can be loaded and executed",
          "To enforce HTTPS renewal every 90 days",
          "To specify user session timeout periods"
        ],
        correctAnswer: 1,
        explanation:
          "CSP is a powerful security header that mitigates Cross-Site Scripting (XSS) and data injection attacks by restricting allowed origins for executable scripts and resources.",
        skill: "Web Security"
      },
      {
        id: 4,
        question: "In relational database design, what is Third Normal Form (3NF)?",
        options: [
          "Every table must have exactly 3 columns",
          "The table is in 2NF and contains no transitive dependencies (non-key columns depend only on the primary key)",
          "The database must run on 3 synchronized server nodes",
          "All foreign keys must reference UUID values"
        ],
        correctAnswer: 1,
        explanation:
          "3NF eliminates transitive dependencies: every non-prime attribute must depend directly on the primary key (the key, the whole key, and nothing but the key).",
        skill: "PostgreSQL"
      },
      {
        id: 5,
        question: "When managing client-server state synchronization in a modern React application, what is Optimistic UI?",
        options: [
          "Assuming network requests never fail and deleting all error handlers",
          "Updating the client interface immediately as if the mutation succeeded before the server confirms, then rolling back if it fails",
          "Displaying positive motivational quotes to users during loading states",
          "Using AI to predict the next page the user will navigate to"
        ],
        correctAnswer: 1,
        explanation:
          "Optimistic UI updates the UI immediately on user action to provide an instant, snappy feel, while reverting to the previous state if the server operation errors out.",
        skill: "Full Stack"
      },
      {
        id: 6,
        question: "Which mechanism in OAuth 2.0 / OpenID Connect is used to exchange an authorization code securely on public single-page applications without a client secret?",
        options: [
          "Basic Auth",
          "PKCE (Proof Key for Code Exchange)",
          "HMAC-SHA1 Signature",
          "Mutual TLS"
        ],
        correctAnswer: 1,
        explanation:
          "PKCE (RFC 7636) prevents authorization code interception on public clients that cannot securely store a client secret by generating code verifiers and challenges.",
        skill: "Web Security"
      },
      {
        id: 7,
        question: "What is the primary benefit of using a database connection pooler (like Neon or PgBouncer) in serverless environments?",
        options: [
          "It compiles SQL into C++ code",
          "It maintains persistent database connections and prevents ephemeral serverless functions from overwhelming database connection limits",
          "It eliminates the need for database backups",
          "It automatically encrypts passwords in plaintext tables"
        ],
        correctAnswer: 1,
        explanation:
          "Serverless functions scale rapidly and can exhaust database connections; poolers maintain a shared pool of connections and proxy queries efficiently.",
        skill: "PostgreSQL"
      },
      {
        id: 8,
        question: "In TypeScript, what is a Discriminated Union?",
        options: [
          "A union of types that share a common literal property used to narrow down the specific type",
          "An array that only permits negative numbers",
          "A type alias that excludes undefined",
          "A class that cannot be inherited"
        ],
        correctAnswer: 0,
        explanation:
          "A discriminated union combines multiple types that each share a common literal tag property (e.g. `type: 'success' | 'error'`), enabling exhaustive type narrowing.",
        skill: "TypeScript"
      }
    ]
  },
  {
    id: "test-python-dsa-algorithms",
    slug: "python-dsa-algorithms",
    title: "Python, Algorithms & Data Structures",
    category: "Python & DSA",
    difficulty: "Intermediate",
    description:
      "Assess your algorithmic thinking, time complexity analysis, Python data structures, recursion, dynamic programming, and binary search techniques.",
    durationMinutes: 15,
    totalQuestions: 8,
    passingScore: 70,
    skillsCovered: ["Python", "Algorithms", "Data Structures", "Complexity Analysis", "Problem Solving"],
    questions: [
      {
        id: 1,
        question: "What is the average and worst-case time complexity of searching for a key in a standard Python dictionary (`dict`)?",
        options: [
          "Average: O(log N), Worst: O(N)",
          "Average: O(1), Worst: O(N)",
          "Average: O(N), Worst: O(N^2)",
          "Average: O(1), Worst: O(1)"
        ],
        correctAnswer: 1,
        explanation:
          "Python dicts use hash tables. Average lookup is O(1) amortized, but in the rare worst-case of excessive hash collisions, it degrades to O(N).",
        skill: "Python"
      },
      {
        id: 2,
        question: "What is the time complexity of finding an element in a sorted array of size N using Binary Search?",
        options: [
          "O(1)",
          "O(log N)",
          "O(N)",
          "O(N log N)"
        ],
        correctAnswer: 1,
        explanation:
          "Binary Search halves the search space at each iteration, resulting in O(log N) comparisons.",
        skill: "Algorithms"
      },
      {
        id: 3,
        question: "Which data structure operates on a Last-In, First-Out (LIFO) principle?",
        options: [
          "Queue",
          "Stack",
          "Heap",
          "Trie"
        ],
        correctAnswer: 1,
        explanation:
          "A Stack follows LIFO, where the last element inserted is the first element to be popped.",
        skill: "Data Structures"
      },
      {
        id: 4,
        question: "In Python, what is the key difference between a `list` and a `generator` expression?",
        options: [
          "Lists cannot store strings, while generators can",
          "Lists allocate memory for all elements immediately, while generators produce elements lazily on demand, saving memory",
          "Generators can be indexed directly with `gen[0]`",
          "Generators are always slower in single iterations"
        ],
        correctAnswer: 1,
        explanation:
          "Generators yield items one by one using lazy evaluation, consuming O(1) auxiliary memory regardless of the sequence size.",
        skill: "Python"
      },
      {
        id: 5,
        question: "What algorithmic paradigm does Merge Sort utilize to sort an array in O(N log N) time?",
        options: [
          "Greedy strategy",
          "Divide and Conquer",
          "Backtracking with pruning",
          "Randomized walk"
        ],
        correctAnswer: 1,
        explanation:
          "Merge Sort divides the array into two halves, recursively sorts them, and merges the two sorted halves together.",
        skill: "Algorithms"
      },
      {
        id: 6,
        question: "What is the purpose of Memoization in dynamic programming?",
        options: [
          "To write debug messages to disk",
          "To cache results of expensive function calls to avoid recomputing identical overlapping subproblems",
          "To eliminate the call stack entirely",
          "To randomize input arrays"
        ],
        correctAnswer: 1,
        explanation:
          "Memoization stores computed results for specific parameter states, transforming exponential time complexities into polynomial or linear time.",
        skill: "Problem Solving"
      },
      {
        id: 7,
        question: "Which graph traversal algorithm guarantees finding the shortest path in an unweighted graph?",
        options: [
          "Depth-First Search (DFS)",
          "Breadth-First Search (BFS)",
          "Topological Sort",
          "Kruskal's Algorithm"
        ],
        correctAnswer: 1,
        explanation:
          "BFS explores node levels layer by layer, guaranteeing the shortest path in terms of edge count in unweighted graphs.",
        skill: "Algorithms"
      },
      {
        id: 8,
        question: "In Python, what does the Global Interpreter Lock (GIL) prevent?",
        options: [
          "Multiple processes from reading the same file",
          "Multiple native OS threads from executing Python bytecode simultaneously within a single process",
          "Using external C libraries like NumPy",
          "Running recursive functions deeper than 10 levels"
        ],
        correctAnswer: 1,
        explanation:
          "The GIL is a mutex that protects Python objects, ensuring only one thread executes Python bytecode at a time, making multiprocessing ideal for CPU-bound tasks.",
        skill: "Python"
      }
    ]
  },
  {
    id: "test-data-science-machine-learning",
    slug: "data-science-machine-learning",
    title: "Data Science & AI Engineering",
    category: "Data Science & AI",
    difficulty: "Intermediate",
    description:
      "Test core understanding of machine learning principles, evaluation metrics, overfitting, vector embeddings, and generative AI prompt workflows.",
    durationMinutes: 15,
    totalQuestions: 8,
    passingScore: 70,
    skillsCovered: ["Machine Learning", "Model Evaluation", "Vector Embeddings", "Generative AI", "Data Preprocessing"],
    questions: [
      {
        id: 1,
        question: "When evaluating a classification model for a rare medical disease where false negatives are dangerous, which metric should be prioritized?",
        options: [
          "Accuracy",
          "Recall (Sensitivity)",
          "Specificity",
          "Precision alone"
        ],
        correctAnswer: 1,
        explanation:
          "Recall measures the proportion of actual positives that were correctly identified. High recall minimizes false negatives.",
        skill: "Model Evaluation"
      },
      {
        id: 2,
        question: "What is overfitting in machine learning, and how does regularization help?",
        options: [
          "The model fails to learn anything; regularization lowers the training time",
          "The model memorizes noise and specific patterns in training data; regularization penalizes large weights to encourage generalization",
          "The model has too few parameters; regularization doubles the dataset size",
          "The model only works on GPU hardware"
        ],
        correctAnswer: 1,
        explanation:
          "Overfitting occurs when a model learns training data details too closely. L1/L2 regularization penalizes extreme coefficients to improve generalization on unseen test data.",
        skill: "Machine Learning"
      },
      {
        id: 3,
        question: "In Modern AI and Retrieval-Augmented Generation (RAG), what is a vector embedding?",
        options: [
          "An SVG icon representing an AI model",
          "A dense numerical vector representing the semantic meaning and contextual relationships of text in high-dimensional space",
          "A compiled binary executable for PyTorch",
          "A database table with exactly three integer columns"
        ],
        correctAnswer: 1,
        explanation:
          "Vector embeddings map words, sentences, or documents into continuous vector spaces where semantically similar items are located close to each other (e.g. measured via cosine similarity).",
        skill: "Vector Embeddings"
      },
      {
        id: 4,
        question: "What is the primary function of the Self-Attention mechanism in Transformer architectures?",
        options: [
          "To downsample images before passing them to convolutional layers",
          "To allow every token in a sequence to dynamically weigh and attend to every other token based on contextual relevance",
          "To delete punctuation from prompt strings",
          "To compress floating-point numbers into 8-bit integers"
        ],
        correctAnswer: 1,
        explanation:
          "Self-attention computes attention weights between all token pairs in a sequence simultaneously, capturing long-range dependencies far more effectively than RNNs.",
        skill: "Generative AI"
      },
      {
        id: 5,
        question: "What does temperature control in Large Language Model (LLM) generation?",
        options: [
          "The CPU temperature of the server hosting the model",
          "The randomness and entropy of token selection from the probability distribution",
          "The maximum token count of the output",
          "The speed of network packet transmission"
        ],
        correctAnswer: 1,
        explanation:
          "Temperature scales logits before the softmax: lower temperature (e.g. 0.1) makes generation deterministic and focused; higher temperature (e.g. 0.9) increases diversity and creativity.",
        skill: "Generative AI"
      },
      {
        id: 6,
        question: "Why is one-hot encoding problematic for high-cardinality categorical features?",
        options: [
          "It converts numbers into strings",
          "It creates an explosion in feature dimensions, resulting in extreme sparsity and the curse of dimensionality",
          "It makes tree-based algorithms crash automatically",
          "It can only be used on binary columns"
        ],
        correctAnswer: 1,
        explanation:
          "For features with thousands of unique values, one-hot encoding adds thousands of sparse columns, drastically increasing memory and computation.",
        skill: "Data Preprocessing"
      },
      {
        id: 7,
        question: "What mathematical metric is standard for measuring similarity between two vector embeddings?",
        options: [
          "Cosine Similarity",
          "Hamming Distance on floats",
          "Standard Deviation",
          "Variance Ratio"
        ],
        correctAnswer: 0,
        explanation:
          "Cosine similarity calculates the cosine of the angle between two non-zero vectors, measuring directional alignment independent of magnitude.",
        skill: "Vector Embeddings"
      },
      {
        id: 8,
        question: "In RAG pipelines, what is 'Chunking' and why is it important?",
        options: [
          "Splitting large source documents into smaller coherent segments to fit within LLM context windows and preserve semantic relevance",
          "Deleting 50% of the training dataset to save disk space",
          "Merging multiple databases into a single CSV file",
          "Encrypting user queries before sending them to the model"
        ],
        correctAnswer: 0,
        explanation:
          "Chunking breaks large documents into semantically coherent passages, allowing vector search to retrieve precise relevant context for the LLM prompt.",
        skill: "Generative AI"
      }
    ]
  },
  {
    id: "test-devops-cloud-docker",
    slug: "devops-cloud-docker",
    title: "DevOps, Cloud & System Reliability",
    category: "DevOps & Cloud",
    difficulty: "Intermediate",
    description:
      "Evaluate knowledge of containerization with Docker, CI/CD pipeline automation, Kubernetes container orchestration, and cloud infrastructure.",
    durationMinutes: 15,
    totalQuestions: 8,
    passingScore: 70,
    skillsCovered: ["Docker", "CI/CD", "Kubernetes", "Cloud Infrastructure", "System Reliability"],
    questions: [
      {
        id: 1,
        question: "What is the primary difference between a Docker container and a traditional Virtual Machine (VM)?",
        options: [
          "Containers cannot run Linux applications",
          "Containers share the host operating system kernel and isolate user space, making them much more lightweight than VMs that bundle a full guest OS",
          "VMs do not use hypervisors",
          "Containers require dedicated physical hardware per container"
        ],
        correctAnswer: 1,
        explanation:
          "Containers leverage Linux cgroups and namespaces to isolate processes while sharing the host kernel, starting in seconds with minimal overhead compared to hypervisor VMs.",
        skill: "Docker"
      },
      {
        id: 2,
        question: "What is the benefit of multi-stage Docker builds?",
        options: [
          "They enable running multiple operating systems simultaneously",
          "They keep build tools (like compilers and package managers) in temporary stages and copy only final artifacts into a lean runtime image",
          "They prevent containers from needing network access",
          "They eliminate the need for a Dockerfile"
        ],
        correctAnswer: 1,
        explanation:
          "Multi-stage builds allow developers to compile code in one heavy image and copy only the binary or production bundle into a minimal base image (e.g. Alpine), reducing attack surface and image size.",
        skill: "Docker"
      },
      {
        id: 3,
        question: "In Kubernetes, what is a Pod?",
        options: [
          "A physical server rack inside a data center",
          "The smallest deployable computing unit in Kubernetes, encapsulating one or more tightly coupled containers with shared storage and network",
          "A Git repository for Helm charts",
          "A DNS server specifically for ingress controllers"
        ],
        correctAnswer: 1,
        explanation:
          "A Pod is the fundamental unit of deployment in Kubernetes, representing a running process on a cluster node with shared IP and storage volumes.",
        skill: "Kubernetes"
      },
      {
        id: 4,
        question: "What does the 'Continuous Integration' (CI) phase in modern DevOps prioritize?",
        options: [
          "Manually testing applications in production on weekends",
          "Automatically building, linting, and running automated test suites whenever code is committed to catch regressions early",
          "Purchasing more cloud servers every month",
          "Writing legal documentation for software releases"
        ],
        correctAnswer: 1,
        explanation:
          "CI automatically validates new code submissions against automated build and test suites, preventing broken code from accumulating on main branches.",
        skill: "CI/CD"
      },
      {
        id: 5,
        question: "What is Blue-Green deployment and what risk does it minimize?",
        options: [
          "Alternating button colors on the UI to test user preference",
          "Running two identical production environments (Blue active, Green new version) to achieve zero-downtime releases and instant rollback if issues occur",
          "Deploying code only on Mondays and Wednesdays",
          "Using two different cloud providers simultaneously"
        ],
        correctAnswer: 1,
        explanation:
          "Blue-Green deployment provisions the new release alongside the live version, switching router traffic instantly to achieve zero downtime and enabling instant rollback.",
        skill: "System Reliability"
      },
      {
        id: 6,
        question: "What is the purpose of Infrastructure as Code (IaC) tools like Terraform?",
        options: [
          "To translate JavaScript code into Go",
          "To define, provision, and version cloud infrastructure declaratively in code configuration files",
          "To monitor CPU usage on user laptops",
          "To replace all relational databases with static files"
        ],
        correctAnswer: 1,
        explanation:
          "IaC allows teams to manage servers, databases, networking, and DNS declaratively in source-controlled configurations, ensuring reproducible, auditable environments.",
        skill: "Cloud Infrastructure"
      },
      {
        id: 7,
        question: "In Kubernetes, what does a Deployment controller do when a Pod crashes or a node goes down?",
        options: [
          "It permanently disables the service",
          "It detects the discrepancy between desired state and actual state and schedules a new Pod to maintain the specified replica count",
          "It emails the cloud provider support team",
          "It halts all other running pods across the cluster"
        ],
        correctAnswer: 1,
        explanation:
          "The Kubernetes reconciliation loop continuously reconciles actual state with desired state, spinning up replacement pods automatically to maintain high availability.",
        skill: "Kubernetes"
      },
      {
        id: 8,
        question: "What is a major advantage of using an HTTPS Reverse Proxy (like NGINX or Traefik) in front of application servers?",
        options: [
          "It completely replaces application logic",
          "It handles TLS termination, load balancing, gzip compression, and rate limiting in a centralized, optimized layer",
          "It prevents the database from storing passwords",
          "It allows running Node.js without npm"
        ],
        correctAnswer: 1,
        explanation:
          "Reverse proxies offload SSL/TLS handshakes, distribute incoming traffic across upstream workers, buffer slow clients, and enforce security policies.",
        skill: "System Reliability"
      }
    ]
  }
];
