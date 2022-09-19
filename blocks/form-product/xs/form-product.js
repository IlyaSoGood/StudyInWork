export default function initFormProduct() 
{ 
    const buttonPlus = document.querySelector('[data-role="form-number-plus"]'),
          buttonMinus = document.querySelector('[data-role="form-number-minus"]'),
          numberField = document.querySelector('[data-role="form-number-field"]');
    

    function changeNumber(sign) {
        let currentValue = parseInt(numberField.value);
        let step = parseInt(numberField.getAttribute('step'));

        if (sign == '+') {
            numberField.value = String(currentValue + step);
        }
        if (sign == '-') {
            if (currentValue === 1) {return;}
            numberField.value = String(currentValue - step);
        }
    }
    function autoFieldZero () {
        let currentValue = parseInt(numberField.value);
        if (currentValue < 0 || !currentValue) {numberField.value = 1;}
        if (currentValue > 10000) {numberField.value = 10000;}
    }
    if (numberField) {
        numberField.addEventListener('blur', autoFieldZero);

        buttonPlus.addEventListener('click', () => {
            changeNumber('+');}
        );
        buttonMinus.addEventListener('click', () => {
            changeNumber('-');}
        );
    }
}