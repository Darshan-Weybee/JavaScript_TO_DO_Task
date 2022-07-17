let addbtn = document.querySelector(".addbtn");
let searchbtn = document.querySelector(".searchbtn");
let allbtn = document.querySelector(".allbtn");
let activebtn = document.querySelector(".activebtn");
let completedbtn = document.querySelector(".completedbtn");
let inputText = document.querySelector(".inputbox");
let addData = document.querySelector(".data");
let dropDownSort = document.querySelector(".sort");
let dropDownAction = document.querySelector(".action");
let inputValue = [];
let completedTask = [];
let activeTask = inputValue;
let deleteBtn;
let editBtn;
let i = 0;
let addFlag = false;
let searchFlag = false;
let elementId;
let spanAr;

// ============================================================
//  ========== Add Button  ==================================
addbtn.addEventListener("click", function (e) {
    addFlag = true;
    searchFlag = false;

    activeCss(addbtn);
    removeCss(searchbtn);
    if (addFlag) {
        console.log({ addFlag, searchFlag });
        inputText.classList.remove("hidden");
        inputText.focus();

        inputText.addEventListener("keydown", addText);
        inputText.removeEventListener("input", search);

    }
});
function addText(eve) {
    console.log(inputText.value);
    console.log({ addFlag, searchFlag });
    if (inputText.value != " " || inputText.value != "" && addFlag) {
        let html = data(`${inputText.value.trim()}`);
        // console.log({ addFlag, searchFlag });
        if (eve.key == "Enter" && addFlag) {
            addData.insertAdjacentHTML("afterbegin", html);
            setId(i);

            inputValue.push(`${inputText.value}`);
            i++;
            inputText.value = "";

            // =====================================ALL =========
            // spanAr = document.querySelectorAll(".newData");
            // let elementId = document.querySelectorAll(`input[name="cb"]`);
            // console.log({ elementId });
            // for (let ele of elementId) {
            //     console.log("for");
            //     ele.addEventListener("change", function () {
            //         console.log("for");
            //         if (ele.checked) {
            //             let index = ele.id.slice(-1);
            //             document.querySelector(`#main--${index}`).style.display = "none";
            //             let value = document.querySelector(`#newData--${index}`).textContent;
            //             completedTask.push(value);
            //             console.log({ completedTask });
            //             addData.innerHTML = "";
            //             i = 0;
            //             for (let word of inputValue) {
            //                 let html = data(word);
            //                 addData.insertAdjacentHTML("afterbegin", html);
            //                 setId(i);
            //                 if (completedTask.includes(word))
            //                     document.querySelector(`#check--${i}`).checked = true;
            //                 i++;
            //             }
            //         }
            //     });
            // }
        }
    }
}

function editfun(id) {
    id = id.slice(-1);

    document.querySelector(`#newData--${id}`).classList.toggle("hidden");
    document.querySelector(`#newDataInput--${id}`).classList.toggle("hidden");
    document.querySelector(`#newDataInput--${id}`).focus();
    document.querySelector(`#edit--${id}`).classList.toggle("hidden");
    document.querySelector(`#close--${id}`).classList.toggle("hidden");
    document.querySelector(`#newDataInput--${id}`).value = document.querySelector(`#newData--${id}`).textContent;

    document.querySelector(`#newDataInput--${id}`).addEventListener("keydown", function (e) {
        if (e.key == "Enter") {
            document.querySelector(`#newData--${id}`).classList.toggle("hidden");
            document.querySelector(`#newDataInput--${id}`).classList.toggle("hidden");
            document.querySelector(`#edit--${id}`).classList.toggle("hidden");
            document.querySelector(`#close--${id}`).classList.toggle("hidden");

            let inxInput = inputValue.indexOf(document.querySelector(`#newData--${id}`).textContent);
            inputValue[inxInput] = document.querySelector(`#newDataInput--${id}`).value;

            let inxActive = activeTask.indexOf(document.querySelector(`#newData--${id}`).textContent);
            activeTask[inxActive] = document.querySelector(`#newDataInput--${id}`).value;

            let inxCompleted = completedTask.indexOf(document.querySelector(`#newData--${id}`).textContent);
            completedTask[inxCompleted] = document.querySelector(`#newDataInput--${id}`).value;

            document.querySelector(`#newData--${id}`).textContent = document.querySelector(`#newDataInput--${id}`).value;
        }
    });

}
function deletefun(id) {
    let idx = id.slice(-1);
    document.querySelector(`#main--${idx}`).style.display = "none";
    let value = document.querySelector(`#newData--${idx}`).textContent;
    inputValue = inputValue.filter(ele => ele != value);
    completedTask = completedTask.filter(ele => ele != value);
    activeTask = activeTask.filter(ele => ele != value);
}
// ============================================================
//  ========   Sort DropDown   ==================================
dropDownSort.addEventListener("click", function (e) {
    let dropDownValue = e.target.value;

    if (dropDownValue == "A-to-Z") {
        addData.innerHTML = "";
        let asort = inputValue.slice().sort();
        for (let word of asort) {
            let sort = `${data(word)}`;
            addData.insertAdjacentHTML("beforeend", sort);
        }
    }
    else if (dropDownValue == "Z-to-A") {
        addData.innerHTML = "";
        let zsort = inputValue.slice().sort();
        for (let word of zsort) {
            let sort = `${data(word)}`;
            addData.insertAdjacentHTML("afterbegin", sort);
        }
    }
    else if (dropDownValue == "Oldest") {
        addData.innerHTML = "";
        for (let word of inputValue) {
            let sort = `${data(word)}`;
            addData.insertAdjacentHTML("beforeend", sort);
        }
    }
    else if (dropDownValue == "Newest") {
        addData.innerHTML = "";
        for (let word of inputValue) {
            let sort = `${data(word)}`;
            addData.insertAdjacentHTML("afterbegin", sort);
        }
    }

});

// ============================================================
//  ========   Search   ==================================
searchbtn.addEventListener("click", function (e) {
    addFlag = false;
    searchFlag = true;

    activeCss(searchbtn);
    removeCss(addbtn);
    if (searchFlag) {
        console.log({ addFlag, searchFlag });
        inputText.focus();
        inputText.removeEventListener("keydown", addText);
        inputText.addEventListener("input", search);
    //         addData.innerHTML = "";
    //         let searchText = e.target.value;
    //        
    //     });
    }

});

function search(e){
    addData.innerHTML = "";
    let searchText = e.target.value;

    if(allBtnFlag){
        console.log({inputValue});
        for (let word of inputValue) {
            console.log(word);
            if (word.includes(searchText) && searchFlag) {
                let search = `${data(word)}`;
                addData.insertAdjacentHTML("afterbegin", search);
                setId(i);
                if (completedTask.includes(word)){
                     document.querySelector(`#check--${i}`).checked = true;
                }
                // document.querySelector(`#check--${i}`).addEventListener("change", btnChecked(`check--${i}`));
            }
        }
        if (addData.innerHTML == "") {
            addData.insertAdjacentHTML("afterbegin", "No Data Found");
        }
    }
    else if(activeBtnFlag){
        console.log({activeTask});
        for (let word of activeTask) {
            console.log(word);
            if (word.includes(searchText) && searchFlag) {
                let search = `${data(word)}`;
                addData.insertAdjacentHTML("afterbegin", search);
                setId(i);
                if (completedTask.includes(word)){
                     document.querySelector(`#check--${i}`).checked = true;
                }
                // document.querySelector(`#check--${i}`).addEventListener("change", btnChecked(`check--${i}`));
            }
        }
        if (addData.innerHTML == "") {
            addData.insertAdjacentHTML("afterbegin", "No Data Found");
        }
    }
    else if(completedBtnFlag){
        console.log({completedTask});
        for (let word of completedTask) {
            console.log(word);
            if (word.includes(searchText) && searchFlag) {
                let search = `${data(word)}`;
                addData.insertAdjacentHTML("afterbegin", search);
                setId(i);
                if (completedTask.includes(word)){
                     document.querySelector(`#check--${i}`).checked = true;
                }
                // document.querySelector(`#check--${i}`).addEventListener("change", btnChecked(`check--${i}`));
            }
        }
        if (addData.innerHTML == "") {
            addData.insertAdjacentHTML("afterbegin", "No Data Found");
        }
    }
    else{
        console.log({inputValue});
                for (let word of inputValue) {
                    console.log(word);
                    if (word.includes(searchText) && searchFlag) {
                        let search = `${data(word)}`;
                        addData.insertAdjacentHTML("afterbegin", search);
                        setId(i);
                        if (completedTask.includes(word)){
                            document.querySelector(`#check--${i}`).checked = true;
                        }
                        // document.querySelector(`#check--${i}`).addEventListener("change", btnChecked(`check--${i}`));
                    }
                }
                if (addData.innerHTML == "") {
                    addData.insertAdjacentHTML("afterbegin", "No Data Found");
                }
    }
}
// ============================================================
//  ========   Actions   ==================================

dropDownAction.addEventListener("click", function (e) {

    let dropDownValue = e.target.value;
    console.log(inputValue);
    if (dropDownValue == "Delete-Selected") {

        let elementId = document.querySelectorAll(`input[name="cb"]:checked`);
        console.log(elementId);
        for (let ele of elementId) {
            if (ele.checked) {
                console.log(ele.id);
                let index = ele.id.slice(-1);
                document.querySelector(`#main--${index}`).style.display = "none";
                let value = document.querySelector(`#newData--${index}`).textContent;
                inputValue = inputValue.filter(ele => ele != value);
                console.log(inputValue);
                completedTask = completedTask.filter(ele => ele != value);
                activeTask = activeTask.filter(ele => ele != value);
                // document.querySelector(`.action`).options[0].selected = true;

            }
        }
        e.preventDefault();
    }
    else if (dropDownValue == "SelectAll") {
        // let inputValueCopy = inputValue.slice();
        if(allBtnFlag || addFlag){console.log("selectifall"); selectall(inputValue);}
        else if(activeBtnFlag){ console.log("selectifactive"); selectall(activeTask);}
        function selectall(selectData){
            for (let word of selectData) {
                console.log(selectData);
                console.log(word);
                let elementIndex = findIndex(word);
                console.log(elementIndex);
                console.log(document.querySelector(`#check--${elementIndex}`));
                document.querySelector(`#check--${elementIndex}`).checked = true;
                document.querySelector(`#check--${elementIndex}`).addEventListener("change", btnChecked(`check--${elementIndex}`));
            }

        }
        e.preventDefault();
    }
    else if (dropDownValue == "UnselectAll") {
        // let inputValueCopy = inputValue.slice();
        if(allBtnFlag || addFlag){unselectall(inputValue);}
        else if(completedBtnFlag){unselectall(completedTask);}
        function unselectall(unselectData){
            for (let word of inputValue) {
                let elementIndex = findIndex(word);
                document.querySelector(`#check--${elementIndex}`).checked = false;
                document.querySelector(`#check--${elementIndex}`).addEventListener("change", btnChecked(`check--${elementIndex}`));
            }
        }
        e.preventDefault();
    }
});

// ============================================================
//  ========  ALL  ==================================
let allBtnFlag = false;
let activeBtnFlag = false;
let completedBtnFlag = false;

function displayDataAfterBtn(wordArray){
    addData.innerHTML = "";
    i = 0;
    console.log({wordArray});
    for (let word of wordArray) {
        console.log({word});
        let html = data(word);
        console.log({html});
        addData.insertAdjacentHTML("afterbegin", html);
        setId(i);
        if (completedTask.includes(word) && !activeBtnFlag)
                document.querySelector(`#check--${i}`).checked = true;
        i++;
    }
}

function btnChecked(id){
    // let elementId = document.querySelectorAll(`input[name="cb"]`);
    // console.log(elementId);
    // for (let ele of elementId) {

        // ele.addEventListener("change", function () {
            console.log("for");
            console.log(id);
            let ele = document.querySelector( `#${id}`);

            if (ele.checked) {
                let index = ele.id.slice(-1);
                // document.querySelector(`#main--${index}`).style.display = "none";
                let value = document.querySelector(`#newData--${index}`).textContent;

                if(allBtnFlag || addFlag || searchFlag){
                    completedTask.push(value);
                    console.log({ completedTask });
                    displayDataAfterBtn(inputValue);
                    // addData.innerHTML = "";
                    // i = 0;
                    // for (let word of inputValue) {
                    //     let html = data(word);
                    //     addData.insertAdjacentHTML("afterbegin", html);
                    //     setId(i);
                    //     if(completedTask.includes(word))
                    //             document.querySelector(`#check--${i}`).checked = true;
                    //     i++;
                    // }
                }
                else if(activeBtnFlag || searchFlag){
                    completedTask.push(value);
                    document.querySelector(`#main--${index}`).style.display = "none";
                    activeTask = inputValue.filter(ele => !completedTask.includes(ele));
                    console.log({ completedTask });
                    displayDataAfterBtn(activeTask);
                    // addData.innerHTML = "";
                    // i = 0;
                    // for (let word of activeTask) {
                    //     let html = data(word);
                    //     addData.insertAdjacentHTML("afterbegin", html);
                    //     setId(i);
                    //     i++;
                    // }
                }
                // else if(completedBtnFlag){
                // }
            }
            else{
                let index = ele.id.slice(-1);
                // document.querySelector(`#main--${index}`).style.display = "none";
                let value = document.querySelector(`#newData--${index}`).textContent;
                
                if(allBtnFlag || addFlag || searchFlag){
                    completedTask = completedTask.filter(ele => ele != value);
                    console.log({ completedTask });
                    displayDataAfterBtn(inputValue);
                    // addData.innerHTML = "";
                    // i = 0;
                    // for (let word of inputValue) {
                    //     let html = data(word);
                    //     addData.insertAdjacentHTML("afterbegin", html);
                    //     setId(i);
                    //     if(completedTask.includes(word))
                    //             document.querySelector(`#check--${i}`).checked = true;
                    //     i++;
                    // }
                }
                // else if(activeBtnFlag){

                // }
                else if(completedBtnFlag || searchFlag){
                    document.querySelector(`#main--${index}`).style.display = "none";
                    completedTask = completedTask.filter(ele => ele != value);
                    console.log({ completedTask });
                    displayDataAfterBtn(completedTask);
                    // addData.innerHTML = "";
                    // i = 0;
                    // for (let word of completedTask) {
                    //     let html = data(word);
                    //     addData.insertAdjacentHTML("afterbegin", html);
                    //     setId(i);
                    //     document.querySelector(`#check--${i}`).checked = true;
                    //     i++;
                    // }
                }
            }
        // });
    // }
    // if(allBtnFlag)
    //     btnChecked();
}
allbtn.addEventListener("click", function () {
    // inputText.removeEventListener("input", addText);

    allBtnFlag = true;
    addFlag = false;
    activeBtnFlag = false;
    completedBtnFlag = false;

    threebtn(allbtn, completedbtn, activebtn);
    displayDataAfterBtn(inputValue);
    inputText.addEventListener("input", search);
    // addData.innerHTML = "";
    // i = 0;
    // console.log({inputValue});
    // for (let word of inputValue) {
    //     console.log({word});
    //     let html = data(word);
    //     console.log({html});
    //     addData.insertAdjacentHTML("afterbegin", html);
    //     setId(i);
    //     if (completedTask.includes(word))
    //             document.querySelector(`#check--${i}`).checked = true;
    //     i++;
    // }
    // btnChecked();


});
function findIndex(word) {
    // for(let word of inputValue){
    let mainIndex;
    let spanAr = document.querySelectorAll(".newData");
    console.log({ spanAr });
    for (let span of spanAr) {
        let middle = span.id.slice(-1);
        console.log({ middle });
        let spanWord = document.querySelector(`#newData--${middle}`).textContent;
        console.log({ spanWord });
        if (word == spanWord) {
            mainIndex = middle;
            break;
        }
    }
    return mainIndex;
    // }
}
// let task = [];
// function displayData(wordArr){
//     // addData.innerHTML = "";
//     for(let word of wordArr){
//         let mainIndex;
//         // let spanAr = document.querySelectorAll(".newData");
//         console.log({spanAr});
//         for(let span of spanAr){
//             let middle = span.id.slice(-1);
//             console.log({middle});
//             let spanWord = document.querySelector(`#newData--${middle}`).textContent;
//             console.log({spanWord});
//             if(word == spanWord){
//                 mainIndex = middle;
//                 break;
//             }
//         }
//         console.log({mainIndex});
//         let allHTMLData = data(word);
//         setId(mainIndex);
//         addData.insertAdjacentHTML("afterbegin", allHTMLData);
//         // let allTask = document.querySelector(`#main--${mainIndex}`);
//         // // console.log(allTask);
//         // task.push(allTask);
//     }
//     // addData.innerHTML = "";
// }
activebtn.addEventListener("click", function () {
    // inputText.removeEventListener("input", addText);

    allBtnFlag = false;
    addFlag = false;
    activeBtnFlag = true;
    completedBtnFlag = false;

    threebtn(activebtn, completedbtn, allbtn);
    activeTask = inputValue.filter(ele => !completedTask.includes(ele));
    console.log({ activeTask });
    displayDataAfterBtn(activeTask);
    inputText.addEventListener("input", search);
    // addData.innerHTML = "";
    // i = 0;
    // for (let word of activeTask) {
    //     let html = data(word);
    //     addData.insertAdjacentHTML("afterbegin", html);
    //     setId(i);
    //     i++;
    // }
    // let elementId = document.querySelectorAll(`input[name="cb"]`);
    // for (let ele of elementId) {
    //     console.log("for");
    //     ele.addEventListener("change", function () {
    //         console.log("for");
    //         if (ele.checked) {
    //             let index = ele.id.slice(-1);
    //             document.querySelector(`#main--${index}`).style.display = "none";
    //             let value = document.querySelector(`#newData--${index}`).textContent;
    //             completedTask.push(value);
    //             activeTask = inputValue.filter(ele => !completedTask.includes(ele));
    //             console.log({ completedTask });
    //             addData.innerHTML = "";
    //             i = 0;
    //             for (let word of activeTask) {
    //                 let html = data(word);
    //                 addData.insertAdjacentHTML("afterbegin", html);
    //                 setId(i);
    //                 i++;
    //             }
    //         }
    //     });
    // }

});
completedbtn.addEventListener("click", function () {
    // inputText.removeEventListener("input", addText);

    allBtnFlag = false;
    addFlag = false;
    activeBtnFlag = false;
    completedBtnFlag = true;

    threebtn(completedbtn, allbtn, activebtn);
    displayDataAfterBtn(completedTask);
    inputText.addEventListener("input", search);
    // addData.innerHTML = "";
    // i = 0;
    // for (let word of completedTask) {
    //     let html = data(word);
    //     addData.insertAdjacentHTML("afterbegin", html);
    //     setId(i);
    //     document.querySelector(`#check--${i}`).checked = true;
    //     i++;
    // }
    // let elementId = document.querySelectorAll(`input[name="cb"]`);
    // for (let ele of elementId) {
    //     console.log("for");
    //     ele.addEventListener("change", function () {
    //         console.log("for");
    //         if (!ele.checked) {
    //             let index = ele.id.slice(-1);
    //             document.querySelector(`#main--${index}`).style.display = "none";
    //             let value = document.querySelector(`#newData--${index}`).textContent;
    //             completedTask = completedTask.filter(ele => ele != value);
    //             console.log({ completedTask });
    //             addData.innerHTML = "";
    //             i = 0;
    //             for (let word of completedTask) {
    //                 let html = data(word);
    //                 addData.insertAdjacentHTML("afterbegin", html);
    //                 setId(i);
    //                 document.querySelector(`#check--${i}`).checked = true;
    //                 i++;
    //             }
    //         }
    //     });
    // }

});

// let elementId = document.querySelector(`.check-${i}`).id;
// completedTask.push(document.querySelector(`#${elementId}`));
// document.querySelector(`#${elementId}`).style.display = "none";

function setId(i) {
    document.querySelector(".main").setAttribute("id", `main--${i}`);
    document.querySelector(`.check-${i}`).setAttribute("id", `check--${i}`);
    document.querySelector(".newData").setAttribute("id", `newData--${i}`);
    document.querySelector(".newDataInput").setAttribute("id", `newDataInput--${i}`);
    document.querySelector(".editText").setAttribute("id", `edit--${i}`);
    document.querySelector(".closeText").setAttribute("id", `close--${i}`);
    document.querySelector(".deleteText").setAttribute("id", `delete--${i}`);
}


function data(inputData) {
    let html = `<div class="main">
        <div class="inputList">   
        <div class="leftdata"> 
            <input type="checkbox" value=${inputData} class="check-${i}" name="cb" onchange = "btnChecked(id)">
            <span class="newData">${inputData}</span>
            <input type="text" class="newDataInput hidden" value="">
        </div>
        <div class="rightdata"> 
            <button class = "editText" onclick = "editfun(id)"><i class="fa-solid fa-pen-to-square"></i></button>
            <button class = "closeText hidden" onclick = "editfun(id)"><i class="fa-solid fa-square-xmark"></i></button>
            <button class = "deleteText" onclick = "deletefun(id)"><i class="fa-solid fa-delete-left"></i></button>
        </div>
    </div>
    <hr>
</div>`;
    return html;
}
function threebtn(first, second, three){
    activeCss(first);
    removeCss(second);
    removeCss(three);
}

function activeCss(className) {
    className.classList.remove("default");
    className.classList.add("active");
}

function removeCss(className) {
    className.classList.add("default");
    className.classList.remove("active");
}