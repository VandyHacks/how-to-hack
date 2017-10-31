console.log('found me!');

// this is the twilio information that we'll need
const twilio = {};
twilio.from = '+13127577784'; // twilio number that we're sending from!
twilio.accountSid = 'AC90de1b430b0883796e652f70646032b3';
twilio.apiKey = '17d80c21fc2cb4ee8741dfb9714024d6';

// the image on the right
const image = 'FIX ME'; // we need to get the image

function getNasaPhoto() {
    // we're getting the user input from the document
    let date = document.getElementById('date').value;
    let camera = "FIX ME"; // we need to get the camera value

    // we're putting the information into a nice format
    let params = {
        earth_date: date,
        camera: camera,
        api_key: "cXfRyFSZ9EvsaagBrRSH3h0QJT6IiPsLLKm8nNtj"
    };

    // we're defining a function to run after we succesfully get a photo from NASA
    let setImage = function(data) {
        image.src = data.photos[0].img_src; // sets the pic on the page
        document.getElementById('send-text').disabled =false; // disables the button to text the pic
    };

    // makes the actual GET request
    $.ajax({
        url: 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos',
        data: params,
        success: setImage,
        type: 'GET' 
    })


}



function textNasaPhoto() {
    // gets our information from the page
    let sendNumber = document.getElementById('phone').value;
    let message = document.getElementById('text-content').value;

    // sets our Twilio URL (since it's different based on the account you're using)
    let twilioUrl = 'https://api.twilio.com/2010-04-01/Accounts/' + twilio.accountSid + '/Messages.json';
   
    // Twilio needs the info in the POST request body so we have a different way of doing it
    let params = new FormData();

    params.append('To',sendNumber);
    params.append('From',twilio.from);
    params.append('Body',message);
    params.append('MediaUrl',image.src);

    // sets our username and password to the correct things
    // we technically don't need these lines of code but they make the 'beforeSend' function clearer
    let username = "TWILIO ACCOUNT SID";
    let password = "TWILIO API KEY";

    
    $.ajax({
        url: twilioUrl,
        data: params,
        processData: false,
        contentType: false,
        type: 'POST',   
        success: function(data){console.log(data)},
        beforeSend: function (xhr) { // this runs before the request executes and does what "Basic Auth" in Postman did
            xhr.setRequestHeader ("Authorization", "Basic " + btoa(username + ":" + password));
        }

    })
}