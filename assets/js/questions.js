// Question array. This is a large array of question objects used in the quiz.
// Separated into its own file as it is very large.
var questionSelector = [
  {
    question: "Which HTML tag do you use for Javascript code?",
    a: "<code>",
    b: "<javascript>",
    c: "<script>",
    d: '<div type="javascript">',
    answer: "c",
  },
  {
    question: "Which of the following is NOT a valid primitive type?",
    a: "character",
    b: "undefined",
    c: "number",
    d: "string",
    answer: "a",
  },
  {
    question:
      "How would the following expression be evaluated? <br> (0 && (null || 1))",
    a: "undefined",
    b: "null",
    c: "true",
    d: "false",
    answer: "d",
  },
  {
    question: "What is the function of the % operator?",
    a: "concatenate",
    b: "division",
    c: "modulo",
    d: "percent",
    answer: "c",
  },
  {
    question:
      "How would the following expression be evaluated? <br> ('10' + 10)",
    a: "20",
    b: "1010",
    c: "'10'10",
    d: "undefined",
    answer: "b",
  },
  {
    question: "Which function would you use to store an object as a string?",
    a: "JSON.stringify()",
    b: "json.parse()",
    c: "JSON.makestring()",
    d: "JASON.string()",
    answer: "a",
  },
  {
    question:
      "How would you access the value 'five' in the following array? <br> arr = [ 4, '5', 'five', five, 'six']",
    a: "arr[3]",
    b: "arr['five']",
    c: "arr.3",
    d: "arr[2]",
    answer: "d",
  },
  {
    question: "Which method do you use to set up a delayed action?",
    a: "timeOut()",
    b: "setTimeout()",
    c: "setinterval()",
    d: "setDelay()",
    answer: "b",
  },
  {
    question: "Which of the values below is truthy?",
    a: "'false'",
    b: "0",
    c: "false",
    d: "undefined",
    answer: "a",
  },
  {
    question: "Which of the following will evaluate to true?",
    a: "'5' == 5",
    b: "'five' == five",
    c: "'10' === 5",
    d: "10 = 10",
    answer: "a",
  },
];

//   question object template below

//   {
//     question: "This is a template for a test question. B is the correct answer.",
//     a: "a tricky, but ultimately incorrect answer",
//     b: "a correct answer",
//     c: "a wrong answer",
//     d: "another incorrect answer",
//     answer: "b",
//   },
