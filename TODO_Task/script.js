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

// ============================================================
//  ========== Add Button  ==================================
addbtn.addEventListener("click", function (e) {
    addFlag = true;
    searchFlag = false;

    activeCss(addbtn);

    inputText.classList.remove("hidden");
    inputText.focus();

    inputText.addEventListener("keydown", function (eve) {

        let html = data(`${inputText.value}`);
        // console.log({ addFlag, searchFlag });
        if (eve.key == "Enter" && addFlag && !searchFlag) {
            addData.insertAdjacentHTML("afterbegin", html);

            editBtn = document.querySelector(".fa-pen-to-square");
            deleteBtn = document.querySelector(".fa-delete-left");
            setId(i);

            // editBtn.classList.add(`edit-${i}`);
            // document.querySelector(".newData").classList.add(`edit-${i}`);

            inputValue.push(`${inputText.value}`);
            inputText.value = "";

            // =====================================ALL =========
            // elementId = document.querySelectorAll(`input[name="cb"]`);
            // console.log({ elementId });
            // for (let ele of elementId) {
            //     console.log({ ele });
            //     ele.addEventListener("change", function () {
            //         console.log({ ele });
            //         if (ele.checked) {
            //             console.log(ele.id);
            //             let index = ele.id.slice(-1);
            //             console.log({ index });
            //             document.querySelector(`#main--${index}`).style.display = "none";
            //             let value = document.querySelector(`#newData--${index}`).textContent;
            //             console.log({ value });
            //             completedTask.push(value);
            //             console.log({ completedTask });
            //             activeTask = activeTask.filter(ele => ele != value);
            //             console.log({ activeTask });
            //             ele.checked = true;
            //         }
            //     });
            // }
        }
        i++;
        // document.addEventListener("click", function(e){
        // for(let j=0; j<=i; j++){
        //         let iconClass = [e.target.className.split(" ")]
        //         document.querySelector(`.${iconClass[0][iconClass[0].length-1]}`).classList.add("hidden");
        //     }
        // });
        //  document.querySelector(".newData").classList.add("hidden");
    });
  
    // e.target.closest(".fa-pen-to-square");
    // editBtn.addEventListener("click", function(e){
    //     document.querySelector(".newData").classList.add("hidden");

    // });
});


// ============================================================
//  ========   Sort DropDown   ==================================
dropDownSort.addEventListener("click", function (e) {
    let dropDownValue = e.target.value;

    if (dropDownValue == "A-to-Z") {
        addData.innerHTML = "";
        inputValue.slice().sort();
        for (let word of inputValue) {
            let sort = `${data(word)}`;
            addData.insertAdjacentHTML("beforeend", sort);
        }
    }
    else if (dropDownValue == "Z-to-A") {
        addData.innerHTML = "";
        inputValue.slice().sort();
        for (let word of inputValue) {
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
    inputText.focus();
    inputText.addEventListener("input", function (e) {
        addData.innerHTML = "";
        let searchText = e.target.value;
        for (let word of inputValue) {
            if (word.includes(searchText) && searchFlag && !addFlag) {
                let search = `${data(word)}`;
                addData.insertAdjacentHTML("afterbegin", search);
            }
        }
        if (addData.innerHTML == "") {
            addData.insertAdjacentHTML("afterbegin", "No Data Found");
        }
    });

});


// ============================================================
//  ========   Actions   ==================================

dropDownAction.addEventListener("click", function (e) {
    let indexArray = [];

    let dropDownValue = e.target.value;
    console.log(inputValue);
    if (dropDownValue == "Delete-Selected") {
        indexArray = [];

        let elementId = document.querySelectorAll(`input[name="cb"]:checked`);
        console.log(elementId);
        for (let ele of elementId) {
            console.log(ele.id);
            let index = ele.id.slice(-1);
            document.querySelector(`#main--${index}`).style.display = "none";
            let value = document.querySelector(`#newData--${index}`).textContent;
            inputValue = inputValue.filter(ele => ele != value);
        }
    }
    else if (dropDownValue == "SelectAll") {
        // let inputValueCopy = inputValue.slice();
        for (let word of inputValue) {
            let elementIndex = inputValue.indexOf(word);
            document.querySelector(`.check-${elementIndex}`).checked = true;
        }
    }
    else if (dropDownValue == "UnselectAll") {
        // let inputValueCopy = inputValue.slice();
        for (let word of inputValue) {
            let elementIndex = inputValue.indexOf(word);
            document.querySelector(`.check-${elementIndex}`).checked = false;
        }
    }
    for (let i of indexArray) {
        inputValue.splice(i, 1);
        console.log(inputValue);
    }

});

// ============================================================
//  ========  ALL  ==================================
allbtn.addEventListener("click", function () {

    addData.innerHTML = "";
    for (let word of inputValue) {
        let html = data(word);
        addData.insertAdjacentHTML("afterbegin", html);
    }
    elementId = document.querySelectorAll(`input[name="cb"]`)
    for (let ele of elementId) {
        console.log({elementId});
        console.log({ele});
        ele.addEventListener("change", function () {
            console.log("{ele}");
            if (ele.checked) {
                console.log(ele.id);
                let index = ele.id.slice(-1);
                console.log({index});
                document.querySelector(`#main--${index}`).style.display = "none";
                let value = document.querySelector(`#newData--${index}`).textContent;
                console.log({value});
                completedTask.push(value);
                console.log({completedTask});
                activeTask = activeTask.filter(ele => ele != value);
                console.log({activeTask});
                
            }
        });
    }
});

activebtn.addEventListener("click", function () {
    
    addData.innerHTML = "";
    for (let word of activeTask) {
        let html = data(word);
        addData.insertAdjacentHTML("afterbegin", html);
    }
});
completedbtn.addEventListener("click", function () {
    
    addData.innerHTML = "";
    for (let word of completedTask) {
        let html = data(word);
        addData.insertAdjacentHTML("afterbegin", html);
    }
});

// let elementId = document.querySelector(`.check-${i}`).id;
// completedTask.push(document.querySelector(`#${elementId}`));
// document.querySelector(`#${elementId}`).style.display = "none";

function isCheckBoxChecked() {
    let inputValueCopy = inputValue.slice();
    for (let [i, word] of inputValueCopy.entries()) {
        let element1 = document.querySelector(`.check-${i}`);
        console.log({ element1 });
        if (element1.checked) {
            return element1;
        }
        else
            return false;
    }
}

function setId(i) {
    alert("hjxcb");
    document.querySelector(".main").setAttribute("id", `main--${i}`);
    document.querySelector(`.check-${i}`).setAttribute("id", `check--${i}`);
    document.querySelector(".newData").setAttribute("id", `newData--${i}`);
    editBtn.setAttribute("id", `editbtn--${i}`);
    deleteBtn.setAttribute("id", `deletebtn--${i}`);
}


function data(inputData) {
    let html = `<div class="main">
        <div class="inputList">   
        <div class="leftdata"> 
            <input type="checkbox" value=${inputData} class="check-${i}" name="cb">
            <span class="newData">${inputData}</span>
        </div>
        <div class="rightdata"> 
            <i class="fa-solid fa-pen-to-square"></i>
            <i class="fa-solid fa-delete-left"></i>
        </div>
    </div>
    <hr>
</div>`;
    return html;
}


function activeCss(className) {
    className.classList.remove("default");
    className.classList.add("active");
}

function removeActiveCss(className) {
    className.classList.add("default");
    className.classList.remove("active");
}