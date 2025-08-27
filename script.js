document.addEventListener('DOMContentLoaded', () => {
    const gradesContainer = document.querySelector('.grades-container');
    const selectedGradeInput = document.getElementById('selected-grade');
    const form = document.getElementById('assessment-form');

        // --- Add this new section ---
    const nameInput = document.getElementById('name');
    nameInput.addEventListener('input', () => {
        nameInput.value = nameInput.value.toUpperCase();
    });

    // --- The Google Apps Script URL ---
    const scriptURL = 'https://script.google.com/macros/s/AKfycbxskb5bteUDlN4flFKPrXwneFQFqv8HzNJJcRfDy-ZgrrSipf_MTZysdIw1XIYhmxs2BQ/exec';

    // Generate the grade buttons (no changes here)
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

    // --- New Form Submission Logic ---
    form.addEventListener('submit', e => {
        e.preventDefault(); // Prevent the default redirect

        // Check if a grade is selected
        if (!selectedGradeInput.value) {
            alert("Please choose a grade before saving.");
            return;
        }

        const submitButton = form.querySelector('.submit-btn');
        submitButton.disabled = true;
        submitButton.textContent = 'Saving...';

        fetch(scriptURL, { method: 'POST', body: new FormData(form)})
            .then(response => {
                console.log('Success!', response);
                // Redirect to the thank you page on success
                window.location.href = 'thankyou.html';
            })
            .catch(error => {
                console.error('Error!', error.message);
                alert("An error occurred. Please try again.");
                submitButton.disabled = false;
                submitButton.textContent = 'Save Changes';
            });
    });
});
