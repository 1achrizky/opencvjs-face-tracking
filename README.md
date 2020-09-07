# OpenCV Face Recognisition & Tracking

Unpacking the feature of the Face recognition OpenCV with realtime face tracking using opencv.js library straight into your browser.
This project uses feature of OpenCV using a JS library to somethely detect recognise and trace faces.

## What This Project Does?
The purpose of the project was to build a simple easy to web app where user can register there facial recognition, app track the user face and capture face specified in the red highlighted square box which images were uploaded to a S3 Bucket to trained for someother use case.
Update the keys/Secret in the *server.js* file and deploy and start using it.

[index.js](assets/js/index.js) 
The above file has code how to start the camera and track the face.
We intend to use functionality of the `CascadeClassifier` to detect and recognise the faces using already defined `haarcascade frontalface model`.

### Library used:
* opencv.js

### Sample
![screenshot-1](/screenshots/Screenshot-1.png?raw=true "Screenshot 1")
<img src="https://assets-cdn.github.com/images/modules/logos_page/GitHub-Mark.png" width="256" height="256" title="Github Logo">
![screenshot-2](/screenshots/Screenshot-2.png?raw=true "Screenshot 2")
![screenshot-3](/screenshots/Screenshot-3.png?raw=true "Screenshot 3")

### IMP
Currently image submission will throw error as S3 secrets in the server.js are not present.
