// 1. DOM
const slides                    = Array.from(document.querySelectorAll('.slide'));
const titleItems                = document.querySelector('.slider-title__items');

const countryInputs             = document.querySelectorAll('.slide__item-country');
const capitalInputs             = document.querySelectorAll('.slide__item-capital');
const options                   = document.querySelectorAll('.slide__item-option');

const countryInputsArray        = Array.from(document.querySelectorAll('.slide1__item-country'));
const capitalInputsArray        = Array.from(document.querySelectorAll('.slide1__item-capital')); 
const countryInputsArray1       = Array.from(document.querySelectorAll('.slide2__item-country'));
const capitalInputsArray1       = Array.from(document.querySelectorAll('.slide2__item-capital')); 
const countryInputsArray2       = Array.from(document.querySelectorAll('.slide3__item-country'));
const capitalInputsArray2       = Array.from(document.querySelectorAll('.slide3__item-capital')); 

const slideTotalAnswers         = document.querySelector('.slide__total-answers');
const slidePercentage           = document.querySelector('.slide__percentage');

const nextSlideButton           = document.querySelector('.next-btn');
const checkAnswersButton        = document.querySelector('.check-answers');
const startAgainButton          = document.querySelector('.start-again-btn');

// 2. Variables
let countryChildDatasetCheck = [];
let capitalChildDatasetCheck = [];
let countryLength = 0;
let capitalLength = 0;
let resultArr;
let correctAnswers = [];
let finaleCorrectAnswers;
let currentOption;
let activeSlide = 0;
slides[activeSlide].classList.add('slide--selected');

// 3. Events
countryInputs.forEach(countryInput => {
	countryInput.addEventListener('dragover', dragOver);
	countryInput.addEventListener('drop', drop);
});

capitalInputs.forEach(capitalInput => {
	capitalInput.addEventListener('dragover', dragOver);
	capitalInput.addEventListener('drop', drop);
})

options.forEach(option => {
	option.setAttribute('draggable', 'true');
	option.addEventListener('dragstart', function(event) {
		currentOption = this;

		switch(currentOption.dataset.rule) {
			case 'country': {
                capitalInputs.forEach(capitalInput => {
                    capitalInput.classList.remove('slide__item-option--dragend');
                    capitalInput.classList.add('slide__item-option--dragstart');
				})
				break;
			}
			case 'capital': {
                countryInputs.forEach(countryInput => {
                    countryInput.classList.remove('slide__item-option--dragend');
                    countryInput.classList.add('slide__item-option--dragstart');
				})
				break;
			}
		}

	option.addEventListener('dragend', function(event) {
		switch(currentOption.dataset.rule) {
			case 'country': {
				capitalInputs.forEach(capitalInput => {
                    capitalInput.classList.remove('slide__item-option--dragstart');
					capitalInput.classList.add('slide__item-option--dragend');
				})
				break;
			}
			case 'capital': {
				countryInputs.forEach(countryInput => {
					countryInput.classList.remove('slide__item-option--dragstart');
					countryInput.classList.add('slide__item-option--dragend');
				})
				break;
			}
		}
	})
	})
})

nextSlideButton.addEventListener('click', changeSlide);
nextSlideButton.addEventListener('click', function() {
	this.setAttribute('disabled', 'true');
	countryLength = 0;
	capitalLength = 0;
    countryChildDatasetCheck = [];
    capitalChildDatasetCheck = [];
    resultArr = [];

    if (activeSlide === 3) {
        titleItems.classList.add('slider-title__items--last');
        nextSlideButton.classList.add('next-btn--last');
        checkAnswersButton.classList.add('check-answers--last');
    }
})

startAgainButton.addEventListener('click', () => location.reload());

// 4. Functions
function changeSlide() {
	if (activeSlide < slides.length - 1) {
		slides[activeSlide].classList.remove('slide--selected');
		activeSlide++;
		slides[activeSlide].classList.add('slide--selected');
	}
}

function dragOver(event) {
	event.preventDefault();
}

function drop(event) {
	this.appendChild(currentOption);

    if (this.firstElementChild.dataset.rule === 'country') countryLength++;
    if (this.firstElementChild.dataset.rule === 'capital') capitalLength++;
    this.style.pointerEvents = 'none';
    this.firstElementChild.style.borderBottom = 'none';

    switch(activeSlide) {
        case 0:
            if (countryLength === 5 && capitalLength === 5) {
                checkAnswersButton.removeAttribute('disabled'); 
                matchDatasetCheck(
                    countryInputsArray, 
                    capitalInputsArray, 
                    countryChildDatasetCheck, 
                    capitalChildDatasetCheck
                );

                checkAnswersButton.addEventListener('click', function() {
                    this.setAttribute('disabled', 'true');
                    nextSlideButton.removeAttribute('disabled'); 
                    resultArr = getDifferences(countryChildDatasetCheck, capitalChildDatasetCheck);

                    let resultArrLength = resultArr.length;
                    correctAnswers.push(resultArrLength);

                    finaleCorrectAnswers = correctAnswers.reduce((sum, elem) => sum + elem);
                    slideTotalAnswers.textContent = `${finaleCorrectAnswers} / 15`;
                    slidePercentage.textContent = `${((finaleCorrectAnswers / 15) * 100).toFixed(0)} %`;

                    setStyleCorrectAnswer(resultArr, countryInputsArray, capitalInputsArray)
                })
            }
            break;

        case 1:
            if (countryLength === 5 && capitalLength === 5) {
                checkAnswersButton.removeAttribute('disabled'); 
                matchDatasetCheck(
                    countryInputsArray1, 
                    capitalInputsArray1, 
                    countryChildDatasetCheck, 
                    capitalChildDatasetCheck
                );

                checkAnswersButton.addEventListener('click', function() {
                    this.setAttribute('disabled', 'true');
                    nextSlideButton.removeAttribute('disabled'); 
                    setStyleCorrectAnswer(resultArr, countryInputsArray1, capitalInputsArray1);
                })
            }
            break;

        case 2:
            if (countryLength === 5 && capitalLength === 5) {
                checkAnswersButton.removeAttribute('disabled'); 
                matchDatasetCheck(
                    countryInputsArray2, 
                    capitalInputsArray2, 
                    countryChildDatasetCheck, 
                    capitalChildDatasetCheck
                );
        
                checkAnswersButton.addEventListener('click', function() {
                    this.setAttribute('disabled', 'true');
                    nextSlideButton.removeAttribute('disabled'); 

                    setStyleCorrectAnswer(resultArr, countryInputsArray2, capitalInputsArray2); 
                })
            }
            break;  
    }
}

function getDifferences(arr1, arr2) {
	let result = [];
	for (let i = 0, j = 0; i < arr1.length, j < arr2.length; i++, j++) {
		if (arr1[i] === arr2[j]) {
			result.push(arr1[i]);
			delete arr2[j];
		}
	}
	return result;
}

function setStyleCorrectAnswer(resultArr, countryInputArray, capitalInputArray) {
    for (let elem of resultArr) {
        countryInputArray.forEach(item => {
            if (item.firstElementChild.dataset.check === elem) {
                item.classList.add('slide__item--correct');
            }
        capitalInputArray.forEach(item => {
            if (item.firstElementChild.dataset.check === elem) {
                item.classList.add('slide__item--correct');
            } 
        })
        })
    }
}

function matchDatasetCheck(
    countryInputArray, 
    capitalInputArray, 
    countryChildDatasetCheck, 
    capitalChildDatasetCheck
    ) {
    for (let i = 0; i < countryInputsArray.length; i++) {
        if (countryInputArray[i].firstElementChild) {
            countryChildDatasetCheck.splice([i], 0, countryInputArray[i].firstElementChild.dataset.check);
        }  
        if (capitalInputArray[i].firstElementChild) {
            capitalChildDatasetCheck.splice([i], 0, capitalInputArray[i].firstElementChild.dataset.check);
        } 
    }
}