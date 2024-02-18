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

    
 // get ipAddress === start 
    var getIpAddress = '';
    $.getJSON("//api.ipify.org?format=json", function(data) { 
        getIpAddress = data.ip;
    });
 // get ipAddress === end 


// get osName === start 
    var getOs = 'Unknown';
    if (navigator.appVersion.indexOf("Win") != -1) { getOs = 'Windows' }
    if (navigator.appVersion.indexOf("Mac") != -1) { getOs = 'Mac' }
    if (navigator.appVersion.indexOf("X11") != -1) {  getOs = 'UNIX' }
    if (navigator.appVersion.indexOf("Linux") != -1) { getOs = 'Linux' }
 // get osName === end 


// get browserName === start 
    var getBrowser = 'Unknown';
    const userAgent = window.navigator.userAgent.toLowerCase();
    userAgent.indexOf('edge') > -1 ? getBrowser = 'edge'
      : userAgent.indexOf('edg') > -1 ? getBrowser = 'edge'
      : userAgent.indexOf('opr') > -1 && !!window.opr ? getBrowser ='opera'
      : userAgent.indexOf('chrome') > -1 && !!window.chrome ?  getBrowser ='chrome'
      : userAgent.indexOf('trident') > -1 ? getBrowser = 'ie'
      : userAgent.indexOf('firefox') > -1 ? getBrowser = 'firefox'
      : userAgent.indexOf('safari') > -1 ? getBrowser = 'safari'
      : getBrowser = 'other';
 // get browserName === end 


 
 var screenLS = localStorage.getItem('screen'); // selected screen
 var baseurl = "//20.197.32.117:3035/api/"; // baseurl



 // show Prompt  === start
 function showPwaPrompt()
 {
    // debugger;
    $("#pwaPrompt").fadeIn(300);
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
    $("#"+val+"_screen").slideDown(300);
}
// change screen === end 





// set screen === start 
 function setScreens()
 {
    // debugger;
    $('.screen').slideUp(300);
    if(screenLS == null)
    {
        $("#login_screen").slideDown(300);
    }
    else
    {
        $("#"+screenLS+"_screen").slideDown(300);
    }
 }
 setScreens();
// set screen === end 





// registerValidation === start 
function registerValidation()
{
    // debugger;
    let emailReg = new RegExp('[a-z0-9._-]+@[a-z0-9]+\.[a-z]{2,7}');
    let adhaarRegex = new RegExp(/^[2-9]{1}[0-9]{11}$/);
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
        $("#error_mobilenumber").show().html('Please enter 10 digit mobile number');
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
    else if (!emailReg.test($("#emailid").val())) 
    {
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
        $("#error_adhaarnumber").show().html('Please enter 12 digit adhaar number');
        return false;
    }
    else if (!adhaarRegex.test($("#adhaarnumber").val())) 
    {
        $("#error_adhaarnumber").show().html('Please enter valid adhaar number');
        return false;
    }
    
    else 
    {
            $(".mf_error").hide().html('');
            $("#pageloader").fadeIn(300);
            getRegister();
            $("#pageloader").fadeOut(300);
            return true;
    }
}
// registerValidation === end 
 




// loginValidation === start 
function loginValidation()
{
    debugger;
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
            getLogin();
            $("#pageloader").fadeOut(300);
            return true;
        }
    }
}
// loginValidation === end 




// login === start 
function getLogin()
{
    var useridLogin = 1;
    var mobileLogin = $("#mobileLogin").val()
    const loginHeader = { 
        'Access-Control-Allow-Origin': '*',
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, DELETE',
        'Access-Control-Allow-Headers': 'Content-Type, x-requested-with'
    };
    $.ajax({
        type: "GET",
        url: baseurl+"Customer/UserInfo?userid="+useridLogin+"&phonenumber="+ mobileLogin, // "https://jsonplaceholder.typicode.com/posts/1",
        dataType: "json",
        headers  : loginHeader,
        success: function (result) {
            console.log(result);
            alert('thanks');
            showScreens('dashboard');
        },
        error: function (err) {
            console.log(err);
            alert('error');
        }
  });
}
// login === end 

 
 

// Register === start 
function getRegister()
{

    var userlist = {
        first_Name: $("#firstname").val(),
        last_Name: $("#lastname").val(),
        full_Name: $("#firstname").val() + ' ' + $("#lastname").val(),
        phone_Number: $("#mobilenumber").val(),
        email_Address: $("#emailid").val(),
        aadhaar_Info: $("#adhaarnumber").val(),
        address_Line1: "test address",
        language_Preference: "English",
        location_Page: window.location.pathname,
        iP_Address: getIpAddress,
        oS_Details: getOs,
        browser_Details: getBrowser
    }
    console.log("userlist row ===", userlist);
    console.log("userlist json ===", JSON.stringify(userlist));

    var registerHeader = {    
        'Access-Control-Allow-Origin': '*',
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, DELETE',
        'Access-Control-Allow-Headers': 'Content-Type, x-requested-with'
    }

        $.ajax({
            type: "POST",
            url: baseurl + "Customer/SaveUser", // "https://jsonplaceholder.typicode.com/posts",
            data: JSON.stringify(userlist),
            headers: registerHeader,
            dataType: "json",
            success: function (res) {
                console.log("result === ", res);
                alert("Thanks");
                showScreens('registerthank');
            },
            error: function (err) 
            {
                console.log("Error ==== ", err);
                alert("Error");
            }
      });


 
      
}
// Register === end 


