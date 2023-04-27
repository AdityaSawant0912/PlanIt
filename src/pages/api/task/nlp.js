
const nlp = require('compromise');
// Sample natural language sentence
const chrono = require('chrono-node');

function getDates(sentence) {
  const dates = chrono.parse(sentence);
  console.log(dates);
  if(dates.length === 0) return { start_date: new Date(), due_date: new Date() };
  let start_date = new Date(dates[0].start?.date()) || new Date();

  let due_date = new Date(dates[0].end?.date()) || new Date();
  console.log(start_date, due_date);
  return { start_date, due_date:  due_date};
}


function getTitle(text) {
  const doc = nlp(text);
  const taskPhrase = doc.match('#Verb #Adverb? #Adjective? #Noun+');
  if (taskPhrase.found) {
    return { title: taskPhrase.out('text') };
  } else {
    return { title: '' };
  }
}

function getPriority(sentence) {
  let priorityRegex = /(?:low|normal|medium|high)\s+priority|\bpriority\s+(?:low|normal|medium|high)\b/i;
  
  let priorityMatch = sentence.match(priorityRegex) ? sentence.match(priorityRegex)[0] ? sentence.match(priorityRegex)[0]?.toLowerCase().split('priority') : null : null;
  priorityMatch = priorityMatch ? priorityMatch.filter((item) => item != '') : null;
  priorityMatch = priorityMatch ? priorityMatch.map((item) => item.trim()) : null;
  priorityMatch = priorityMatch ? priorityMatch[0] : null;
  let p = 1
  if (priorityMatch) {

    switch (priorityMatch.toLowerCase()) {
      case 'low':
        p = 0;
        break;
      case 'normal':
        p = 1;
        break;
      case 'medium':
        p = 2;
        break;
      case 'high':
        p = 3;
        break;
    }
    

  }
  
  return { priority: p };
}

function getDuration(sentence) {
  let minsRegex = /\s*(\d+)\s*(minutes*|mins*|m|minute*)/i;
  let hoursRegex = /\s*(\d+)\s*(hours*|hrs*|h|hour*)/i;
  let mins = sentence.match(minsRegex) ? sentence.match(minsRegex)[1] : 0;
  let hours = sentence.match(hoursRegex) ? sentence.match(hoursRegex)[1] : 0;
  if (mins > 60) {
    hours += Math.floor(mins / 60);
    mins = mins % 60;
  }

  const duration_hour = parseInt(hours);
  const duration_minutes = parseInt(mins);
  return { duration_hour, duration_minutes };
}


export default async function handler(req, res) {

  if(req.method !== 'POST') return res.status(405).json({message: 'Method not allowed'});

  const sentence = req.body.sentence;
  // let sentence = 'Do homework with high priority due tomorrow at 5pm';

  


  const task = { ...getTitle(sentence), ...getDates(sentence), ...getPriority(sentence), ...getDuration(sentence) };
  
  res.status(200).json(task);

} 