window.onload = function(){

    chrome.storage.local.get("minutes", function(result){
        document.getElementById("minutes").value = result.minutes;
        console.log(result);
        if (typeof result.minutes  === "undefined"){
            chrome.storage.local.set({"minutes": 0}, function(){ });
            document.getElementById("minutes").value = 0;

        }
    });

    chrome.storage.local.get("reservations", function(result){
        var reservations = result.reservations

        var main_container = document.getElementById("main_container")
        for(content of reservations){
            var new_element = document.createElement('a');
            var new_br = document.createElement('br');
    
            new_element.href = content.url;
            new_element.textContent = content.date;
            new_element.target = "_blank";
    
            main_container.appendChild(new_element);
            new_element.appendChild(new_br);        
        };
    }); 
};

document.getElementById("minutes-save").addEventListener("click", ()=>{
    var inputValue = document.getElementById("minutes").value;
    chrome.storage.local.set({"minutes": inputValue}, function(){ });

});
