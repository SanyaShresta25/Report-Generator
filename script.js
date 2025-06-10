// Student records data
const studentRecords = [
    { name: "Sanya Shresta", scores: [85, 92, 78, 88, 90] },
    { name: "Shravya Shetty", scores: [76, 82, 85, 79, 83] },
    { name: "Shachi Hegde", scores: [95, 88, 92, 96, 91] },
    { name: "Saanvi U", scores: [68, 72, 75, 70, 74] },
    { name: "Kushagr Sharma", scores: [88, 86, 90, 87, 89] },
    { name: "Shawn Bengher", scores: [79, 83, 77, 81, 85] }
];

/**
 * Get grade letter based on score
 * @param {number} score - The numerical score
 * @returns {string} - The letter grade
 */
function getGradeLetter(score) {
    if (score >= 90) return 'A';
    if (score >= 80) return 'B';
    if (score >= 70) return 'C';
    if (score >= 60) return 'D';
    return 'F';
}

/**
 * Get grade circle class for styling
 * @param {string} letter - The letter grade
 * @returns {string} - The CSS class name
 */
function getGradeClass(letter) {
    switch(letter) {
        case 'A': return 'grade-a';
        case 'B': return 'grade-b';
        case 'C': return 'grade-c';
        case 'D': return 'grade-d';
        case 'F': return 'grade-f';
        default: return 'grade-c';
    }
}

/**
 * Render student cards to the grid
 */
function renderStudentCards() {
    const grid = document.getElementById('studentGrid');
    grid.innerHTML = '';
    
    studentRecords.forEach((student, index) => {
        const average = student.scores.reduce((sum, score) => sum + score, 0) / student.scores.length;
        const gradeLetter = getGradeLetter(average);
        const gradeClass = getGradeClass(gradeLetter);

        const card = document.createElement('div');
        card.className = 'student-card';
        card.style.animationDelay = `${index * 0.1}s`;

        card.innerHTML = `
            <div class="grade-circle ${gradeClass}">${gradeLetter}</div>
            <div class="student-name"> ${student.name}</div>
            <div class="student-score">${average.toFixed(1)}</div>
            <div class="score-label">Average Score</div>
             
            <div style="margin-top: 15px; font-size: 13px; color: #666; text-align: center; padding: 10px; background: #f9f9f9; border-radius: 8px;">
                📊 Individual Scores: ${student.scores.join(' • ')}
            </div>
        `;
        grid.appendChild(card);
    });
}

/**
 * Update statistics display
 */
function updateStatistics() {
    const classAvg = calculateClassAverageForStats();
    const highPerfs = studentRecords.filter(student => {
        const avg = student.scores.reduce((sum, score) => sum + score, 0) / student.scores.length;
        return avg > 75;
    });

    document.getElementById('classAverage').textContent = classAvg.toFixed(1);
    document.getElementById('totalStudents').textContent = studentRecords.length;
    document.getElementById('highPerformers').textContent = highPerfs.length;
    document.getElementById('performanceRate').textContent = ((highPerfs.length / studentRecords.length) * 100).toFixed(1) + '%';
}

/**
 * Calculate class average for statistics
 * @returns {number} - The class average
 */
function calculateClassAverageForStats() {
    const totalScores = studentRecords.reduce((classTotal, student) => {
        return classTotal + student.scores.reduce((sum, score) => sum + score, 0);
    }, 0);
    const totalTests = studentRecords.reduce((total, student) => total + student.scores.length, 0);
    return totalScores / totalTests;
}

/**
 * Run loop demonstrations and display them as cards
 */
function runLoopDemonstrations() {
    const demoCards = document.getElementById('loopDemoCards');
    demoCards.innerHTML = '';

    const demos = [
        {
            title: "For Loop: Student Names",
            content: `<pre>// Using for loop to iterate through students
for (let i = 0; i < studentRecords.length; i++) {
    console.log(\`Student \${i + 1}: \${studentRecords[i].name}\`);
}

Output:
${studentRecords.map((student, i) => `Student ${i + 1}: ${student.name}`).join('\n')}</pre>`
        },
        {
            title: "While Loop: Score Calculation",
            content: `<pre>// Using while loop to calculate total score
let total = 0;
let index = 0;
const scores = [${studentRecords[0].scores.join(', ')}];

while (index < scores.length) {
    total += scores[index];
    index++;
}

Result for ${studentRecords[0].name}:
Total Score: ${studentRecords[0].scores.reduce((sum, score) => sum + score, 0)} points
Average: ${(studentRecords[0].scores.reduce((sum, score) => sum + score, 0) / studentRecords[0].scores.length).toFixed(1)}</pre>`
        },
        {
            title: "forEach: Student Scores Display",
            content: `<pre>// Using forEach to display each score
studentRecords[0].scores.forEach((score, index) => {
    console.log(\`Test \${index + 1}: \${score} points\`);
});

${studentRecords[0].name}'s Test Scores:
${studentRecords[0].scores.map((score, i) => `Test ${i + 1}: ${score} points`).join('\n')}</pre>`
        },
        {
            title: "Filter: High Performers",
            content: `<pre>// Using filter to find high performing students
const highPerformers = studentRecords.filter(student => {
    const avg = student.scores.reduce((sum, s) => sum + s, 0) / student.scores.length;
    return avg > 85;
});

High Performers (Average > 85):
${studentRecords.filter(student => {
    const avg = student.scores.reduce((sum, score) => sum + score, 0) / student.scores.length;
    return avg > 85;
}).map(student => {
    const avg = student.scores.reduce((sum, score) => sum + score, 0) / student.scores.length;
    return `${student.name}: ${avg.toFixed(1)} average`;
}).join('\n')}</pre>`
        },
        {
            title: "Map: Uppercase Names",
            content: `<pre>// Using map to transform student names
const uppercaseNames = studentRecords.map(student => {
    return student.name.toUpperCase();
});

Name Transformation:
${studentRecords.map(student => `${student.name} → ${student.name.toUpperCase()}`).join('\n')}</pre>`
        },
        {
            title: "Reduce: Class Average",
            content: `<pre>// Using reduce to calculate class average
const classAvg = studentRecords.reduce((total, student) => {
    const studentTotal = student.scores.reduce((sum, score) => sum + score, 0);
    return total + studentTotal;
}, 0) / totalTests;

Class Statistics:
Class Average: ${calculateClassAverageForStats().toFixed(2)}
Total Students: ${studentRecords.length}
Total Test Scores: ${studentRecords.reduce((total, student) => total + student.scores.length, 0)}</pre>`
        }
    ];

    demos.forEach((demo, index) => {
        const card = document.createElement('div');
        card.className = 'loop-demo-card';
        card.style.animationDelay = `${index * 0.1}s`;
        card.innerHTML = `
            <div class="demo-title">${demo.title}</div>
            <div class="demo-content">${demo.content}</div>
        `;
        demoCards.appendChild(card);
    });

    demoCards.classList.remove('hidden');
    demoCards.scrollIntoView({ behavior: 'smooth', block: 'start' });
}


/**
 * Initialize the application
 */
function initializeApp() {
    renderStudentCards();
    updateStatistics();

    setTimeout(() => {
        const cards = document.querySelectorAll('.student-card');
        cards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
        });
    }, 100);
}

// Initialize the report when page loads
window.addEventListener('load', initializeApp);

// Add interactive hover effects
document.addEventListener('DOMContentLoaded', function() {
    document.addEventListener('mouseover', function(e) {
        if (e.target.closest('.student-card')) {
            e.target.closest('.student-card').style.transform = 'translateY(-5px)';
        }
    });

    document.addEventListener('mouseout', function(e) {
        if (e.target.closest('.student-card')) {
            e.target.closest('.student-card').style.transform = 'translateY(0)';
        }
    });
});
