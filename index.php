<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="zh-TW" lang="zh-TW">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="language" content="English" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
    <meta name="format-detection" content="telephone=no, date=no, address=no, email=no">
    <meta http-equiv="Content-Security-Policy" content="default-src 'self'; img-src 'self' data: *.google-analytics.com *.gstatic.com; media-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' *.google.com *.google-analytics.com *.googletagmanager.com; font-src 'self' data: fonts.gstatic.com tagmanager.google.com; style-src 'self' 'unsafe-inline' fonts.googleapis.com tagmanager.google.com; connect-src 'self' *.google-analytics.com">
    <!--<meta http-equiv="Content-Security-Policy" content="default-src 'self'; img-src 'self' *.google-analytics.com; media-src 'self'; script-src 'self' 'unsafe-inline' *.google-analytics.com *.googletagmanager.com; font-src 'self' fonts.gstatic.com; style-src 'self' 'unsafe-inline' fonts.googleapis.com; connect-src 'self' *.google-analytics.com">-->
    <meta name="description" content="Genetates or validates Hong Kong Identity Card number" />
    <meta name="keywords" content="HKID generator, HKID Validator, Hong Kong Identity Card, Hong Kong Identity Card Number, Hong Kong Identity Card Number Generator, Hong Kong Identity Card Number Validator, HKID, check digit" />
    <meta name="robots" content="index" />
    <meta name="title" content="Hong Kong Identity Card Number Generator and Validator" />
    <meta property="og:description" content="Genetates or validates Hong Kong Identity Card number" />
    <meta property="og:title" content="HKID generator" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://pinkylam.me/playground/hkid/" />
    <meta property="og:image" content="http://pinkylam.me/playground/hkid/images/touch-icons/apple-touch-icon-1024x1024.png" />
    <meta property="og:image:secure_url" content="https://pinkylam.me/playground/hkid/images/touch-icons/apple-touch-icon-1024x1024.png" />
    <meta property="og:image:type" content="image/png" />
    <meta property="og:image:width" content="1024" />
    <meta property="og:image:height" content="1024" />
    <meta property="og:image:alt" content="Genetates or validates Hong Kong Identity Card number" />
    <meta property="og:site_name" content="pinkylam.me" />
    <meta name="theme-color" content="#ffffff" />
    
    <!-- Web App Tags: For add to home screen -->
    <link rel="manifest" href="manifest.json">

    <meta name="apple-mobile-web-app-status-bar-style" content="black" /> 
    <meta name="apple-mobile-web-app-capable" content="yes">
      
    <link rel="apple-touch-icon" sizes="180x180" href="images/touch-icons/apple-touch-icon-180x180.png" />
    <link rel="apple-touch-icon" sizes="152x152" href="images/touch-icons/apple-touch-icon-152x152.png" />
    <link rel="apple-touch-icon" sizes="144x144" href="images/touch-icons/apple-touch-icon-144x144.png" />
    <link rel="apple-touch-icon" sizes="120x120" href="images/touch-icons/apple-touch-icon-120x120.png" />
    <link rel="apple-touch-icon" sizes="114x114" href="images/touch-icons/apple-touch-icon-114x114.png" />
    <link rel="apple-touch-icon" sizes="76x76" href="images/touch-icons/apple-touch-icon-76x76.png" />
    <link rel="apple-touch-icon" sizes="72x72" href="images/touch-icons/apple-touch-icon-72x72.png" />
    <link rel="apple-touch-icon" sizes="57x57" href="images/touch-icons/apple-touch-icon-57x57.png" />
    <link rel="apple-touch-icon" href="images/touch-icons/apple-touch-icon-57x57.png" />
    <!-- Web App Tags -->

    <!-- Favicons -->
    <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
    <!-- Favicons -->

    <title>Hong Kong Identity Card Number Generator and Validator</title>
    <link rel="canonical" href="https://pinkylam.me/playground/hkid/" />
    
    <!-- CSS -->
    <link href="vendor/fullpage/jquery.fullpage.min.css" rel="stylesheet">
    <link href="css/hkid.css" rel="stylesheet">

    <!-- Google Tag Manager -->
    <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-M46ZRTG');</script>
    <!-- End Google Tag Manager -->
  </head>
  <body>
    <!-- Google Tag Manager (noscript) -->
    <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-M46ZRTG"
    height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
    <!-- End Google Tag Manager (noscript) -->

    <!-- Nav -->
    <div id="menu" class="nav">
      <a href="#generate" class="nav__bullet" data-menuanchor="generate" aria-label="Generate HKID"></a>
      <a href="#validate" class="nav__bullet" data-menuanchor="validate" aria-label="Validate HKID"></a>
    </div>
    <!-- /Nav -->
    
    <!-- Full Page -->
    <div id="fullpage" style="display: none;">
      <!-- Generate HKID -->
      <div id="generateHKID" class="section section--green">
        <div class="container">
          <div class="content">
            <h3>Hong Kong Identity Card Number Generator</h3>
            <div class="position--relative">
              <div id="randomHKID" class="emphasize cursor--pointer" data-clipboard-target="#randomHKID"></div>
              <div id="copiedMessage" class="emphasize">Copied</div>
            </div>
            <a id="generateBtn" href="javascript: printHKID()" class="button button--green">Generate</a>
          </div>
        </div>
      </div>
      <!-- /Generate HKID -->
      <!-- Validate HKID -->
      <div id="validateHKID" class="section section--blue">
        <div class="container">
          <div class="content">
            <h3>Hong Kong Identity Card Number Validator</h3>
            <input type="text" id="hkid" name="hkid" class="uppercase" maxlength="9" placeholder="e.g. A998877A" autocomplete="off" spellcheck="false" aria-label="e.g. A998877A">
            <div class="validationResult"></div>
          </div>
        </div>
      </div>
      <!-- Validate HKID -->
    </div>
    <!-- /Full Page -->

    <!-- Javascripts -->
    <script src="js/hkid.js" type="text/javascript"></script>
    <script src="vendor/jquery-1.12.4.min.js" type="text/javascript"></script>
    <script src="vendor/fullpage/jquery.fullpage.min.js" type="text/javascript"></script>
    <script src="vendor/clipboard.min.js" type="text/javascript"></script>
    
    <script type="text/javascript">
      window.dataLayer = window.dataLayer || [];

      $(function() {
        // jquery.fullpage
        $("#fullpage").fullpage({
          anchors: ["generate", "validate"],
          menu: "#menu",
          css3: false
        });
        
        // Give me a random HKID first!!
        printHKID();
        
        // Copy to Clipboard
        var clipboard = new ClipboardJS('#randomHKID');
        clipboard.on('success', function(event) {
          event.clearSelection();
          $("#copiedMessage").stop().fadeIn('fast').delay(500).fadeOut('fast');
        });
        
        // Show me the page when ready
        $("#fullpage").fadeIn();

        // Check HKID on keyboard release and input blur
        $("#hkid").on("keyup blur", function(){
          var str = $(this).val();
          if(str.length > 7) {
            if (isHKID(str)) { // Yes!!!
              var msg = "This is a correct HKID.";
            } else { // No...
              var splitHKID = processHKID(str); // For calculating check digit
              if (splitHKID) {
                var msg = "The correct check digit should be " + calculateCheckDigit(splitHKID[1], splitHKID[2]) + ".";
              } else { // For length > 7 but not in HKID format
                var msg = "This is not a correct HKID format.";
              }
            }
            
            // Show me the answer
            $(".validationResult").text(msg);
          } else {
            // More info needed
            $(".validationResult").text("");
          }
        });
      });
      
      // print HKID
      function printHKID() {
        var generatedHKID = randomHKID();
        document.getElementById("randomHKID").innerHTML = generatedHKID;
        
        //GTM event tracking
        if(typeof(dataLayer) !== 'undefined'){ 
          dataLayer.push({  
            'event': 'generateHKID',
            'generatedHKID': generatedHKID
          });
        }
      }
      
      //Register service worker
      if('serviceWorker' in navigator) {
        navigator.serviceWorker.register('service-worker.js').then(function() { 
          //console.log("Service Worker Registered"); 
        });
      }
    </script>
    <!-- /Javascripts -->
  </body>
</html>