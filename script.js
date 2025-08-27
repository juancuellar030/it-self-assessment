document.addEventListener('DOMContentLoaded', () => {
    const gradesContainer = document.querySelector('.grades-container');
    const selectedGradeInput = document.getElementById('selected-grade');

    for (let i = 30; i <= 50; i++) {
        const grade = (i / 10).toFixed(1);
        const btn = document.createElement('button');
        btn.classList.add('grade-btn');
        btn.textContent = grade;
        btn.dataset.grade = grade;
        gradesContainer.appendChild(btn);

        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const allBtns = document.querySelectorAll('.grade-btn');
            allBtns.forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
            selectedGradeInput.value = grade;
        });
    }
});
