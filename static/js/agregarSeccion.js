document.getElementById('add-section').addEventListener('click', function () {
    const formSections = document.getElementById('form-sections');
    const originalForm = formSections.firstElementChild;
    const newForm = originalForm.cloneNode(true);

    const removeButton = document.createElement('button');
    removeButton.className = 'btn btn-danger mt-3';
    removeButton.textContent = 'Eliminar sección';
    removeButton.addEventListener('click', function () {
        formSections.removeChild(newFormContainer);
    });

    const newFormContainer = document.createElement('div');
    newFormContainer.className = 'form-container mt-3';
    newFormContainer.appendChild(newForm);
    newFormContainer.appendChild(removeButton);

    formSections.appendChild(newFormContainer);
});