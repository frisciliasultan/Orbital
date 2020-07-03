Module Plan format:
Array of objects each containing information about the module

e.g. [
        {
            attributes: {su: true}
            department: "Accounting"
            description: "The course provides an introduction to financial accounting. It examines      accounting from an external user's perspective: an external user being an investor or a creditor. Such users would need to understand financial accounting in order to make investing or lending decisions. However, to attain a good understanding, it is also necessary to be familiar with how the information is derived. Therefore, students would learn how to prepare the reports or statements resulting from financial accounting and how to use them for decision-making."
            faculty: "NUS Business School"
            AY: 18/19 (or 18-19) (tentative)
            semester: 2
            moduleCode: "ACC1002"
            moduleCredit: "4"
            preclusion: "Students who have passed FNA1002 are not allowed to take ACC1002."
            semesterData: [{semester: 1, examDate: "2018-12-01T01:00:00.000Z", examDuration: 120}, {semester: 2}]
            title: "Financial Accounting"
            workload: [2, 2, 0, 3, 4]
        },

        {
            attributes: {su: true}
            department: "Computer Science"
            description: "This module introduces the fundamental concepts of problem solving by computing and programming using an imperative programming language. It is the first and foremost introductory course to computing.  Topics covered include computational thinking and computational problem solving, designing and specifying an algorithm, basic problem formulation and problem solving approaches, program development, coding, testing and debugging, fundamental programming constructs (variables, types, expressions, assignments, functions, control structures, etc.), fundamental data structures (arrays, strings, composite data types), basic sorting, and recursion."
            faculty: "Computing"
            AY: 18/19 (or 18-19) (tentative)
            semester: 2
            moduleCode: "CS1010"
            moduleCredit: "4"
            preclusion: "CS1010E, CS1010J, CS1010S, CS1010X, CS1010XCP, CS1101S"
            semesterData: [{…}, {…}, {…}]
            title: "Programming Methodology"
            workload: [2, 1, 1, 3, 3]
        }
]