const facebookAppId = '239375757858079';

export function loadFacebookSdk(){
  return new Promise(resolve => {
    window.fbAsyncInit = function() {
      FB.init({
        appId      : facebookAppId,
        cookie     : true,
        xfbml      : true,
        version    : 'v10.0'
      });


      FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
      });
    };

    (function(d, s, id){
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {return;}
      js = d.createElement(s); js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

    function statusChangeCallback(response){
      if(response.status === "connected"){
        console.log('Logged in and authenticated', response);
      } else {
        console.log('Not authenticated', response);
      }
    }
  });
}
