window.onload = function() {
    var lesson_dates = document.getElementsByClassName('h3');
    var lesson_table = document.getElementsByClassName('lesson-table');
    chrome.storage.local.get("minutes", function(result){
        var additonal_minutes = parseInt(result.minutes);
        var reservations = []
        date_length = lesson_dates.length
        for(let i=0; i < date_length; i++){
            day_formatted = lesson_dates[i].textContent
            day_formatted = day_formatted.replace('年', '/');
            day_formatted = day_formatted.replace('月', '/');
            day_formatted = day_formatted.slice(0,-4);

            var rows = lesson_table[i].rows;
            row_count = rows.length
            for(let j=1; j < row_count; j++){
                var time = (rows[j].cells[1]).getElementsByTagName('p');
                var date = new Date(day_formatted + " " + time[0].textContent);
                var date_additonal = new Date(date);
                var date_end = new Date(date);
                date_additonal.setMinutes(date_additonal.getMinutes() - additonal_minutes);
                date_end.setMinutes(date_end.getMinutes() + 45);
                let date_additional_formatted = formatDate(date_additonal, 'yyyyMMddTHHmmss');
                let date_end_formatted = formatDate(date_end, 'yyyyMMddTHHmmss');
                google_url = "https://www.google.com/calendar/render?action=TEMPLATE&text=Crane&dates=" + date_additional_formatted + "/"+ date_end_formatted;
                reservations.push({"date": lesson_dates[i].textContent + time[0].textContent +"  (" + formatDate  (date_additonal, 'HH:mm') + " 出発)" , "url" :google_url});
            }
        }
        console.log("test");
        console.log(reservations);

        chrome.runtime.sendMessage(
            { value: { contents: reservations } }
        );
        chrome.storage.local.set({"reservations": reservations}, function(){ });
        });
};


function formatDate (date, format) {
    format = format.replace(/yyyy/g, date.getFullYear());
    format = format.replace(/MM/g, ('0' + (date.getMonth() + 1)).slice(-2));
    format = format.replace(/dd/g, ('0' + date.getDate()).slice(-2));
    format = format.replace(/HH/g, ('0' + date.getHours()).slice(-2));
    format = format.replace(/mm/g, ('0' + date.getMinutes()).slice(-2));
    format = format.replace(/ss/g, ('0' + date.getSeconds()).slice(-2));
    format = format.replace(/SSS/g, ('00' + date.getMilliseconds()).slice(-3));
    return format;
};
