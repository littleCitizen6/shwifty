function random(min, max){
    let randomNum = Math.random() * (max - min) + min;
    return Math.round(randomNum);
}
function randerNumbers(colNum){
    var arr = [];
    var numbers = [];
    for (var i = 0;i< colNum**2;i++ ){
        numbers.push(i + 1);
    }
    for (var j = numbers.length - 1; j>-1; j--){
        var index = random(0,j);
        // console.log(index +" => " + numbers[index]);
        if(numbers[index] == colNum**2){
           arr.push("");
        }
        else{
            arr.push(numbers[index]);
        }
        numbers.splice(index, 1);
    }
    return arr;
}

function getSolvableForOdds(colNum){
    do {
        var arr = randerNumbers(colNum);
    } while (oppositeCount(arr)%2 !=0)
    return arr;
}

function oppositeCount(arr){
    var counter = 0;
    for (var i = 0;i< arr.length;i++ ){
        for (var j = i;j< arr.length;j++ ){
            if(arr[j] < arr[i] && arr[i] != "" && arr[j] != ""){
                counter++;
                // console.log(counter + "          " + i + " => " +arr[i] + " , " + j +" => " + arr[j])
            }
        }
    }
    return counter;
}

function isValid(arr, index){
    if (arr[index] == index +1 || (arr[index] == "" && index == arr.length - 1)){
        return true;
    }
    return false;
}


function randerRow(colNum, numbers) {
    var row = document.createElement("div")
    row.className = "row";
    for (var i = 0 ; i<colNum; i++){
        var box = document.createElement("div");
        box.className = "col-md-3 box";
        var span = document.createElement("span");
        span.innerText = numbers[0];
        numbers.splice(0,1);
        box.appendChild(span);
        row.appendChild(box);
    }
    return row;
}

function randerBoard(colNum){
    var numbers = getSolvableForOdds(colNum);
    var board = document.getElementsByClassName("board")[0];
    for (var i =0; i<colNum; i++){
        board.appendChild(randerRow(colNum, numbers));
    }
}
function toArray(array2d){
    var arr = [];
    for(var i = 0; i < array2d.length; i++)
    {
        arr = arr.concat(array2d[i]);
    }
    return arr;
}
function getBoxes(){
    var boxes = [];
    rows = document.getElementsByClassName("row");
    for (var i =0 ; i<rows.length; i++){
        var arr = [];
        for (var j=0 ;j<rows[i].childNodes.length; j++){
            arr.push(rows[i].childNodes[j]);
        }
        boxes.push(arr);
    }
    return boxes;
}
function getBoardState(){
    var boxes = getBoxes();
    var boardState = [];
    for (var i =0 ; i<boxes.length; i++){
        var arr = [];
        for (var j=0 ;j<boxes[i].length; j++){
            arr.push(boxes[i][j].firstChild.textContent);
        }
        boardState.push(arr);
    }
    return boardState;
}

function updateBoardState(arr2d){
    rows = document.getElementsByClassName("row");
    for (var i =0 ; i<rows.length; i++){
        for (var j=0 ;j<rows[i].childNodes.length; j++){
            rows[i].childNodes[j].firstChild.textContent = arr2d[i][j];
        }
    }
}

function updateBoardStateBoxes(boxes){
    rows = document.getElementsByClassName("row");
    for (var i =0 ; i<rows.length; i++){
        for (var j=0 ;j<rows[i].childNodes.length; j++){
            rows[i].childNodes[j].replaceWith(boxes[i*rows[i].childNodes.length + j]);
        }
    }
}

function SwitchWithEmpty(box, boxes){
    var oldEmpty = boxes.filter(box => box.firstChild.textContent == "")[0];
    var temp = box;
    boxes[boxes.indexOf(box)] = oldEmpty;
    boxes[boxes.indexOf(oldEmpty)]= temp;
    updateBoardStateBoxes(boxes);
}