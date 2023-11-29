window.addEventListener("DOMContentLoaded", (event) => {

const currentDate = new Date();

const monday = new Date(currentDate);
monday.setDate(currentDate.getDate() - currentDate.getDay() + (currentDate.getDay() === 0 ? -6 : 1));

const formattedDate = `${monday.toLocaleDateString('en-GB', { weekday: 'long' })} ${monday.toLocaleDateString('en-GB', { day: 'numeric', month: 'numeric' })}`;

document.getElementById('week-commencing').textContent  = `WC: ${formattedDate}`;

    const addMealBtns = document.getElementsByClassName('add-meal-btn');
    const addMealConfirm = document.getElementById('add-meal-confirm');
    const cancelButton = document.getElementById('cancel-button');
    const resetButton = document.getElementById('reset-button');

    const addMealModal = document.getElementById('add-meal-modal');
    let selectedButton;

    function showAddMealModal(event) {
        console.log('Meal modal has been shown');
        selectedButton = event.target;
        addMealModal.showModal();
    }

    for (const btn of addMealBtns) {
        btn.addEventListener("click", showAddMealModal);
    }

    function addSelectedMeal() {
        const mealInput = document.getElementById("meal-name");

        if (mealInput.value) {
            const tdElement = selectedButton.closest('td');
            const inputValue = mealInput.value;

            const day = selectedButton.dataset.day;
            const mealType = selectedButton.dataset.mealType;

            updateMeal(day, mealType, inputValue);

            const newParagraph = document.createElement('p');
            newParagraph.textContent = inputValue;

            tdElement.innerHTML = '';
            tdElement.appendChild(newParagraph);

            addMealModal.close();

            console.log('Meal has been added successfully');

            mealInput.value = '';
        }
    }

    cancelButton.addEventListener("click", () => {
        addMealModal.close();
        document.getElementById("meal-name").value = '';
    });

    resetButton.addEventListener("click", () => {
        document.getElementById("meal-name").value = '';
    });

    function handleKeyPress(event) {
        if (event.key === 'Enter') {
            addSelectedMeal();
            console.log('Enter key has been pressed');
        }
    }

    addMealConfirm.addEventListener("click", addSelectedMeal);
    document.addEventListener("keydown", handleKeyPress);

    const meals = {
        "monday": { "breakfast": '', "lunch": '', "dinner": '' },
        "tuesday": { "breakfast": '', "lunch": '', "dinner": '' },
        "wednesday": { "breakfast": '', "lunch": '', "dinner": '' },
        "thursday": { "breakfast": '', "lunch": '', "dinner": '' },
        "friday": { "breakfast": '', "lunch": '', "dinner": '' },
        "saturday": { "breakfast": '', "lunch": '', "dinner": '' },
        "sunday": { "breakfast": '', "lunch": '', "dinner": '' }
    };

    function updateMeal(day, mealType, value) {
        if (meals[day] && meals[day][mealType] !== undefined) {
            meals[day][mealType] = value;
            console.log(`Updated ${day}'s ${mealType} with ${value}`);
            console.log(meals);
        } else {
            console.error("Invalid day or meal type");
        }
    }

    console.log(meals);
});