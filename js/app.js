/* page refresh on orientation change === START */
$(window).on('orientationchange', function () 
{
    location.reload(true);
});
/* page refresh on orientation change === END */

 
// only number validation === start
function isNumber(e) 
{
    // evt = (evt) ? evt : window.event;
    // var charCode = (evt.which) ? evt.which : evt.keyCode;
    // if (charCode > 31 && (charCode < 48 || charCode > 57)) {
    //     return false;
    // }
    // return true;
    var regex = new RegExp("^[0-9]+$");
    var strigChar = String.fromCharCode(!e.charCode ? e.which : e.charCode);
    if (regex.test(strigChar)) {
        return true;
    }
    return false
}
// only number validation === end



// only Letter validation === start
function isLetter(e) 
{
    var regex = new RegExp("^[a-zA-Z ]+$");
    var strigChar = String.fromCharCode(!e.charCode ? e.which : e.charCode);
    if (regex.test(strigChar)) {
        return true;
    }
    return false
}
// only Letter validation === end

 // only AlphaNumeric  === start
function isAlphaNumeric(e) 
{
    var regex = new RegExp("^[a-zA-Z0-9]+$");
    var strigChar = String.fromCharCode(!e.charCode ? e.which : e.charCode);
    if (regex.test(strigChar)) {
        return true;
    }
    return false
}
// only AlphaNumeric  === end
    

 // disable enter key  === start
$(document).on('keyup keypress', 'input[type="text"], input[type="submit"]', function(e) {
  if(e.keyCode == 13) 
  {
    e.preventDefault();
    return false;
  }
});
 // disable enter key  === end

 // Pwa Prompt  === end
 function closePwaPrompt()
 {
   $("#pwaPrompt").fadeOut(300);
 }
 // Pwa Prompt  === end


/* form validation === start */
function formValidation()
{
    // debugger;
    let emailReg = new RegExp('[a-z0-9._-]+@[a-z0-9]+\.[a-z]{2,7}');
    $(".mf_error").hide().html('');
    if($("#fullname").val() == '')
    {
        $("#error_fullname").show().html('Please enter your name');
        return false;
    }
    
    else if($("#mobilenumber").val() == '')
    {
        $("#error_mobilenumber").show().html('Please enter your mobile number');
        return false;
    }
    else if ($("#mobilenumber").val().length !== 10) 
    {
        $("#error_mobilenumber").show().html('Please enter valid mobile number');
        return false;
    }
    else if (($("#mobilenumber").val().indexOf('9')) != 0 && ($("#mobilenumber").val().indexOf('8')) != 0 && ($("#mobilenumber").val().indexOf('7')) != 0 && ($("#mobilenumber").val().indexOf('6')) != 0) 
    {
        $("#error_mobilenumber").show().html('Mobile number start with digits like 9, 8, 7, 6');
        return false;
    }
    else if($("#emailid").val() == '')
    {
        $("#error_emailid").show().html('Please enter your email address');
        return false;
    }
    else if (!emailReg.test($("#emailid").val())) {
        $("#error_emailid").show().html('Please enter valid email address');
        return false;
    }
    else if($("#adhaarnumber").val() == '')
    {
        $("#error_adhaarnumber").show().html('Please enter adhaar number');
        return false;
    }
    else if ($("#adhaarnumber").val().length !== 12) 
    {
        $("#error_adhaarnumber").show().html('Please enter valid adhaar number');
        return false;
    }
    else 
    {
        $("#registerscreen").slideUp(200);
        $("#OtpNumberScreen").slideDown(200);
        if($("#OtpNumber").val() == '')
        {
            $("#error_OtpNumber").show().html('Please enter OTP');
            return false;
        }
        else if ($("#OtpNumber").val().length !== 6) 
        {
            $("#error_OtpNumber").show().html('Please enter valid OTP');
            return false;
        }
        else 
        {
            $(".mf_error").hide().html('');
            return true;
        }
    }
}
/* form validation === end */


/* otpValidation === start */
function otpValidation()
{
    // debugger;
    $(".mf_error").hide().html('');
    if($("#phonenumber").val() == '')
    {
        $("#error_phonenumber").show().html('Please enter mobile number');
        return false;
    }
    else if($("#phonenumber").val().length != 10)
    {
        $("#error_phonenumber").show().html('Please enter valid mobile number');
        return false;
    }
    else if (($("#phonenumber").val().indexOf('9')) != 0 && ($("#phonenumber").val().indexOf('8')) != 0 && ($("#phonenumber").val().indexOf('7')) != 0 && ($("#phonenumber").val().indexOf('6')) != 0) 
    {
        $("#error_phonenumber").show().html('Mobile number start with digits like 9, 8, 7, 6');
        return false;
    }
    else 
    {
        $("#loginscreen").slideUp(200);
        $("#otpscreen").slideDown(200);
        if($("#OtpID").val() == '')
        {
            $("#error_OtpID").show().html('Please enter OTP');
            return false;
        }
        else if ($("#OtpID").val().length !== 6) 
        {
            $("#error_OtpID").show().html('Please enter valid OTP');
            return false;
        }
        else 
        {
            $(".mf_error").hide().html('');
            return true;
        }
    }
    
}
/* otpValidation === end */

 


/* showHideWrongMsg  === start */
function showHideWrongMsg(val)
{
    if(val == 'show')
    {
        $("#somethingwentwrong").fadeIn(300);
    }
    else if(val == 'hide')
    {
        $("#somethingwentwrong").fadeOut(300);
        $("#quiczAnswerKey li").removeClass('active');
    }
    else 
    {
        // nothing
    }
}
/* showHideWrongMsg === end */


 
/* winner slider ===== end  */