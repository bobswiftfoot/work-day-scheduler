//var currentTime = moment("1PM", "hA");//To test other times
var currentTime = moment();
var tasks = [];

var loadTasks = function()
{
    $("#currentDay").text(currentTime.format("dddd, MMMM Do"));

    tasks = localStorage.getItem("workDayTasks");

    if(!tasks);
    {
        tasks = [];
        //9am to 5pm
        for(var i = 9; i <= 17; i++)
        {
            var timeData = i;
            if(i < 12)
                timeData = i + "AM";
            else   
            {
                if(i != 12)
                    timeData = i - 12;
                timeData += "PM";
            }
            tasks.push(task = 
                {
                time:timeData,
                content:""
                });
        }
    }

    for(var i = 0; i < tasks.length; i++)
    {
        createTask(tasks[i].time, tasks[i].content);
    }
};

var createTask = function(time, content)
{
    var taskRow = $("<div>").addClass("row");
    var taskTime = $("<p>").addClass("col-1 hour").text(time);
    var taskHour = moment(time, "hA");
    var diff = currentTime.diff(taskHour, "hours");
    if(diff >= 0)
    {
        var taskContent = $("<p>").addClass("col-10 past").text(content);
    }
    else if(diff < -1)
    {
        var taskContent = $("<p>").addClass("col-10 future").text(content);
    }
    else
    {
        var taskContent = $("<p>").addClass("col-10 present").text(content);
    }
    var taskSave = $("<button>").addClass("col-1 saveBtn");
    var saveIcon = $("<i>").addClass("far fa-save");
    taskSave.append(saveIcon);

    taskRow.append(taskTime);
    taskRow.append(taskContent);
    taskRow.append(taskSave);
    $(".container").append(taskRow);
}

loadTasks();