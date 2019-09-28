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

let div = document.createElement('div')
$activities.append(div);

$checkboxes.on('change', function(e){

    const click = e.target;
    const $clicked = $(e.target);
    const $clickedType = $clicked.attr('data-day-and-time');
    const $dataCost = $clicked.attr('data-cost');
    const dataCost = Number($dataCost.replace(/[^0-9.-]+/g,""));

    if($clicked.prop('checked') === true){
        totalPrice += dataCost;
    }
    else{
        totalPrice -= dataCost;
    }

    div.innerHTML = '<strong>Total Amount: </strong>' + totalPrice;
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
    isValidActivity($clicked);
    
});



// hide all other div
$('.paypal').addClass('is-hidden');
$('.bitcoin').addClass('is-hidden');

// display cerdit card div
$('.credit-card').removeClass('is-hidden');

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

const $name = $('#name');
const nameError = document.createElement('div');
$(nameError).addClass('error');
$name.after(nameError);

const isValidName = function(){

   if(/[^\d]/.test($name.val())){
        nameError.textContent = '';
        return true;
   }

   else{
        nameError.textContent = 'Name should not be empty';
        return false;
    }
}


const $email = $('#mail');
const emailError = document.createElement('div');
$(emailError).addClass('error');
$email.after(emailError);
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

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


const activitiesError = document.createElement('div');
$activities.append(activitiesError);
$(activitiesError).addClass('error');

const isValidActivity = function(click){

    if($(click).prop('checked') === true){
        activitiesError.textContent = '';
        return true;
    }
    else{
        activitiesError.textContent = 'Please select one of the activities';
        return false;
    }
}

const $ccNum = $('#cc-num');
const ccNumError = document.createElement('div');
$(ccNumError).addClass('error');
$ccNum.after(ccNumError);

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

const $zip = $('#zip');
const zipError = document.createElement('div');
$(zipError).addClass('error');
$zip.after(zipError);

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

const $cvv = $('#cvv');
const cvvError = document.createElement('div');
$(cvvError).addClass('error');
$cvv.after(cvvError);

const isValidCvv = function(){

    if(/^\d{3}$/.test($cvv.val())){
        cvvError.textContent = '';
        return true;
    }

    else{
        cvvError.textContent = 'Please enter a valid zip number';
        return false;
    }
}

$('form').submit(function(event) {


    if (!isValidName() && !isValidEmail() && !isValidActivity()){
      event.preventDefault();
    }
  
      if ($('option[value="Credit Card"]').is(':selected')) {
        if (!isValidccNum() && !isValidZip() && !isValidCvv()) {
          event.preventDefault();
        }
    }
  
});