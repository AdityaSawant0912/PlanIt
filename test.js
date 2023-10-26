const natural = require('natural');
const chrono = require('chrono-node');
const nlp = require('compromise');

const sentence = "Buy groceries ";

// const sentence = 'I need to buy groceries and do laundry tomorrow'

// Create a tokenizer to split the sentence into words
const tokenizer = new natural.WordTokenizer();
const regex = /(\d+)\s*(hours*|hrs*|h)\s*(\d+)\s*(minutes*|mins*|m)?/i;
const match = sentence.match(regex);
// Extract the task description
const doc = nlp(sentence);
const title = doc.verbs().out('text');
// Tokenize the sentence and extract the relevant keywords
const tokens = tokenizer.tokenize(sentence);
const keywords = natural.PorterStemmer.stem(sentence);

// Extract the due date using Chrono-Node

// Extract the duration using Chrono-Node
let minsRegex = /\s*(\d+)\s*(minutes*|mins*|m|minute*)/i;
let hoursRegex = /\s*(\d+)\s*(hours*|hrs*|h|hour*)/i;
let priorityRegex = /(?:low|normal|medium|high)\s+priority|\bpriority\s+(?:low|normal|medium|high)\b/i;
let priorityMatch = sentence.match(priorityRegex) ? sentence.match(priorityRegex)[0] ? sentence.match(priorityRegex)[0].toLowerCase().split('priority') : null  : null;
priorityMatch = priorityMatch ? priorityMatch.filter((item) => item != '') : null;
priorityMatch = priorityMatch ? priorityMatch.map((item) => item.trim()) : null;
priorityMatch = priorityMatch ? priorityMatch[0] : null;
console.log(priorityMatch);
// Extract the duration using the regular expression
let mins = sentence.match(minsRegex)? sentence.match(minsRegex)[1] : 0;
let hours = sentence.match(hoursRegex)? sentence.match(hoursRegex)[1] : 0;
if(mins > 60) {
  hours += Math.floor(mins / 60);
  mins = mins % 60;
}

const duration_hour = parseInt(hours);
const duration_minutes = parseInt(mins);

// Set default values for priority, completed and deleted
let p = 1
if(priorityMatch) {
  
  switch (priorityMatch.toLowerCase()) {
    case 'low':
      p = -1;
      break;
    case 'normal':
      p = 0;
      break;
    case 'medium':
      p = 1;
      break;
    case 'high':
      p = 2;
      break;
  }
  console.log(p);
  
}
console.log(p);
let priority = p;
let completed = false;
let deleted = false;

function extractTitle(text) {

  const doc = nlp(text);
  const taskPhrase = doc.match('#Verb #Adverb? #Adjective? #Noun+');
  if (taskPhrase.found) {
    return taskPhrase.out('text');
  } else {
    return null;
  }

  return taskTitle;
}


// Create the task object
const task = {
  Title: extractTitle(sentence),
  User: 'user_id',
  Due: dueDate,
  Start: new Date(),
  Duration_Minutes: duration_minutes,
  Duration_Hours: duration_hour,
  Description: '',
  Priority: priority,
  Completed: completed,
  Deleted: deleted,
};

console.log(task);


// Define the text containing the duration
const text = "100 hr 200 mins  ";

// Hello worl
