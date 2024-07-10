function toggleMenu() {
    var sidenav = document.getElementById('sidenav');
    sidenav.style.display = (sidenav.style.display == 'none' || sidenav.style.display == '') ? 'block' : 'none';
}

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
    inputCell.addEventListener("input", () => {
        const value = convertHindiToArabic(inputCell.value.trim());
        const isCorrect = value === correctValue;
        const feedback = isCorrect ? "✔" : `✘\n${value}\nالجواب: ${correctValue}`;
        statusCell.textContent = feedback;
        statusCell.style.color = isCorrect ? "green" : "red";
    });
}


const inputs = document.querySelectorAll("input[type='text']");
const spans = document.querySelectorAll("span");



