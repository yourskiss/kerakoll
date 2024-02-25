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
    $.getJSON("https://api.ipify.org?format=json", function(data) { 
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


 // show hide Prompt  === start
 function showHidePwaPrompt(val)
 {
    // debugger;
    if(val == 'hide')
    {
        $("#pwaPrompt").fadeOut(300);
    }
    else
    {
        $("#pwaPrompt").fadeIn(300);
    }
 }
// show hide Prompt  === end

 

// showHideAlert === start 
function showHideAlert(val, msg)
{
    $("#alertmsg").html(msg);
    if(val == 'show')
    {
        $("#alertPopup").fadeIn(300);
    }
    else if(val == 'hide')
    {
        $("#alertPopup").fadeOut(300);
    }
    else
    {
        // nothing
    }
}
// showHideAlert === end 

 
 var screenLS = localStorage.getItem('screen'); // selected screen
 var baseurl = "https://kerakollapi.zeroprompts.com/api/"; // baseurl
 

// change screen === start 
function showScreens(val)
{
    // debugger;
    localStorage.setItem('screen', val);
    $('.screencontainer').slideUp(300);
    $("#"+val+"_screen").slideDown(300);
}
// change screen === end 



// logout === start 
function logout()
{
    showScreens('login')
    localStorage.removeItem('logintoken');
    $("#logoutButton").hide();
}
// logout === end 


// set screen === start 
 function setScreens()
 {
    // debugger;
    $('.screencontainer').slideUp(300);

    if(screenLS == null || screenLS == 'login' || screenLS == 'register')
    {
        $("#logoutButton").hide();
    }
    else 
    {
        $("#logoutButton").show();
    }

    if(screenLS == null )
    {
        $("#login_screen").slideDown(300);
    }
    else
    {
        $("#"+screenLS+"_screen").slideDown(300);
        
        if(screenLS == 'dashboard' &&  localStorage.getItem('logintoken') != null)
        {
            showuserdetails(); 
        }
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
    $(".registerError").hide().html('');
    if($("#register_mobile").val() == '')
    {
        $("#error_register_mobile").show().html('Please enter your mobile number');
        return false;
    }
    else if ($("#register_mobile").val().length !== 10) 
    {
        $("#error_register_mobile").show().html('Please enter 10 digit mobile number');
        return false;
    }
    else if (($("#register_mobile").val().indexOf('9')) != 0 && ($("#register_mobile").val().indexOf('8')) != 0 && ($("#register_mobile").val().indexOf('7')) != 0 && ($("#register_mobile").val().indexOf('6')) != 0) 
    {
        $("#error_register_mobile").show().html('Mobile number start with digits like 9, 8, 7, 6');
        return false;
    }
    else
    {
        $("#register_container_mobile").slideUp(200);
        $("#register_container_form").slideDown(200);
        $("#register_container_otp").slideUp(200);


        if($("#register_photo").val() == '')
        {
            $("#error_register_photo").show().html('Please select profile photo');
            return false;
        }
        else if($("#register_firstname").val() == '')
        {
            $("#error_register_firstname").show().html('Please enter your first name');
            return false;
        }
        else if($("#register_lastname").val() == '')
        {
            $("#error_register_lastname").show().html('Please enter your last name');
            return false;
        }
        else if($("#register_emailid").val() == '')
        {
            $("#error_register_emailid").show().html('Please enter your email address');
            return false;
        }
        else if (!emailReg.test($("#register_emailid").val())) 
        {
            $("#error_register_emailid").show().html('Please enter valid email address');
            return false;
        }
        else if($("#register_gender").val() == '' || $("#register_gender").val() == 0)
        {
            $("#error_register_gender").show().html('Please select gender');
            return false;
        }
        else if($("#register_city").val() == '')
        {
            $("#error_register_city").show().html('Please enter city name');
            return false;
        }
        else if($("#register_aadhaar").val() == '')
        {
            $("#error_register_aadhaar").show().html('Please enter aadhaar number');
            return false;
        }
        else if ($("#register_aadhaar").val().length !== 12) 
        {
            $("#error_register_aadhaar").show().html('Please enter 12 digit aadhaar number');
            return false;
        }
        else if (!adhaarRegex.test($("#register_aadhaar").val())) 
        {
            $("#error_register_aadhaar").show().html('Please enter valid aadhaar number');
            return false;
        }
        else 
        {
            $("#register_container_mobile").slideUp(200);
            $("#register_container_form").slideUp(200);
            $("#register_container_otp").slideDown(200);
            if($("#register_otp").val() == '')
            {
                $("#error_register_otp").show().html('Please enter OTP');
                return false;
            }
            else if ($("#register_otp").val().length !== 6) 
            {
                $("#error_register_otp").show().html('Please enter valid OTP');
                return false;
            }
            else 
            {
                $(".registerError").hide().html('');
                $("#pageloader").fadeIn(300);
                getRegister();
                setTimeout(function(){ $(".registerInput, .registerSelect, .registerOtp input[type='text']").val(''); }, 2000);
                $("#pageloader").fadeOut(300);
                return true;
            }
        }
    }
}
// registerValidation === end 
 


// profilepicture update === start 
function profilepicture(val1, val2) 
{
    debugger;
    var fileInput = document.getElementById(val1).files;
    var fsize = fileInput[0].size;
    var file = Math.round((fsize / 1024));
    if (file > 2048) 
    {  
        $('#'+val2).show().html("Please select a file less than 2 mb");
        $("#"+val1).val('');
    }
    else 
    {
        $('#'+val2).hide().html("");
    }
}
//  profilepicture update === end 
 
 


// loginValidation === start 
function loginValidation()
{
    debugger;
    $(".registerError").hide().html('');
    if($("#login_mobile").val() == '')
    {
        $("#error_login_mobile").show().html('Please enter mobile number');
        return false;
    }
    else if($("#login_mobile").val().length != 10)
    {
        $("#error_login_mobile").show().html('Please enter valid mobile number');
        return false;
    }
    else if (($("#login_mobile").val().indexOf('9')) != 0 && ($("#login_mobile").val().indexOf('8')) != 0 && ($("#login_mobile").val().indexOf('7')) != 0 && ($("#login_mobile").val().indexOf('6')) != 0) 
    {
        $("#error_login_mobile").show().html('Mobile number start with digits like 9, 8, 7, 6');
        return false;
    }
    else 
    { 
        $("#login_container_mobile").slideUp(200);
        $("#login_container_otp").slideDown(200);
        if($("#login_otp").val() == '')
        {
            $("#error_login_otp").show().html('Please enter OTP');
            return false;
        }
        else if ($("#login_otp").val().length !== 6) 
        {
            $("#error_login_otp").show().html('Please enter valid OTP');
            return false;
        }
        else 
        {
            $(".registerError").hide().html('');
            $("#pageloader").fadeIn(300);
            getLogin();
            setTimeout(function() { $(".registerInput, .registerOtp input[type='text']").val(''); }, 2000);
            $("#pageloader").fadeOut(300);
            return true;
        }
    }
}
// loginValidation === end 




// login === start 
function getLogin()
{
    var useridLogin = 0;
    var login_mobile = $("#login_mobile").val()
    $.ajax({
        type: "GET",
        url: baseurl+"Customer/UserInfo?userid="+useridLogin+"&phonenumber="+ login_mobile,  
        dataType: "json",
        headers : { 'Accept' : 'application/json', "Content-Type" : "application/json" },
        success: function (res) {
                         console.log("Login === ", res);
                        if(res.result_Code == 0)
                        {
                           localStorage.setItem('logintoken', login_mobile)
                            showScreens('dashboard');
                            showuserdetails();
                            $("#logoutButton").show(); 
                        }
                        else
                        {
                            showHideAlert('show', res.result_Status);
                        }
        },
        error: function (err) {
            showHideAlert('show', err);
        }
    });
}
// login === end 
 
 

// Register === start 
function getRegister()
{
    var userlist = {
        first_Name: $("#register_firstname").val(),
        last_Name: $("#register_lastname").val(),
        full_Name: $("#register_firstname").val() + ' ' + $("#register_lastname").val(),
        phone_Number: $("#register_mobile").val(),
        email_Address: $("#register_emailid").val(),
        aadhaar_Info: $("#register_adhaarnumber").val(),
        address_Line1: "Test Address",
        language_Preference: "English",
        location_Page: window.location.pathname,
        iP_Address: getIpAddress,
        oS_Details: getOs,
        browser_Details: getBrowser
    }
 

        $.ajax({
            type: "POST",
            url: baseurl + "Customer/SaveUser", 
            data: JSON.stringify(userlist),
            headers: { 'Accept' : 'application/json', "Content-Type" : "application/json" },
            dataType: "json",
            success: function (res) {
                         console.log("Register === ", res);
                        if(res.result_Code == 0)
                        {
                            showScreens('registerthank');
                        }
                        else
                        {
                            showHideAlert('show', res.result_Status);
                        }
            },
            error: function (err) 
            {
                showHideAlert('show', err);
            }
      });
}
// Register === end 






// showHideAlert === start 
function showuserdetails()
{
    debugger;
    var storedata = '';
    var useridLogin = 0;
    var logintoken = localStorage.getItem('logintoken');
    $.ajax({
        type: "GET",
        url: baseurl+"Customer/UserInfo?userid="+useridLogin+"&phonenumber="+ logintoken,  
        dataType: "json",
        headers : { 'Accept' : 'application/json', "Content-Type" : "application/json" },
        success: function (res) {
                         console.log("showuserdetails === ", res);
                        if(res.result_Code == 0)
                        {
                            storedata += `<h2>${res.result.first_Name}</h2><p>${res.result.phone_Number}</p></div>`;     
                            $("#datacontainer").html(storedata); 
                        }
                        else
                        {
                            showHideAlert('show', res.result_Status);
                        }
        },
        error: function (err) {
            showHideAlert('show', err);
        }
    });

}
// showHideAlert === end 
