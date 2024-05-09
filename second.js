import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"


const appSettings = {
    databaseURL:  "https://realtime-database-904b0-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")

const shoppingListEl = document.getElementById("shopping-list")
const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")

addButtonEl.ondblclick = function(){
    let inputValue = inputFieldEl.value 

    push(shoppingListInDB, inputValue)

    clearInputFieldEl()
}


onValue(shoppingListInDB, function(snapshot){

    if(snapshot.exists()){
        let listArr = Object.entries(snapshot.val())

        clearShoppingListEl()
    
        for( let i = 0; i < listArr.length; i++){
    
            let currentItem = listArr[i]
    
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]
    
           appendToShoppingListEl(currentItem)
        }
    }else{
        shoppingListEl.innerHTML = "No items here.... yet"
    }
  
    
})

function clearShoppingListEl(){
    shoppingListEl.innerHTML = ""
}

function clearInputFieldEl(){
    inputFieldEl.value = ""
}

function appendToShoppingListEl(item){
    let itemID = item[0]
    let itemValue = item[1]
    let newEl = document.createElement("li")

    newEl.textContent = itemValue

    newEl.onclick = function(){


        let exactLocationInDB = ref(database, `shoppingList/${itemID}`)

        remove(exactLocationInDB)
    }

    shoppingListEl.append(newEl)
}

