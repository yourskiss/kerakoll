// page refresh on orientation change === START 
$(window).on('orientationchange', function () 
{
    location.reload(true);
});
// page refresh on orientation change === END 

 
// only number validation === start
function isNumber(e) 
{
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


 
 var screenLS = localStorage.getItem('screen'); // selected screen


 // show Prompt  === start
 function showPwaPrompt()
 {
    // debugger;
    if(screenLS == 'login' || screenLS == 'register' || screenLS == null)
    {
        $("#pwaPrompt").fadeIn(300);
    }
 }
// show Prompt  === end

 // close Prompt  === start
 function closePwaPrompt()
 {
    $("#pwaPrompt").fadeOut(300);
 }
 // close Prompt  === end
 


// change screen === start 
function showScreens(val)
{
    // debugger;
    localStorage.setItem('screen', val);
    $('.screen').slideUp(300);
    $("#"+val+"Screen").slideDown(300);
}
// change screen === end 





// set screen === start 
 function setScreens()
 {
    // debugger;
    if(screenLS == null)
    {
        $("#loginScreen").slideDown(300);
    }
    else
    {
        $('.screen').slideUp(300);
        $("#"+screenLS+"Screen").slideDown(300);
    }
 }
 setScreens();
// set screen === end 





// registerValidation === start 
function registerValidation()
{
    // debugger;
    let emailReg = new RegExp('[a-z0-9._-]+@[a-z0-9]+\.[a-z]{2,7}');
    $(".mf_error").hide().html('');
    if($("#firstname").val() == '')
    {
        $("#error_firstname").show().html('Please enter your first name');
        return false;
    }
    else if($("#lastname").val() == '')
    {
        $("#error_lastname").show().html('Please enter your last name');
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
        $("#registerForm").slideUp(300);
        $("#registerOtp").slideDown(300);
        if($("#OtpRegister").val() == '')
        {
            $("#error_OtpRegister").show().html('Please enter OTP');
            return false;
        }
        else if ($("#OtpRegister").val().length !== 6) 
        {
            $("#error_OtpRegister").show().html('Please enter valid OTP');
            return false;
        }
        else 
        {
            $(".mf_error").hide().html('');
            $("#pageloader").fadeIn(300);
            showScreens('dashboard');
            
            const userlist = {
                first_Name: $("#firstname").val(),
                last_Name: $("#lastname").val(),
                phone_Number: $("#mobilenumber").val(),
                email_Address: $("#emailid").val(),
                aadhaar_Info: $("#adhaarnumber").val()
            };
            console.log(userlist);

            const headers = { 
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "POST",
                "accept" : "text/plain", 
                "contentType" : "application/json" ,
                "Access-Control-Allow-Headers": "Content-Type"
            };
            console.log(headers);
            
            fetch('http://20.197.32.117:3035/api/Customer/SaveUser', {
                method: 'POST',
                headers  : headers,
                body: JSON.stringify(userlist)
            }).then(res => {
                return res.json();
            }).then(task => {
                console.log(task);
            }).catch(error => {
                console.log(error, " error test");
            });
            
            /*
                $.ajax({
                    url: "http://20.197.32.117:3035/api/Customer/SaveUser", 
                    type: "POST",
                    dataType: "json",
                    headers  : headers,
                    data: userlist,
                    success: function (result) {
                        console.log(result);
                    },
                    error: function (err) {
                        console.log(err);
                    }
              });
            */

            $("#pageloader").fadeOut(300);
            return true;
        }
    }
}
// registerValidation === end 
 




// loginValidation === start 
function loginValidation()
{
    // debugger;
    $(".mf_error").hide().html('');
    if($("#mobileLogin").val() == '')
    {
        $("#error_mobileLogin").show().html('Please enter mobile number');
        return false;
    }
    else if($("#mobileLogin").val().length != 10)
    {
        $("#error_mobileLogin").show().html('Please enter valid mobile number');
        return false;
    }
    else if (($("#mobileLogin").val().indexOf('9')) != 0 && ($("#mobileLogin").val().indexOf('8')) != 0 && ($("#mobileLogin").val().indexOf('7')) != 0 && ($("#mobileLogin").val().indexOf('6')) != 0) 
    {
        $("#error_mobileLogin").show().html('Mobile number start with digits like 9, 8, 7, 6');
        return false;
    }
    else 
    { 
        $("#loginForm").slideUp(200);
        $("#loginOtp").slideDown(200);
        if($("#OtpLogin").val() == '')
        {
            $("#error_OtpLogin").show().html('Please enter OTP');
            return false;
        }
        else if ($("#OtpLogin").val().length !== 6) 
        {
            $("#error_OtpLogin").show().html('Please enter valid OTP');
            return false;
        }
        else 
        {
            $(".mf_error").hide().html('');
            $("#pageloader").fadeIn(300);
            showScreens('dashboard');

            $("#pageloader").fadeOut(300);
            return true;
        }
    }
}
// loginValidation === end 

 



