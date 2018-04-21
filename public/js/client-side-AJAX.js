/**
 * This file is a sample client side AJAX file used to communicate with HTML 
 * or template files. Note that there are no example HTML or templating files
 * in this skeleton.
 */

//client side AJAX for delete
var deleteAJAX = function(obj) {
    var objId = obj._id;
    var xhr = new XMLHttpRequest();
    xhr.open("DELETE", "/api/" + objId);
    xhr.send();
    xhr.addEventListener("readystatechange", function() {
        if(this.readyState == 4 && this.status == 200) {
            console.log("success");
            console.log(this.response); 
            window.location.href = "/"; //use window.location.href to redirect if needed
        }
    });
};

//client side AJAX for list
var listAJAX = function() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/api");
    xhr.send();
    xhr.addEventListener("readystatechange", function() {
        if(this.readyState == 4 && this.status == 200) {
            console.log("success");
            console.log(this.response);
        }
    });
};

//client side AJAX for finding a single object
var findOneAJAX = function(obj) {
    var objId = obj._id;
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/api/" + objId);
    xhr.send();
    xhr.addEventListener("readystatechange", function() {
        if(this.readyState == 4 && this.status == 200) {
            console.log("success");
            console.log(this.response);
        }
    });
};

//client side AJAX for update
var updateAJAX = function(obj) {
    //assumes you have a form element with a field id 'name'
    var name = document.getElementById('name').value;
    //assumes you have a form element with a field id 'description'
    var description = document.getElementById('description').value;
    //note these params must match the params of your model
    var params = {
        name: name,
        description : description
    };
    var objId = obj._id;
    var xhr = new XMLHttpRequest();
    xhr.open("PUT", "/api/" + objId);
    xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
    xhr.send(JSON.stringify(params));
    xhr.addEventListener("readystatechange", function() {
        if(this.readyState == 4 && this.status == 200) {
            console.log("success");
            console.log(this.response); 
            window.location.href = "/"; //use window.location.href to redirect if needed
        }
    });
};

//client side ajax for post a form element that includes a file upload
var postAJAX = function() {
    let input = document.querySelector('input[type="file"]');
    let data = new FormData();
    //note that the data params must match your model params
    data.append('image', input.files[0]); //assumes there is a file upload
    //assumes you have a form element with a field id 'name'
    data.append('name', document.getElementById('name').value); 
    //assumes you have a form element with a field id 'description'
    data.append('description', document.getElementById('description').value);
    
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/api");
    xhr.send(data);
    xhr.addEventListener("readystatechange", function() {
        if(this.readyState == 4 && this.status == 201) {
            window.location.href = "/"; //use window.location.href to redirect if needed
        }
    });
};