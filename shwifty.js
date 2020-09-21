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
        console.log(numbers);
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
        for (var j = i+1;j< arr.length;j++ ){
            if(arr[j] > arr[i]){
                counter++;
            }
        }
    }
    return counter;
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
