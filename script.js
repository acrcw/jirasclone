let addbtn = document.querySelector(".add-btn")
let modalcont = document.querySelector(".modal")
let colors=["p1","p2","p3","p4"];
let locked=new Set() // for changing the ticket locks
let defaultsortingcolor="default";
let objecttciketSet=new Set(); // store the tickets for storting
let arrayofticket=new Map(); // for local storage
let storagearray=[]; // for storing thedata for localstorage
// for sorting the tickets
let toolboxcolor=document.querySelectorAll(".color");
// console.log(toolboxcolor)
toolboxcolor.forEach((box)=>{
    // console.log(box.classList[1])
    box.addEventListener("click",(e)=>{
        // let classcolor=
        defaultsortingcolor=box.classList[1];

        objecttciketSet.forEach ((id)=>{
           let ticketcontainer=document.getElementById(id)
           let colorofcontainer=document.getElementById(id).childNodes[1];
            if(colorofcontainer.getAttribute("class").split(" ")[1]===defaultsortingcolor)
            {
                ticketcontainer.style.display="block"
            }
            else
            {
                ticketcontainer.style.display="none";
            }

        })
    })

    // toreset
    box.addEventListener("dblclick",(e)=>{
        // let classcolor=
        defaultsortingcolor="default";

        objecttciketSet.forEach ((id)=>{
           let ticketcontainer=document.getElementById(id)
          
            // if(colorofcontainer.getAttribute("class").split(" ")[1]===defaultsortingcolor)
            // {
                ticketcontainer.style.display="block"
            // }
            // else
            // {
                // ticketcontainer.style.display="none";
            // }

        })
    })

})



let modalprioritycolor=colors[colors.length-1]; // to save the priority color of the ticket
 // by deafult it is p4
//  console.log(modalcont);


let allprioritycolors=document.querySelectorAll(".box");
// listner for detecting the color slected
allprioritycolors.forEach((color,idx)=>{
    color.addEventListener("click",(e)=>{
        // now remove deafault border on blue color
        allprioritycolors.forEach((colour,idx)=>{
            colour.classList.remove("border"); // to remove deafut priority
         })
         color.classList.add("border");

        //  let prioritycolor=color.classList[0];
        //  console.log(prioritycolor)
         modalprioritycolor=color.classList[0];
        //  console.log(modalcont);
        


    })
})
// console.log("colors= ",allprioritycolors);
addbtn.addEventListener("mouseover", (e) => {
    // console.log(addbtn)
    addbtn.childNodes[0].classList.remove("fa-bounce")
})
addbtn.addEventListener("mouseleave", (e) => {
    addbtn.childNodes[0].classList.add("fa-bounce")

})
let addflag = false;
addbtn.addEventListener("click", (e) => {
    // console.log("buttonclicked ADD");
    // display moddal
    // ifaddflag true->display modal
    // ifaddflag flase->dont display modal
    addflag = !addflag;
    if (addflag) {
        modalcont.style.display = "flex";
    }
    else {
        modalcont.style.display = "none";
    }

})


{/* <div class="ticket-task">${tickettask}</div> */}
let maincontainer = document.querySelector(".main-container");
let textarea = document.querySelector(".textarea-container");

function createticket(ticketcolor,tickettask,ticketid) {
    let ticketcontainer = document.createElement("div");
    ticketcontainer.setAttribute("class", "ticket-container");
    ticketcontainer.setAttribute("id", ticketid);
    ticketcontainer.innerHTML = `  <div class="ticket-color ${ticketcolor}"></div>
    <div class="ticket-id">#${ticketid}</div>
    <textarea class="ticket-task" spellcheck="false"  cols="15" rows="100" wrap="hard">${tickettask}</textarea>

    <div class="ticket-lock"> <i class="fa-solid fa-lock fa-2xs" style="color: #000000;"></i><i class="fa-solid fa-xmark remove  fa-2xs" style="color: #ffffff;"></i></div>
    `;
    // ticketarea.disabled=true;
    let textarea1= ticketcontainer.querySelector("textarea");
    textarea1.disabled=true;
    maincontainer.appendChild(ticketcontainer)
    objecttciketSet.add(ticketid)// store ticket id
    arrayofticket.set(ticketid,ticketcontainer)
    console.log()
    storagearray=[];
    for (const [key, value] of arrayofticket) {       
       storagearray.push({id:key,classcolor:value.childNodes[1].classList[1],textarea:value.childNodes[5].innerHTML})
    }
 
    

    localStorage.setItem("jira-tickets",JSON.stringify(storagearray))
    
    
    allprioritycolors.forEach((colour,idx)=>{
        colour.classList.remove("border"); // to remove deafut priority
     })
     allprioritycolors[allprioritycolors.length-1].classList.add("border");

     //handle event here while creating a ticket
    //  let currentpriority=ticketcolor;
    //  console.log(ticketcolor)
     let setcolor=ticketcontainer.querySelector(".ticket-color");

     setcolor.addEventListener("click",(e)=>{
        // console.log()
       
        let i;
        let currentcolor=e.target.classList[1]
        // console.log(currentcolor)
       for(i=0;i<colors.length;i++)
       {
        
        if(colors[i]===currentcolor)
        {
            break;
        }
    }
       setcolor.classList.remove(currentcolor)   
       setcolor.classList.add(colors[(i+1)%colors.length]);
       let idx=e.srcElement.parentElement.getAttribute("id")
       let newcontainer=document.getElementById(idx);
       arrayofticket.set(idx,newcontainer)
    //    console.log("new container",mycontainer)

       storagearray=[];
       for (const [key, value] of arrayofticket) {       
          storagearray.push({id:key,classcolor:value.childNodes[1].classList[1],textarea:value.childNodes[5].innerHTML})
        //   console.log(value.childNodes[1].classList[1])
       }
       localStorage.setItem("jira-tickets",JSON.stringify(storagearray))
     })

    let lock=ticketcontainer.querySelector(".fa-lock") 
    let cross=ticketcontainer.querySelector(".remove")
    lock.addEventListener("mouseenter",(e)=>{
        lock.classList.add("fa-shake");
    })
    lock.addEventListener("click",(e)=>{
        let id=e.target.parentNode.parentElement.getAttribute("id");
        let container=document.getElementById(id);
        let ticketarea=container.querySelector(".ticket-task")
        console.log(ticketarea)
        ticketarea.spellcheck = false;
        ticketarea.disabled=true;
        
        
       if(locked.has(id)) // if it is locked
       {
        locked.delete(id)
        lock.classList.remove("fa-lock");
        lock.classList.add("fa-lock-open");
       
      
        // ticketarea.setAttribute("contenteditable","true")
        ticketarea.disabled=false;
        
       
       }
       else
       {
        locked.add(id)
        lock.classList.remove("fa-lock-open");
        lock.classList.add("fa-lock");
        // ticketarea.setAttribute("contenteditable","false")
        let textareaagain=container.querySelector("textarea")
        console.log(textareaagain.value)
        container.childNodes[5].innerText=textareaagain.value // update the textarea value
       
        ticketarea.disabled=true;
      
        arrayofticket.set(id,container)
        // console.log(arrayofticket)
        storagearray=[];
        for (const [key, value] of arrayofticket) {       
            storagearray.push({id:key,classcolor:value.childNodes[1].classList[1],textarea:value.childNodes[5].innerHTML})
         }
         localStorage.setItem("jira-tickets",JSON.stringify(storagearray))
    }
    //    console.log(locked)
    })
    lock.addEventListener("mouseleave",(e)=>{
        lock.classList.remove("fa-shake");
    })


    // cross events
    cross.addEventListener("mouseenter",(e)=>{
        cross.classList.add("fa-bounce");
       
        
    })
    cross.addEventListener("click",(e)=>{
        let id=e.target.parentNode.parentElement.getAttribute("id");
       document.getElementById(id).remove()
       objecttciketSet.delete(id)// remove ticket id
       arrayofticket.delete(id) // remove from map
       storagearray=[];
    for (const [key, value] of arrayofticket) {       
        storagearray.push({id:key,classcolor:value.childNodes[1].classList[1],textarea:value.childNodes[5].innerHTML})
     }
     localStorage.setItem("jira-tickets",JSON.stringify(storagearray))
       
        
    })
    cross.addEventListener("mouseleave",(e)=>{
        cross.classList.remove("fa-bounce");
     
    })

    
    


}
// function handleremoval()
let submit = document.getElementById("sub")
// console.log(submit);
submit.addEventListener("click", (e) => {
    modalcont.style.display = "none";
    createticket(modalprioritycolor,textarea.value,shortid());
    modalprioritycolor=colors[colors.length-1]; //set the default priority again to blue
    textarea.value = "";


})

// setInterval(()=>{
    
// let locks=document.querySelectorAll(".fa-lock") 
// let crosses=document.querySelectorAll(".remove")

// console.log(locks);
// locks.forEach((lock)=>{
    // lock.addEventListener("mouseenter",(e)=>{
    //     lock.classList.add("fa-shake");
        
    // })
    // lock.addEventListener("click",(e)=>{
    //     let id=e.target.parentNode.parentElement.getAttribute("id");
    //     let container=document.getElementById(id);
    //     let ticketarea=container.querySelector(".ticket-task")
    //     ticketarea.spellcheck = false;
    //    if(locked.has(id))
    //    {
    //     locked.delete(id)
    //     lock.classList.remove("fa-lock");
    //     lock.classList.add("fa-lock-open");
       
      
    //     ticketarea.setAttribute("contenteditable","true")
       
    //    }
    //    else
    //    {
    //     locked.add(id)
    //     lock.classList.remove("fa-lock-open");
    //     lock.classList.add("fa-lock");
    //     ticketarea.setAttribute("contenteditable","false")
    // }
      
       
    //    console.log(locked)
       
        
    // })
    // lock.addEventListener("mouseleave",(e)=>{
    //     lock.classList.remove("fa-shake");
    // })
// })
// crosses.forEach((cross)=>{
    // cross.addEventListener("mouseenter",(e)=>{
    //     cross.classList.add("fa-bounce");
       
        
    // })
    // cross.addEventListener("click",(e)=>{
    //     let id=e.target.parentNode.parentElement.getAttribute("id");
    //    console.log(document.getElementById(id).remove())
       
        
    // })
    // cross.addEventListener("mouseleave",(e)=>{
    //     cross.classList.remove("fa-bounce");
     
    // })
// })},5000)

//retrive data from local storage

setTimeout(function(){
// Retrieve the string from localStorage
const storedObjectsArrayString = localStorage.getItem('jira-tickets');

// Convert the string back into an array of objects
const storedObjectsArray = JSON.parse(storedObjectsArrayString);

for(let item=0;item<storedObjectsArray.length;item++)
{
    console.log(storedObjectsArray[item]);
    regenrateticket(storedObjectsArray[item].classcolor,storedObjectsArray[item].textarea,storedObjectsArray[item].id)
    // console.log(item[0]) //id
    // console.log(item[1]) // classcolor
    // console.log(item[2]) // textarea
}

},2000);

function regenrateticket(ticketcolor,tickettask,ticketid) {
    let ticketcontainer = document.createElement("div");
    ticketcontainer.setAttribute("class", "ticket-container");
    ticketcontainer.setAttribute("id", ticketid);
    ticketcontainer.innerHTML = `  <div class="ticket-color ${ticketcolor}"></div>
    <div class="ticket-id">#${ticketid}</div>
    <textarea class="ticket-task" spellcheck="false"  cols="15" rows="100" wrap="hard">${tickettask}</textarea>

    <div class="ticket-lock"> <i class="fa-solid fa-lock fa-lg" style="color: #000000;"></i><i class="fa-solid fa-xmark remove fa-lg" style="color: #ffffff;"></i></div>
    `;
    
    let textarea1= ticketcontainer.querySelector("textarea");
    textarea1.disabled=true;
    maincontainer.appendChild(ticketcontainer)
    objecttciketSet.add(ticketid)// store ticket id
    arrayofticket.set(ticketid,ticketcontainer)
    // console.log()
    
    
    allprioritycolors.forEach((colour,idx)=>{
        colour.classList.remove("border"); // to remove deafut priority
     })
     allprioritycolors[allprioritycolors.length-1].classList.add("border");

     //handle event here while creating a ticket
    //  let currentpriority=ticketcolor;
    //  console.log(ticketcolor)
     let setcolor=ticketcontainer.querySelector(".ticket-color");

     setcolor.addEventListener("click",(e)=>{
        // console.log()
       
        let i;
        let currentcolor=e.target.classList[1]
        // console.log(currentcolor)
       for(i=0;i<colors.length;i++)
       {
        
        if(colors[i]===currentcolor)
        {
            break;
        }
    }
       setcolor.classList.remove(currentcolor)   
       setcolor.classList.add(colors[(i+1)%colors.length]);
       let idx=e.srcElement.parentElement.getAttribute("id")
       let newcontainer=document.getElementById(idx);
       arrayofticket.set(idx,newcontainer)
    //    console.log("new container",mycontainer)

       storagearray=[];
       for (const [key, value] of arrayofticket) {       
          storagearray.push({id:key,classcolor:value.childNodes[1].classList[1],textarea:value.childNodes[5].innerHTML})
        //   console.log(value.childNodes[1].classList[1])
       }
       localStorage.setItem("jira-tickets",JSON.stringify(storagearray))
     })

    let lock=ticketcontainer.querySelector(".fa-lock") 
    let cross=ticketcontainer.querySelector(".remove")
    lock.addEventListener("mouseenter",(e)=>{
        lock.classList.add("fa-shake");
    })
    lock.addEventListener("click",(e)=>{
        let id=e.target.parentNode.parentElement.getAttribute("id");
        let container=document.getElementById(id);
        let ticketarea=container.querySelector(".ticket-task")
        console.log(ticketarea)
        ticketarea.spellcheck = false;
        ticketarea.disabled=true;
        
        
       if(locked.has(id)) // if it is locked
       {
        locked.delete(id)
        lock.classList.remove("fa-lock");
        lock.classList.add("fa-lock-open");
       
      
        // ticketarea.setAttribute("contenteditable","true")
        ticketarea.disabled=false;
        
       
       }
       else
       {
        locked.add(id)
        lock.classList.remove("fa-lock-open");
        lock.classList.add("fa-lock");
        // ticketarea.setAttribute("contenteditable","false")
        let textareaagain=container.querySelector("textarea")
        console.log(textareaagain.value)
        container.childNodes[5].innerText=textareaagain.value // update the textarea value
       
        ticketarea.disabled=true;
      
        arrayofticket.set(id,container)
        // console.log(arrayofticket)
        storagearray=[];
        for (const [key, value] of arrayofticket) {       
            storagearray.push({id:key,classcolor:value.childNodes[1].classList[1],textarea:value.childNodes[5].innerHTML})
         }
         localStorage.setItem("jira-tickets",JSON.stringify(storagearray))
    }
    //    console.log(locked)
    })
    lock.addEventListener("mouseleave",(e)=>{
        lock.classList.remove("fa-shake");
    })


    // cross events
    cross.addEventListener("mouseenter",(e)=>{
        cross.classList.add("fa-bounce");
       
        
    })
    cross.addEventListener("click",(e)=>{
        let id=e.target.parentNode.parentElement.getAttribute("id");
       document.getElementById(id).remove()
       objecttciketSet.delete(id)// remove ticket id
       arrayofticket.delete(id) // remove from map
       storagearray=[];
    for (const [key, value] of arrayofticket) {       
        storagearray.push({id:key,classcolor:value.childNodes[1].classList[1],textarea:value.childNodes[5].innerHTML})
     }
     localStorage.setItem("jira-tickets",JSON.stringify(storagearray))
       
        
    })
    cross.addEventListener("mouseleave",(e)=>{
        cross.classList.remove("fa-bounce");
     
    })
}