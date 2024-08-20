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
