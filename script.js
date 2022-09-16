//let hh=document.getElementById("hh")
let mm=document.getElementById("mm")
let ss=document.getElementById("ss")
currentTime=0

isRunning=false // track of running status of clock


let start = document.getElementById("start")
let reset = document.getElementById("reset")

//time + - buttons
let splus = document.getElementById("s+")
let sminus = document.getElementById("s-")

let bplus = document.getElementById("b+")
let bminus = document.getElementById("b-")

sessionTime = 0
breakTime = 0

//session /break time display labels
let stime = document.getElementById("s-time")
let btime = document.getElementById("b-time")

//status label
let statuss = document.getElementById("status-display")
 

//session time timer setup
splus.addEventListener("click",function()
{
    if(!isRunning)
    {
        sessionTime++
        stime.innerHTML=sessionTime+" min"
    }
    else{
        return
    }
  
})
sminus.addEventListener("click",function()
{
    if(!isRunning)
    { 
        if (sessionTime>0)
        {
            sessionTime--
            stime.innerHTML=sessionTime+" min"
        }
        else{
            return
        }

    }
    else{
        return
    }
})

//breaktime timer
bplus.addEventListener("click",function()
{
    if(!isRunning)
    {
        breakTime++
        btime.innerHTML=breakTime+" min"
    }
    else{
        return
    }
    
})
bminus.addEventListener("click",function()
{
    if(!isRunning)
    { 
        if (breakTime>0)
        {
            breakTime--
            btime.innerHTML=breakTime+" min"
        }
        else{
            return
        }

    }
    else{
        return
    }
  
})


function setTime(currentTime) // function for setting time to label in dom
{
    //let hour=parseInt(currentTime/60/60)%12
    let minute=parseInt(currentTime/60)%60
    let second=currentTime%60
    //hh.innerHTML= hour<10 ? "0"+hour : hour       // appending 0 before currenttime if single digit
    mm.innerHTML=minute<10 ? "0"+minute : minute
    ss.innerHTML=second<10 ?"0"+second : second

}


start.addEventListener("click",function()
{
    if (sessionTime && breakTime) // only work when session and break time entered
    {
        statuss.innerHTML="Session started"

    if (currentTime==0)// for solving pause conflict, current time is only set once and the same continues till end 
    {
        sessionTime=sessionTime*60 // seconds
        currentTime=sessionTime
    }
     

    isRunning=!isRunning //same button start/pause functionality . when this button will again be clicked for pausing, at that time isRunning will be initially true and the not operator will make it false so that it goes to else condition and works as pause button.
    
    updateButton() // updates label of start to pause if isrunning else to start

    if(isRunning) // before this label is set to pause 
    {
    timer = setInterval(function(){
        currentTime--

        if (currentTime==0) // after each second check if session timer = 0, if true clear this interval and update currentTime to break*60 and setup new interval for break timer.
        {
            clearInterval(timer)
            updateButton()
            statuss.innerHTML="Break !"

            currentTime=breakTime*60
            //new interval break with currentTime breaktime*60
            breakk=setInterval(function()
            {
                currentTime--
                if (currentTime==0)
                {
                    clearInterval(breakk) //when break end, clear this interval 
                }
                setTime(currentTime)
            },1000)

        }
    
        setTime(currentTime)
    },1000)
    }
    else{
        clearInterval(timer)
    }
    }
    else{
        return
    }
   
})

reset.addEventListener("click",function()
{
    isRunning=false 
    clearInterval(timer)
    currentTime=0
    sessionTime=0
    breakTime=0
    btime.innerHTML=""
    stime.innerHTML=""
    statuss.innerHTML=""
    setTime(currentTime)
    updateButton()
})

function updateButton()
{
    if (isRunning)
    {
        start.innerHTML="Pause"
        return 
    }

    start.innerHTML="Start"
    
}
