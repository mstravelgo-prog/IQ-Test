// script.js
// IQ Test App — Blue theme, 100 stored questions, ask 10 random per test,
// Skip support, scaled IQ calculation (80 - 140), and result + feedback.

// ---------- CONFIG ----------
const TOTAL_IN_BANK = 100;   // number stored in QUESTIONS (must match length)
const QUESTIONS_PER_TEST = 10; // ask 10 random unique questions
const TIMER_ENABLED = false; // set true to enable per-question countdown
const TIME_PER_Q = 25; // seconds (if timer enabled)
const IQ_MIN = 80;
const IQ_MAX = 140;

// ---------- QUESTIONS (100 items) ----------
// NOTE: This array must contain 100 objects. Each has {id,question,options:[4],answer}
const QUESTIONS = [
  { id: 1, question: "What comes next in the series: 2, 4, 8, 16, ?", options: ["18", "20", "24", "32"], answer: "32" },
  { id: 2, question: "If CAT = 24 and DOG = 26, then BAT = ?", options: ["22", "23", "25", "27"], answer: "23" },
  { id: 3, question: "Which shape has the most sides?", options: ["Triangle", "Square", "Hexagon", "Pentagon"], answer: "Hexagon" },
  { id: 4, question: "If you rearrange the letters of 'LISTEN', you get the word:", options: ["SILENT", "STONE", "TINSEL", "LINES"], answer: "SILENT" },
  { id: 5, question: "Which number is odd one out: 3, 5, 7, 9, 11?", options: ["3", "5", "7", "9"], answer: "9" },
  { id: 6, question: "If 5 pencils cost ₹25, how many pencils can you buy for ₹100?", options: ["15", "20", "25", "30"], answer: "20" },
  { id: 7, question: "Find the missing number: 4, 9, 16, 25, ?", options: ["30", "35", "36", "49"], answer: "36" },
  { id: 8, question: "Which day comes 2 days after Monday?", options: ["Tuesday", "Wednesday", "Thursday", "Friday"], answer: "Wednesday" },
  { id: 9, question: "If John is older than Sam and Sam is older than Lucy, who is the youngest?", options: ["John", "Sam", "Lucy", "All same age"], answer: "Lucy" },
  { id: 10, question: "Which is heavier: 1 kg of cotton or 1 kg of iron?", options: ["Iron", "Cotton", "Same weight", "Cannot say"], answer: "Same weight" },
  { id: 11, question: "If 6 + 4 = 210, 9 + 2 = 711, 7 + 3 = ?", options: ["510", "56", "410", "57"], answer: "410" },
  { id: 12, question: "How many months have 31 days?", options: ["5", "6", "7", "8"], answer: "7" },
  { id: 13, question: "Which is the next number in the pattern: 1, 1, 2, 3, 5, 8, ?", options: ["11", "12", "13", "14"], answer: "13" },
  { id: 14, question: "Which word is different from others: Apple, Mango, Banana, Carrot?", options: ["Apple", "Mango", "Banana", "Carrot"], answer: "Carrot" },
  { id: 15, question: "If in a code, CAT = 3120, then BAT = ?", options: ["2120", "3120", "2119", "3121"], answer: "2120" },
  { id: 16, question: "Find the odd one: Square, Circle, Triangle, Cube.", options: ["Square", "Circle", "Triangle", "Cube"], answer: "Cube" },
  { id: 17, question: "Which of the following is not a prime number?", options: ["2", "3", "9", "11"], answer: "9" },
  { id: 18, question: "What comes next in the pattern: A, C, F, J, O, ?", options: ["P", "T", "U", "V"], answer: "U" },
  { id: 19, question: "If you divide 30 by half and add 10, what is the result?", options: ["25", "40", "50", "70"], answer: "70" },
  { id: 20, question: "Which number is missing: 3, 6, 9, 15, 24, ?", options: ["30", "33", "36", "39"], answer: "39" },
  { id: 21, question: "If 2x = 10, what is x?", options: ["2", "4", "5", "10"], answer: "5" },
  { id: 22, question: "Which planet is known as the Red Planet?", options: ["Venus", "Mars", "Jupiter", "Mercury"], answer: "Mars" },
  { id: 23, question: "Which one is different: 2, 4, 8, 16, 33?", options: ["2", "4", "16", "33"], answer: "33" },
  { id: 24, question: "If a clock shows 3:15, what is the angle between hour and minute hand?", options: ["0°", "7.5°", "15°", "30°"], answer: "7.5°" },
  { id: 25, question: "Which word does not belong: Winter, Summer, April, Autumn?", options: ["Winter", "Summer", "April", "Autumn"], answer: "April" },
  { id: 26, question: "If 12 × 12 = 144, then 14 × 14 = ?", options: ["154", "164", "196", "176"], answer: "196" },
  { id: 27, question: "If you have 3 apples and take away 2, how many do you have?", options: ["1", "2", "3", "0"], answer: "2" },
  { id: 28, question: "Find the missing number: 5, 10, 20, 40, ?", options: ["60", "70", "80", "100"], answer: "80" },
  { id: 29, question: "Which number completes the pattern: 11, 13, 17, 19, ?", options: ["21", "23", "25", "27"], answer: "23" },
  { id: 30, question: "If you spell 'COW' backward, what do you get?", options: ["WOC", "OWC", "CWO", "None"], answer: "WOC" },
  { id: 31, question: "What is the cube of 3?", options: ["6", "9", "27", "18"], answer: "27" },
  { id: 32, question: "If A=1, B=2, C=3... then the sum of letters in CAT is?", options: ["22", "24", "26", "28"], answer: "24" },
  { id: 33, question: "Which one is a palindrome?", options: ["MOM", "DOG", "SUN", "CAT"], answer: "MOM" },
  { id: 34, question: "Which shape has no corners?", options: ["Triangle", "Rectangle", "Circle", "Square"], answer: "Circle" },
  { id: 35, question: "Find the odd one: 121, 144, 169, 225.", options: ["121", "144", "169", "225"], answer: "225" },
  { id: 36, question: "If 8 + 2 = 1610, then 6 + 3 = ?", options: ["54", "63", "69", "96"], answer: "69" },
  { id: 37, question: "If a train travels 60 km in 1 hour, how long will it take to go 180 km?", options: ["2 hours", "3 hours", "4 hours", "5 hours"], answer: "3 hours" },
  { id: 38, question: "Which letter comes next: A, D, G, J, ?", options: ["L", "M", "N", "O"], answer: "M" },
  { id: 39, question: "Which of these is not a mammal?", options: ["Whale", "Bat", "Frog", "Human"], answer: "Frog" },
  { id: 40, question: "What is 15% of 200?", options: ["15", "20", "25", "30"], answer: "30" },
  { id: 41, question: "Which number fits: 1, 4, 9, 16, ?", options: ["20", "24", "25", "30"], answer: "25" },
  { id: 42, question: "If red = 1, blue = 2, green = 3, what is color number of blue?", options: ["1", "2", "3", "4"], answer: "2" },
  { id: 43, question: "Find the missing letter: A, C, F, J, ?", options: ["K", "L", "M", "N"], answer: "O" },
  { id: 44, question: "If 7×3 = 21, 7×4 = 28, then 7×5 = ?", options: ["30", "32", "35", "40"], answer: "35" },
  { id: 45, question: "Which is different: Book, Pen, Notebook, Apple?", options: ["Book", "Pen", "Notebook", "Apple"], answer: "Apple" },
  { id: 46, question: "If 9 + 1 = 910, then 5 + 2 = ?", options: ["52", "25", "57", "510"], answer: "57" },
  { id: 47, question: "If 3 birds are sitting and 2 fly away, how many remain?", options: ["1", "2", "3", "0"], answer: "1" },
  { id: 48, question: "Which is largest: 2/3, 3/4, 4/5, 5/6?", options: ["2/3", "3/4", "4/5", "5/6"], answer: "5/6" },
  { id: 49, question: "Which number is the odd one: 11, 13, 17, 21?", options: ["11", "13", "17", "21"], answer: "21" },
  { id: 50, question: "What is the square root of 81?", options: ["7", "8", "9", "10"], answer: "9" },
  { id: 51, question: "Find the next number: 7, 14, 28, 56, ?", options: ["70", "112", "96", "84"], answer: "112" },
  { id: 52, question: "Which of the following words is an antonym of 'scarce'?", options: ["Rare", "Abundant", "Sparse", "Limited"], answer: "Abundant" },
  { id: 53, question: "If SUNDAY = 7 letters, then TUESDAY has how many letters?", options: ["6", "7", "8", "5"], answer: "7" },
  { id: 54, question: "Complete series: 2, 6, 12, 20, 30, ?", options: ["40", "42", "44", "36"], answer: "42" },
  { id: 55, question: "If MANGO is coded as 53142, what would APPLE be (same mapping)?", options: ["15542", "11441", "51124", "Not enough info"], answer: "Not enough info" },
  { id: 56, question: "Which figure comes next? (verbal): Think rotating a triangle 90° each time — after 3 rotations it points down — next it points left. Which direction is after left?", options: ["Up", "Right", "Down", "Left"], answer: "Up" },
  { id: 57, question: "Which statement is true? 'All squares are rectangles' and 'All rectangles are squares'.", options: ["Both true", "Only first true", "Only second true", "Both false"], answer: "Only first true" },
  { id: 58, question: "What is 7 × 8 − 15 ?", options: ["41", "41", "49", "56"], answer: "41" },
  { id: 59, question: "If the day after tomorrow is two days before Thursday, what day is today?", options: ["Sunday", "Monday", "Tuesday", "Wednesday"], answer: "Sunday" },
  { id: 60, question: "Choose the odd one: 2, 3, 5, 8, 11, 13", options: ["2", "3", "8", "11"], answer: "8" },
  { id: 61, question: "Which option is a synonym for 'rapid'?", options: ["Slow", "Quick", "Late", "Sluggish"], answer: "Quick" },
  { id: 62, question: "Find next: 10, 9, 7, 4, 0, ?", options: ["-5", "-1", "1", "-2"], answer: "-5" },
  { id: 63, question: "A is twice as old as B. If B is 10, A is?", options: ["10", "15", "20", "12"], answer: "20" },
  { id: 64, question: "If all roses are flowers and some flowers fade fast, can we say 'some roses fade fast'?", options: ["Yes", "No", "Only if stated", "Impossible"], answer: "Only if stated" },
  { id: 65, question: "If 4 workers build 4 tables in 4 days, how many days for 2 workers to build 2 tables (same rate)?", options: ["2", "4", "1", "8"], answer: "4" },
  { id: 66, question: "If 100% = 1, what is 12.5% as a fraction?", options: ["1/4", "1/8", "1/6", "1/10"], answer: "1/8" },
  { id: 67, question: "Find the odd one: Blender, Toaster, Fridge, Carrot", options: ["Blender", "Toaster", "Fridge", "Carrot"], answer: "Carrot" },
  { id: 68, question: "Which is the smallest prime above 50?", options: ["51", "53", "55", "57"], answer: "53" },
  { id: 69, question: "What comes next: Z, X, V, T, ?", options: ["S", "R", "P", "Q"], answer: "R" },
  { id: 70, question: "If 3 rectangles have area 12, and base 3, height is?", options: ["2", "3", "4", "5"], answer: "4" },
  { id: 71, question: "If a code shifts each letter by +1 (A→B), what does 'CAT' become?", options: ["DBU", "DBV", "DBS", "DBT"], answer: "DBU" },
  { id: 72, question: "Which number is the product of 9 and 7?", options: ["56", "63", "72", "49"], answer: "63" },
  { id: 73, question: "Choose the pair with same relation: Cat : Kitten as Dog : ?", options: ["Puppy", "Calf", "Foal", "Cub"], answer: "Puppy" },
  { id: 74, question: "Find missing: 2, 5, 10, 17, 26, ?", options: ["36", "37", "35", "38"], answer: "37" },
  { id: 75, question: "Which is not like the others: Circle, Sphere, Ball, Cube?", options: ["Circle", "Sphere", "Ball", "Cube"], answer: "Cube" },
  { id: 76, question: "A, B, C are in a line. If B is between A and C, which statement is true?", options: ["A between B and C", "B between A and C", "C between A and B", "None"], answer: "B between A and C" },
  { id: 77, question: "Which two-digit number is same when digits reversed? (palindromic)", options: ["11", "12", "21", "10"], answer: "11" },
  { id: 78, question: "If you subtract 17 from 100, you get:", options: ["83", "87", "73", "93"], answer: "83" },
  { id: 79, question: "Which instrument measures temperature?", options: ["Barometer", "Thermometer", "Hygrometer", "Ammeter"], answer: "Thermometer" },
  { id: 80, question: "If today is Friday, 3 days later will be:", options: ["Sunday", "Monday", "Tuesday", "Saturday"], answer: "Monday" },
  { id: 81, question: "Which of these is a multiple of 7?", options: ["49", "45", "51", "53"], answer: "49" },
  { id: 82, question: "If the code for BLUE is 2655, and for RED is 185, which color might be 1855? (pattern guess)", options: ["RED + Blue mix", "Pink", "Not enough info", "Purple"], answer: "Not enough info" },
  { id: 83, question: "What is half of 2/3?", options: ["1/3", "1/2", "1/4", "2/3"], answer: "1/3" },
  { id: 84, question: "Choose the logical next: 100, 90, 80, 70, ?", options: ["60", "65", "50", "55"], answer: "60" },
  { id: 85, question: "Which is the longest river (generally considered)?", options: ["Nile", "Amazon", "Ganges", "Yangtze"], answer: "Nile" },
  { id: 86, question: "If a shop gives 10% discount on ₹500, final price is:", options: ["₹450", "₹490", "₹400", "₹475"], answer: "₹450" },
  { id: 87, question: "Which of these is a square number?", options: ["18", "20", "25", "30"], answer: "25" },
  { id: 88, question: "Which completes pattern: 1A, 2B, 3C, 4D, ?", options: ["5E", "5D", "6E", "4E"], answer: "5E" },
  { id: 89, question: "If weight increases, mass:", options: ["Decreases", "Stays same", "Increases", "Cannot say"], answer: "Stays same" },
  { id: 90, question: "A rectangle has length 8 and width 3. Area is:", options: ["11", "24", "22", "16"], answer: "24" },
  { id: 91, question: "If you mix red and blue paint, you get:", options: ["Green", "Purple", "Orange", "Yellow"], answer: "Purple" },
  { id: 92, question: "Which country is famous for the Eiffel Tower?", options: ["Italy", "France", "UK", "Germany"], answer: "France" },
  { id: 93, question: "What is 25 × 4?", options: ["100", "75", "125", "90"], answer: "100" },
  { id: 94, question: "If the sequence increases by +2, +4, +6..., starting 1: 1,3,7,13,?", options: ["19", "21", "20", "22"], answer: "21" },
  { id: 95, question: "Which of these items does not belong to the same category: Fork, Knife, Spoon, Plate?", options: ["Fork", "Knife", "Spoon", "Plate"], answer: "Plate" },
  { id: 96, question: "Which is an even prime number?", options: ["1", "2", "3", "5"], answer: "2" },
  { id: 97, question: "If you roll two dice, maximum total is:", options: ["6", "12", "18", "10"], answer: "12" },
  { id: 98, question: "Find missing: 14, 28, 56, ?, 224", options: ["112", "96", "84", "128"], answer: "112" },
  { id: 99, question: "Which gas do we breathe in to survive?", options: ["Carbon dioxide", "Oxygen", "Nitrogen", "Hydrogen"], answer: "Oxygen" },
  { id: 100, question: "If you have 8 coins and remove 3, how many left?", options: ["5", "6", "3", "4"], answer: "5" }
];

// ---------- Utility functions ----------
function shuffleArray(arr) {
  // Fisher–Yates
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function chooseN(arr, n) {
  // Return n unique random items from arr
  return shuffleArray(arr.slice()).slice(0, n);
}

// ---------- DOM ----------
const quizCard = document.getElementById('quizCard');
const resultCard = document.getElementById('resultCard');

const progressText = document.getElementById('progressText');
const progressFill = document.getElementById('progressFill');
const questionText = document.getElementById('questionText');
const questionNumber = document.getElementById('questionNumber');
const optionsWrap = document.getElementById('options');
const skipBtn = document.getElementById('skipBtn');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');
const feedback = document.getElementById('feedback');
const timerEl = document.getElementById('timer');

const scoreSummary = document.getElementById('scoreSummary');
const iqBox = document.getElementById('iqBox');
const interpretation = document.getElementById('interpretation');
const restartBtn = document.getElementById('restartBtn');
const reviewBtn = document.getElementById('reviewBtn');
const reviewList = document.getElementById('reviewList');

// ---------- State ----------
let testQuestions = []; // the 10 selected
let currentIndex = 0;
let answers = []; // {id, selected, correct, skipped}
let timerInterval = null;
let timeLeft = TIME_PER_Q;

// ---------- Main init ----------
function initTest() {
  // pick QUESTIONS_PER_TEST random questions from bank
  if (QUESTIONS.length < QUESTIONS_PER_TEST) {
    alert('Not enough questions in the bank.');
    return;
  }
  testQuestions = chooseN(QUESTIONS, QUESTIONS_PER_TEST).map(q => {
    // clone and shuffle options for each question to avoid memorized option order
    const opts = shuffleArray(q.options.slice());
    return { ...q, options: opts };
  });

  // reset state
  currentIndex = 0;
  answers = testQuestions.map(q => ({ id: q.id, selected: null, correct: false, skipped: false }));
  quizCard.classList.remove('hidden');
  resultCard.classList.add('hidden');
  reviewList.classList.add('hidden');
  reviewList.innerHTML = '';
  renderQuestion();
}

// ---------- Render ----------
function renderQuestion() {
  const qObj = testQuestions[currentIndex];
  const ua = answers[currentIndex];
  const qNo = currentIndex + 1;
  progressText.textContent = `Question ${qNo} / ${testQuestions.length}`;
  progressFill.style.width = `${(qNo / testQuestions.length) * 100}%`;
  questionNumber.textContent = `Q${qNo}`;
  questionText.textContent = qObj.question;

  optionsWrap.innerHTML = '';
  qObj.options.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.setAttribute('data-value', opt);
    btn.innerHTML = `<span class="option-label">${String.fromCharCode(65 + i)}. ${opt}</span>`;
    if (ua.selected === opt) btn.classList.add('selected');
    btn.addEventListener('click', () => selectOption(opt));
    optionsWrap.appendChild(btn);
  });

  // controls
  nextBtn.disabled = (ua.selected === null && !ua.skipped);
  prevBtn.disabled = currentIndex === 0;
  feedback.textContent = '';

  // timer handling
  if (TIMER_ENABLED) {
    clearInterval(timerInterval);
    timeLeft = TIME_PER_Q;
    timerEl.textContent = `${timeLeft}s`;
    timerInterval = setInterval(() => {
      timeLeft--;
      timerEl.textContent = `${timeLeft}s`;
      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        doSkip(true);
      }
    }, 1000);
  } else {
    timerEl.textContent = '';
    clearInterval(timerInterval);
  }
}

// ---------- Interactions ----------
function selectOption(opt) {
  const qObj = testQuestions[currentIndex];
  const ua = answers[currentIndex];
  ua.selected = opt;
  ua.skipped = false;
  ua.correct = (opt === qObj.answer);
  // mark UI selected
  document.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
  const chosen = [...document.querySelectorAll('.option-btn')].find(b => b.getAttribute('data-value') === opt);
  if (chosen) chosen.classList.add('selected');
  nextBtn.disabled = false;
  feedback.textContent = '';
}

function doSkip(auto = false) {
  const ua = answers[currentIndex];
  ua.selected = null;
  ua.skipped = true;
  ua.correct = false;
  nextBtn.disabled = false;
  feedback.textContent = auto ? 'Skipped (timer).' : 'Skipped';
}

function goNext() {
  if (currentIndex < testQuestions.length - 1) {
    currentIndex++;
    renderQuestion();
  } else {
    finishTest();
  }
}

function goPrev() {
  if (currentIndex > 0) {
    currentIndex--;
    renderQuestion();
  }
}

// ---------- Finish and scoring ----------
function finishTest() {
  clearInterval(timerInterval);
  // scoring
  const correctCount = answers.reduce((s, a) => s + (a.correct ? 1 : 0), 0);
  const skippedCount = answers.reduce((s, a) => s + (a.skipped ? 1 : 0), 0);

  // scaled IQ: linear map from 0..QUESTIONS_PER_TEST -> IQ_MIN..IQ_MAX
  const iq = Math.round(IQ_MIN + (correctCount / QUESTIONS_PER_TEST) * (IQ_MAX - IQ_MIN));

  // show results
  quizCard.classList.add('hidden');
  resultCard.classList.remove('hidden');

  scoreSummary.innerHTML = `<strong>Correct:</strong> ${correctCount} / ${QUESTIONS_PER_TEST} &nbsp; • &nbsp; <strong>Skipped:</strong> ${skippedCount}`;
  iqBox.textContent = `Your IQ: ${iq}`;
  interpretation.textContent = interpretIQ(iq, correctCount);

  // prepare review list
  reviewList.innerHTML = '';
  testQuestions.forEach((q, i) => {
    const ua = answers[i];
    const item = document.createElement('div');
    item.style.padding = '8px 0';
    item.innerHTML = `<strong>Q${i+1}:</strong> ${q.question}
      <br><em>Your:</em> ${ua.skipped ? '<span style="color:var(--muted)">Skipped</span>' : (ua.selected ?? '—')}
      <br><em>Correct:</em> ${q.answer}
      <hr style="border:none;border-top:1px dashed rgba(11,99,255,0.06);margin:8px 0">`;
    reviewList.appendChild(item);
  });
}

// Simple interpretation text based on IQ / raw score
function interpretIQ(iq, correctCount) {
  const pct = (correctCount / QUESTIONS_PER_TEST) * 100;
  let label;
  if (iq >= 130) label = 'Genius / Very superior reasoning.';
  else if (iq >= 120) label = 'Very high reasoning ability.';
  else if (iq >= 110) label = 'Above average reasoning.';
  else if (iq >= 100) label = 'Average to above average.';
  else if (iq >= 90) label = 'Below average — room to improve.';
  else label = 'Low — practice logic and basic arithmetic.';
  return `${label} (${correctCount}/${QUESTIONS_PER_TEST} — ${Math.round(pct)}%)`;
}

// ---------- Events ----------
skipBtn.addEventListener('click', () => doSkip(false));
nextBtn.addEventListener('click', () => goNext());
prevBtn.addEventListener('click', () => goPrev());
restartBtn.addEventListener('click', () => initTest());
reviewBtn.addEventListener('click', () => reviewList.classList.toggle('hidden'));

// keyboard support: 1-4 or A-D to select, S skip, N next, P prev
document.addEventListener('keydown', (e) => {
  const key = e.key.toLowerCase();
  const q = testQuestions[currentIndex];
  if (!q) return;
  if (['1','2','3','4','a','b','c','d'].includes(key)) {
    let idx = -1;
    if ('1234'.includes(key)) idx = parseInt(key) - 1;
    if ('abcd'.includes(key)) idx = 'abcd'.indexOf(key);
    if (idx >= 0 && idx < q.options.length) {
      selectOption(q.options[idx]);
    }
  } else if (key === 's') {
    doSkip(false);
  } else if (key === 'n') {
    nextBtn.click();
  } else if (key === 'p') {
    prevBtn.click();
  }
});

// ---------- start ----------
window.addEventListener('load', () => {
  // ensure QUESTIONS length expected
  if (QUESTIONS.length < TOTAL_IN_BANK) {
    console.warn('QUESTIONS length less than TOTAL_IN_BANK. Adjust TOTAL_IN_BANK or provide more questions.');
  }
  initTest();
});
