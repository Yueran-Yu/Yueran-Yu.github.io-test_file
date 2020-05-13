const myImage = document.querySelector('img');
const myRequest = new Request('flowers.jpg');

fetch(myRequest)
    .then(function(response) {
        if (!response.ok) {
            throw new Error("HTTP error, status = " + response.status);
        }
        return response.blob();
    })
    .then(function(myBlob) {
        var objectURL = URL.createObjectURL(myBlob);
        myImage.src = objectURL;
    })
    .catch(function(error) {
        var p = document.createElement('p');
        p.appendChild(
            document.createTextNode('Error: ' + error.message)
        );
        document.body.insertBefore(p, myImage);
    });