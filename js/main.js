// setting global variables
const $otherTitle = $('#other-title');
const $jobRole= $('#title');
const $design = $('#design');
const $colorLabel = $('label[for="color"]');
const $color = $('#color');
const $checkboxes = $('.activities input');
const $activities = $('.activities');
let totalPrice = 0;
// setting focus, hide and values when the page loads
$('#name').focus();
$otherTitle.hide();
$color.hide();
$colorLabel.text('Please select a T-shirt theme');

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

$activities.append('<strong>Total Amount: </strong>' + totalPrice);

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

    console.log(totalPrice);
    
    return totalPrice;
    
});

console.log(totalPrice);