// setting global variables
const $otherTitle = $('#other-title');
const $jobRole= $('#title');
const $design = $('#design');
const $colorLabel = $('label[for="color"]');
const $color = $('#color');
const $checkboxes = $('.activities input');
const $activities = $('.activities');
let totalPrice = 0;
const $paymentOption = $('#payment');

// setting focus, hide and values when the page loads
$('#name').focus();
$otherTitle.hide();
$color.hide();
$colorLabel.hide();

// when other is selected show the input text
$jobRole.on('change', function(){
    const $jobRoleVal = $jobRole.val();

    if($jobRoleVal === 'other'){
        $otherTitle.show();
    }
});

// displays the colour depending upon the selection of design
$design.on('change', function(){
    const $designValue = $design.val();
    $color.show();
    $colorLabel.show();

    if($designValue === 'js puns'){
        $('#color option:eq(3)').removeAttr('selected');
        $('#color option:eq(0)').removeClass('is-hidden');
        $('#color option:eq(1)').removeClass('is-hidden');
        $('#color option:eq(2)').removeClass('is-hidden');
        $('#color option:eq(3)').addClass('is-hidden');
        $('#color option:eq(4)').addClass('is-hidden');
        $('#color option:eq(5)').addClass('is-hidden');
    
    }
    else if($designValue === 'heart js'){
        $('#color option:eq(3)').attr('selected', true);
        $('#color option:eq(0)').addClass('is-hidden');
        $('#color option:eq(1)').addClass('is-hidden');
        $('#color option:eq(2)').addClass('is-hidden');
        $('#color option:eq(3)').removeClass('is-hidden');
        $('#color option:eq(4)').removeClass('is-hidden');
        $('#color option:eq(5)').removeClass('is-hidden');
    }
    else{
        $color.hide(); 
    }
});

// creating a div which holds the total price 
let div = document.createElement('div')
$activities.append(div);

$checkboxes.on('change', function(e){

    const click = e.target;
    const $clicked = $(e.target);
    const $clickedType = $clicked.attr('data-day-and-time');
    const $dataCost = $clicked.attr('data-cost');
    const dataCost = Number($dataCost.replace(/[^0-9.-]+/g,""));

    // depending upon the checkbox adds the price or subtracts the price from total amount
    if($clicked.prop('checked') === true){
        totalPrice += dataCost;
    }
    else{
        totalPrice -= dataCost;
    }

    // inserting the total price text on the html
    div.innerHTML = '<strong>Total Amount: </strong>' + totalPrice;

    // disabling the same time checkbox
    $checkboxes.each(function(i, checkbox){
        
        const $checkboxType = $(checkbox).attr('data-day-and-time');

        if($clickedType === $checkboxType && click !== $checkboxes[i]){
            
            if($(checkbox).attr('disabled')){       
                $(checkbox).attr('disabled', false);
            }

            else{ 
                $(checkbox).attr('disabled', true);
            }

        }
    });
    
});



// hide all other div
$('.paypal').addClass('is-hidden');
$('.bitcoin').addClass('is-hidden');

// display cerdit card div
$('.credit-card').removeClass('is-hidden');

// selecting the second option and disabling the first option
$('#payment option:eq(1)').attr('selected', true);
$('#payment option:eq(0)').attr('disabled', true);
$paymentOption.on('change', function(e){

    const $clickedPayment = $(e.target);
    const $paymentType = $clickedPayment.val();
    
    if($paymentType === 'Credit Card'){
        // hide all other div
        $('.paypal').addClass('is-hidden');
        $('.bitcoin').addClass('is-hidden');

        // display cerdit card div
        $('.credit-card').removeClass('is-hidden');
    }
    else if($paymentType === 'PayPal'){
           // hide all other div
           $('.credit-card').addClass('is-hidden');
           $('.bitcoin').addClass('is-hidden');

           // display paypal div
           $('.paypal').removeClass('is-hidden');

    }
    else{
           // hide all other div
           $('.paypal').addClass('is-hidden');
           $('.credit-card').addClass('is-hidden');

           // display bitcoin div
           $('.bitcoin').removeClass('is-hidden');
    }

});


// Form validation

// adding error after name inputs
const $name = $('#name');
const nameError = document.createElement('div');
$(nameError).addClass('error');
$name.after(nameError);

// validating the name inputs
function isValidName(){

   if(/[^\d]/.test($name.val())){
        nameError.textContent = '';
        return true;
   }

   else{
        nameError.textContent = 'Name should not be empty';
        return false;
    }
}


// adding email errors after email input
const $email = $('#mail');
const emailError = document.createElement('div');
$(emailError).addClass('error');
$email.after(emailError);

// creating a variable for email regex
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// validating email input
const isValidEmail = function(){

    if(emailRegex.test($email.val())){
        emailError.textContent = '';
        return true;
    }

    else{
        emailError.textContent = 'Please enter a valid email address';
        return false;
    }

}


// adding errors on the activities
const activitiesError = document.createElement('div');
$activities.append(activitiesError);
$(activitiesError).addClass('error');

//checking for errors
const isValidActivity = function(){

    const activitiesInput = $('.activities input');
    let error = 0;
    
    for(let i = 0; i < activitiesInput.length; i++){
        if($(activitiesInput[i]).prop('checked') === true){
            activitiesError.textContent = '';
        }
        else{
            error += 1;
        }
    }

    if(error < 7){
        return true;
    }
    else{
        activitiesError.textContent = 'Please select one of the activities';
        return false;
    }
}

// adding errors on the ccNum
const $ccNum = $('#cc-num');
const ccNumError = document.createElement('div');
$(ccNumError).addClass('error');
$ccNum.after(ccNumError);

//checking for errors on Credit card number
const isValidccNum = function(){

    if(/^\d{13,16}$/.test($ccNum.val())){
        ccNumError.textContent = '';
        return true;
    }

    else{
        ccNumError.textContent = 'Please enter a valid credit card number';
        return false;
    }
}

// adding errors on the zip
const $zip = $('#zip');
const zipError = document.createElement('div');
$(zipError).addClass('error');
$zip.after(zipError);

//checking for errors on zipcode
const isValidZip = function(){

    if(/^[0-9]{5}$/.test($zip.val())){
        zipError.textContent = '';
        return true;
    }

    else{
        zipError.textContent = 'Please enter a valid zip number';
        return false;
    }
}

// adding errors on the CVV
const $cvv = $('#cvv');
const cvvError = document.createElement('div');
$(cvvError).addClass('error');
$cvv.after(cvvError);

//checking for errors on CVV
const isValidCvv = function(){

    if(/^\d{3}$/.test($cvv.val())){
        cvvError.textContent = '';
        return true;
    }

    else{
        cvvError.textContent = 'Please enter a valid CVV';
        return false;
    }
}




// calls all the isvalid funcion to check if there are errors or not
$('form').submit(function(event) {

    if (!isValidName()){
      event.preventDefault();
    }
    
    if(!isValidEmail()){
        event.preventDefault();
    }
    if(!isValidActivity()){
        event.preventDefault();
    }

    if ($('option[value="Credit Card"]').is(':selected')) {

        if (!isValidccNum()) {
            event.preventDefault();
        }
        if(!isValidZip()){
            event.preventDefault();
        }
        if(!isValidCvv()){
            event.preventDefault();
        }
    }
});


$('#name').on('keyup', isValidName);
$('#mail').on('keyup', isValidEmail);
$('#mail').on('focus', isValidEmail);
$('#cc-num').on('keyup', isValidccNum);
$('#cc-num').on('focus', isValidccNum);
$('#zip').on('keyup', isValidZip);
$('#zip').on('focus', isValidZip);
$('#cvv').on('keyup', isValidCvv);
$('#cvv').on('focus', isValidCvv);