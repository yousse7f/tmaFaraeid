function toggleMenu() {
    var sidenav = document.getElementById('sidenav');
    sidenav.style.display = (sidenav.style.display == 'none' || sidenav.style.display == '') ? 'block' : 'none';
}

// تحوي لالارقام الهندية الى العربية في حال تم ادخال الارقام الهندية
document.addEventListener("DOMContentLoaded", () => {
    const hindiToArabicMap = {
        '٠': '0',
        '١': '1',
        '٢': '2',
        '٣': '3',
        '٤': '4',
        '٥': '5',
        '٦': '6',
        '٧': '7',
        '٨': '8',
        '٩': '9'
    };

    function convertHindiToArabic(num) {
        return num.split('').map(char => hindiToArabicMap[char] || char).join('');
    }

    // Make convertHindiToArabic available globally
    window.convertHindiToArabic = convertHindiToArabic;
});

function setupCellValidation(inputCell, statusCell, correctValue) {
    const value = convertHindiToArabic(inputCell.value.trim());
    const isCorrect = value === correctValue;
    const feedback = isCorrect ? "✔" : `✘\n${value}\nالجواب: ${correctValue}`;
    statusCell.textContent = feedback;
    statusCell.style.color = isCorrect ? "green" : "red";
    return isCorrect;
}



document.getElementById("showResultsBtn").addEventListener("click", () => {
    const loader = document.getElementById("loader");
    loader.style.display = "block";

    setTimeout(() => {
        loader.style.display = "none";
        const inputs = document.querySelectorAll("input[type='text']");
        const spans = document.querySelectorAll("span");


// التحقق من الاجابة 
          let correctCount = 0;
                for (let i = 0; i < inheritanceRows.length; i++) {
                    const input = inputs[i];
                    const span = spans[i];
                    const isCorrect = setupCellValidation(input, span, inheritanceRows[i]);
                    if (isCorrect) {
                        correctCount++;
                    }
                }
// تحويل الدرجات الى النسبة المئوية
        const totalQuestions = inheritanceRows.length;
        const percentage = (correctCount / totalQuestions) * 100;
        const percentageDisplay = document.getElementById("percentageDisplay");
        percentageDisplay.textContent = `النسبة المئوية: ${percentage.toFixed(2)}%`;
    }, 3000); // الانتظار لمدة ثلاث ثواني قبل إظهار النتائج
});



// ================= الانتقال بين التمارين =================

// تعريف البيانات للأزرار
// ================= الانتقال بين التمارين =================

// تعريف البيانات للأزرار
const buttons = [
    { text: 'التمرين السابق ❯', href: '#', index: -1 },
    { text: '1', href: 'nesf.html', index: 1 },
    { text: '2', href: 'ropa.html', index: 2 },
    { text: '3', href: 'thomn.html', index: 3 },
    { text: '4', href: 'tholuth.html', index: 4 },
    { text: '5', href: 'tholuthain.html', index: 5 },
    { text: '6', href: 'sudus.html', index: 6 },
    { text: '....', href: '#' },
    { text: 'التمرين التالي ❯', href: '#', index: -1 }
];

const container = document.getElementById('button-container');
const currentUrl = window.location.pathname.split('/').pop();

function generateButtons(buttons) {
    container.innerHTML = '';
    buttons.forEach(button => {
        const a = document.createElement('a');
        a.href = button.href;
        a.textContent = button.text;
        a.className = button.href === currentUrl ? 'btn-view-all1-active' : 'btn-view-all1';
        container.appendChild(a);
    });
}

function updateButtons() {
    const currentIndex = buttons.findIndex(b => b.href === currentUrl);
    buttons[0].href = currentIndex > 0 ? buttons[currentIndex - 1].href : '#';
    buttons[buttons.length - 1].href = currentIndex < buttons.length - 2 ? buttons[currentIndex + 1].href : '#';
    generateButtons(buttons);
}

updateButtons();

container.querySelector('a[href="#"]').addEventListener('click', e => {
    e.preventDefault();
    const reordered = [buttons[buttons.length - 1]].concat(
        buttons.filter(b => b.index !== 7 && b.index !== -1).sort((a, b) => a.index - b.index),
        buttons.find(b => b.index === 7)
    );
    generateButtons(reordered);
});
