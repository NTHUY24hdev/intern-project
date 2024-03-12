
$(document).ready(function(){
    $('#myform').validate({
        rules:{
            name:{
                required: true,
            },
            email:{
                required: true,
                email: true,
            },				
            password:{
                required: true,
                minlength: 8,
                maxlength: 16,
            },
        },
        message:{
        
        }
    })
})		
     