import {
    format,
    fromUnixTime,
    getUnixTime,
    addMonths,
    subMonths,
    startOfMonth,
    startOfWeek,
    endOfMonth,
    endOfWeek,
    eachDayOfInterval,
    addDays,
    isSameDay,
    isSameMonth,
    differenceInCalendarDays,
} from "date-fns"

//小月曆
const productionDate=document.querySelector("#productionDate")
const datePickerSmall=document.querySelector(".date-picker-small")
const smallTitle=document.querySelector(".current-month-small")
const smallPreviousMonth=document.querySelector(".prev-month-button-small")
const smallNextMonth=document.querySelector(".next-month-button-small")
const dateButtonSmall=document.querySelectorAll(".date-small")
const smallContainer=document.querySelector(".date-picker-small")

let currentDateSmall=new Date()
let selectedDateSamll=currentDateSmall
setTitleSmall(currentDateSmall)

function setTitleSmall(date){
    smallTitle.innerHTML=format(date,"MMMM - yyyy")
    setDateSmall(date)
}

function setDateSmall(date){
    const firstDayOfMonth=startOfMonth(date)
    const firstDayOfWeek=startOfWeek(firstDayOfMonth)
    const LastDayOfMonth=endOfMonth(date)
    const LastDayOfWeek=endOfWeek(LastDayOfMonth)
    const interval=eachDayOfInterval({start:firstDayOfWeek,end:LastDayOfWeek})

    dateButtonSmall.forEach((item,index) =>{
        item.innerHTML=""
        item.classList.remove("date-picker-other-month-date")
        item.classList.remove("selected")
        item.innerHTML=(interval[index]).getDate()
        item.dataset.date=interval[index]

        if(!(isSameMonth(item.dataset.date,smallTitle.innerHTML))){
            item.classList.add("date-picker-other-month-date")
        }

        if(isSameDay(item.dataset.date,selectedDateSamll)){
            item.classList.add("selected")
        }
    })
}

productionDate.addEventListener("click",()=>{
    datePickerSmall.classList.toggle("show")
})

//箭頭
smallNextMonth.addEventListener("click",()=>{
    currentDateSmall=addMonths(currentDateSmall,1)
    setTitleSmall(currentDateSmall)
})

smallPreviousMonth.addEventListener("click",()=>{
    currentDateSmall=subMonths(currentDateSmall,1)
    setTitleSmall(currentDateSmall)
})

//小月曆點日期後即呼叫addDay
dateButtonSmall.forEach(button=>{
    button.addEventListener("click",()=>{
        selectedDateSamll=button.dataset.date
        smallContainer.classList.remove("show")
        setTitleSmall(selectedDateSamll)
        setInputDate(selectedDateSamll)
        if(exp.value!=="" && product.value!==""){
            addDay(selectedDateSamll)
        } 
        
        exp.value=""
        product.value=""
        productionDate.value=""
    })
    
    
})

function setInputDate(date){
    productionDate.value=format(date,"yyyy.MM.dd")
}

//大月曆
const scheduleTitle=document.querySelector(".current-month")
const nextMonth=document.querySelector(".next-month-button")
const prevMonth=document.querySelector(".prev-month-button")
const dateButton=document.querySelectorAll(".date-large")
const form=document.querySelector("#newTodo")
const input=document.querySelector("[data-newItem]")
const list=document.querySelector("#list")
let currentDate=new Date()
let selectedDate=currentDate

//不是很懂為何只有將以下兩個function放在此處才抓地到localstorage的資料
const local_storage_prefix="advancedToDoList&Calendar"
const local_storage_key=`${local_storage_prefix}-todo`
function loadTodo(){
    const todoString=localStorage.getItem(local_storage_key)
    return JSON.parse(todoString)||[]
}

function saveTodo(){
    localStorage.setItem(local_storage_key,JSON.stringify(todoList))//儲存陣列
}

let todoList=loadTodo()//從localstorage中取得上次存取的陣列
setTitle(currentDate)
setTodos()
renderTodos()

function setTitle(date){
    scheduleTitle.innerHTML=format(date,"MMMM - yyyy")    
    setDate(date)
}

//#region
function setDate(date){
    const firstDayOfMonth=startOfMonth(date)
    const firstDayOfWeek=startOfWeek(firstDayOfMonth)
    const LastDayOfMonth=endOfMonth(date)
    const LastDayOfWeek=endOfWeek(LastDayOfMonth)
    const interval=eachDayOfInterval({start:firstDayOfWeek,end:LastDayOfWeek})     

    dateButton.forEach((item,index) =>{
        item.innerHTML=""
        item.classList.remove("selected")            
        item.classList.remove("date-picker-other-month-date") 
        
        //印出日期
        item.innerHTML=(interval[index]).getDate()
        item.dataset.date=getUnixTime(interval[index])//每個日期button設id         
        const dateID=fromUnixTime(item.dataset.date)   
        if(!(isSameMonth(dateID,scheduleTitle.innerHTML))){
            item.classList.add("date-picker-other-month-date")
        }

        if(isSameDay(dateID,selectedDate)){
            item.classList.add("selected")
        }
    })
}



//1.顯示樣品數量在大月曆上
//2.創立模板至大月曆button上(唯一使用到template的地方)
function setTodos(){
    if(todoList.length===0) return    

    //大月曆的每個日期和todoList中的日期比對
    dateButton.forEach(item=>{
        //檢查是否已存在span，若有則選，若無則創立       
        let span=item.querySelector("span")
        if (span===null){
            const spanNew=document.createElement("span")
            span=spanNew
            item.appendChild(span)
        }
        
        //刪除button中的所有li
        const liElements=item.querySelectorAll("li")
        liElements.forEach(li=>{
            li.remove()
        })

        const dateID=fromUnixTime(item.dataset.date)//取得日期button的id

        todoList.forEach(obj=>{      
            if(isSameDay(dateID,obj.time)){
                if(obj.todo==="清酒"||obj.todo==="吟釀"||obj.todo==="黃酒"||obj.todo==="紹興"||obj.todo==="葡萄酒"){
                    // console.log(obj.time)
                    const template=document.querySelector("template")
                    const templateClone=template.content.cloneNode(true)//複製li
                    const listItemText=templateClone.querySelector("[data-list-item-text]")
                    let todoID=templateClone.querySelector("[data-todoID]")
                    todoID=obj.id
                    let days=differenceInCalendarDays(dateID,obj.productionDate)
                    days=days+1
                    listItemText.textContent=obj.todo+obj.exp+" "+"day"+days
                    item.appendChild(templateClone)                  
                }else{
                    const template=document.querySelector("template")
                    const templateClone=template.content.cloneNode(true)//複製li
                    const listItemText=templateClone.querySelector("[data-list-item-text]")
                    let todoID=templateClone.querySelector("[data-todoID]")
                    todoID=obj.id
                    listItemText.textContent=obj.todo
                    item.appendChild(templateClone)
                }

                //顯示樣品數量在大月曆上
                const samplesAmount=item.querySelectorAll("li")
                span.innerHTML=`(${samplesAmount.length})`
                span.classList.add("sampleList")
            }
        })
    }) 
}
// #endregion       
     
//按大月曆日期後顯示待辦
dateButton.forEach(item=>{
    item.addEventListener("click",()=>{
        selectedDate=fromUnixTime(item.dataset.date)
        setTitle(selectedDate)
        setTodos()

    const todos=item.querySelectorAll("[data-list]")//選到很多<li>
    if (todos===null) return

    const list=document.querySelector("#list")
    list.innerHTML=""//每次按大月曆日期都先清空再顯示
    todos.forEach(todo=>{
            list.appendChild(todo)
            todo.classList.remove("displayNone")
        })    
    })
})

//顯示待辦(使用時機：初始化時、addtodo時)(因非事件觸發故設此fuction)
//選擇今日button內的所有<li>
function renderTodos(){
    dateButton.forEach(button=>{
        if(isSameDay(fromUnixTime(button.dataset.date),selectedDate)){
            const todos=button.querySelectorAll("[data-list]")//選到很多<li>
        
            if (todos===null) return

            const list=document.querySelector("#list")
            list.innerHTML=""
            todos.forEach(todo=>{
                list.appendChild(todo)
                todo.classList.remove("displayNone")
            })    
        }
    })
}

//上月、下月箭頭
nextMonth.addEventListener("click",()=>{
    currentDate=addMonths(currentDate,1)
    setTitle(currentDate)
    setTodos()    
})

prevMonth.addEventListener("click",()=>{
    currentDate=subMonths(currentDate,1)
    setTitle(currentDate)
    setTodos()
})

//算天數並儲存
function addDay(date){
    let day5=addDays(date,4)    
    let day8=addDays(date,7)
    let day13=addDays(date,12)
    let day18=addDays(date,17)
    let day19=addDays(date,18)

    let newArray=[]//此處保持更新，維持五個日期
    newArray.push(day5,day8,day13,day18,day19)

    //以下目的為儲存每次輸入的品項與批號及投料日
    //選擇user輸入的品項
    const product=document.querySelector("select#product")
    const exp=document.querySelector("#exp")

    //創立五個物件傳入todolist
    const item1={
        todo:product.value,
        time:day5,
        exp:exp.value,
        productionDate:productionDate.value,
        complete:false,
        id:getUnixTime(day5)
    }

    const item2={
        todo:product.value,
        time:day8,
        exp:exp.value,
        productionDate:productionDate.value,
        complete:false,
        id:getUnixTime(day8)
    }

    const item3={
        todo:product.value,
        time:day13,
        exp:exp.value,
        productionDate:productionDate.value,
        complete:false,
        id:getUnixTime(day13)
    }

    const item4={
        todo:product.value,
        time:day18,
        exp:exp.value,
        productionDate:productionDate.value,
        complete:false,
        id:getUnixTime(day18)
    }   

    const item5={
        todo:product.value,
        time:day19,
        exp:exp.value,
        productionDate:productionDate.value,
        complete:false,
        id:getUnixTime(day19)
    }   
    todoList.push(item1,item2,item3,item4,item5)    
    saveTodo()
    setDate(selectedDate)
    setTodos()
}

//(user點日期後輸入待辦後)
//1.儲存
//2.顯示待辦
//3.更新大月曆樣品數
form.addEventListener("submit",e=>{
    e.preventDefault()

    const item={
        todo:input.value,
        time:selectedDate,
        complete:false,
        id:getUnixTime(selectedDate)
    }
    todoList.push(item)
    saveTodo()
    setTodos()
    renderTodos()

    input.value=""
})

//complete todos
list.addEventListener("change",e=>{
    if(!e.target.matches("[data-list-item-checkbox]")) return

    const parent=e.target.closest("[data-list]")
    const todoID=parent.dataset.todoID
    const todo=todoList.find(t=>t.id===todoID)
    todo.complete=e.target.checked
    saveTodo()
})




//delete todos
//點錯日期?再點一次日期取消?
