//var currentTime = moment("1PM", "hA");//To test other times
var currentTime = moment();
var tasks = [];

var loadTasks = function()
{
    $("#currentDay").text(currentTime.format("dddd, MMMM Do"));

    tasks = JSON.parse(localStorage.getItem("workDayTasks"));

    if(!tasks)
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
        createTask(tasks[i].time, tasks[i].content, i);
    }
};

var createTask = function(time, content, i)
{
    var taskRow = $("<div>").addClass("row").attr("data-index", i);
    var taskTime = $("<p>").addClass("col-1 hour").text(time);
    var taskHour = moment(time, "hA");
    var diff = currentTime.diff(taskHour, "hours");
    var taskContent;
    if(diff >= 0)
    {
        taskContent = $("<textarea>").addClass("col-10 past").val(content);
    }
    else if(diff < -1)
    {
        taskContent = $("<textarea>").addClass("col-10 future").val(content);
    }
    else
    {
        taskContent = $("<textarea>").addClass("col-10 present").val(content);
    }
    var taskSave = $("<button>").addClass("col-1 saveBtn");
    
    taskSave.on("click", function()
    {
        var content = taskContent.val();
        var index = taskRow.attr("data-index");

        tasks[index].content = content;

        localStorage.setItem("workDayTasks", JSON.stringify(tasks))
    });

    var saveIcon = $("<i>").addClass("far fa-save");
    taskSave.append(saveIcon);

    taskRow.append(taskTime);
    taskRow.append(taskContent);
    taskRow.append(taskSave);
    $(".container").append(taskRow);
}


loadTasks();