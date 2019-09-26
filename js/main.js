/*
THINGS TO DO 

1.Set focus on the first text field
2.  a.Include a text field that will be revealed when the "Other" option is selected from the "Job Role" drop down menu.
    b.Give the field an id of “other-title,” and add the placeholder text of "Your Job Role".
    Note: You'll need to add the "Other" job role input directly into the HTML and hide it initially with JS in order to get this feature to work when JS is disabled, which is a requirement below.
3.  a.Until a theme is selected from the “Design” menu, no color options appear in the “Color” drop down and the “Color” field reads “Please select a T-shirt theme”.
    b.For the T-Shirt "Color" menu, after a user selects a theme, only display the color options that match the design selected in the "Design" menu.
        -If the user selects "Theme - JS Puns" then the color menu should only display "Cornflower Blue," "Dark Slate Grey," and "Gold.
        -If the user selects "Theme - I ♥ JS" then the color menu should only display "Tomato," "Steel Blue," and "Dim Grey."
4.When a new theme is selected from the "Design" menu, both the "Color" field and drop down menu is updated.
5.  a.Some events are at the same day and time as others. If the user selects a workshop, don't allow selection of a workshop at the same day and time -- you should disable the checkbox and visually indicate that the workshop in the competing time slot isn't available.
    b.When a user unchecks an activity, make sure that competing activities (if there are any) are no longer disabled.
    c.As a user selects activities, a running total should display below the list of checkboxes. For example, if the user selects "Main Conference", then Total: $200 should appear. If they add 1 workshop, the total should change to Total: $300.
    s
*/


// setting global variables
const $otherTitle = $('#other-title');
const $jobRole= $('#title');
const $design = $('#design');
const $colorLabel = $('label[for="color"]');
const $color = $('#color');

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

$design.on('change', function(e){
    const $designValue = $design.val();
    console.log($designValue);

    console.log($(e.target).val());

    $color.each(function(i,colorOption){
        console.log(i);
        console.log(colorOption);
    })
});