// function to read json
function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}

// Create Dino Constructor
const construct_Dino = (index,dino) => {
    return{
        species: dino.Dinos[index].species,
        weight: dino.Dinos[index].weight,
        height: dino.Dinos[index].height,
        diet: dino.Dinos[index].diet,
        where: dino.Dinos[index].where,
        when: dino.Dinos[index].when,
        fact: dino.Dinos[index].fact
    }
}

const construct_human = () => {
    return (() => {
            const feet = document.querySelector('#feet').value
            let inches = document.querySelector('#inches').value
            const name = document.querySelector('#name').value
            const weight = document.querySelector('#weight').value
            const diet = document.querySelector('#diet').value
            return {
                name:name,
                height:inches,
                weight:weight,
                diet:diet,
            }
        })()
    
}

// Create tile list
const construct_tile_list = (dino) => {
    tile_list = []
    let s=true
    for (let i=0; i<8; i+=1){
            tile_list[i]=construct_Dino(i,dino)
    }
    tile_list.sort(function(){return Math.random()-0.5;})
    tile_list.splice(4,0,construct_human())
    return tile_list
}


// Use IIFE to get human data from form


// Create Dino Compare Method 1
// NOTE: Weight in JSON file is in lbs, height in inches. 
const compare_weight = (human,dinasour) => {
    return dinasour.species+' is '+(dinasour.weight - human.weight)+' lbs heavier than you!'
}

// Create Dino Compare Method 2
// NOTE: Weight in JSON file is in lbs, height in inches.
const compare_height = (human,dinasour) => {
    return dinasour.species+' is '+(dinasour.height - human.height)+' inches taller than you! '
}

// Create Dino Compare Method 3
// NOTE: Weight in JSON file is in lbs, height in inches.
const compare_diet = (human,dinasour) => {
    if(human.diet===dinasour.diet)
    {
        return 'You are having the same diet that '+dinasour.species+' has.'
    }
    else{
        return 'You eat '+human.diet+' , '+dinasour.species+' eats '+dinasour.diet+' .'
    }
}

// Generate Tiles for each Dino in Array
const generate_dinosaur_tile = (dinosaur,str_array) => {
    let tile = document.createElement('div')
    tile.setAttribute('class','grid-item')
    tile.innerHTML = '<h3>'+dinosaur.species+'</h3>'+
                      '<img src="./images/'+dinosaur.species+'.png" alt="dinosaurs image">'+
                      '<p>'+
                       dinosaur.fact+'<br>'+
                      '</p>'
    const grid = document.querySelector('#grid')
    grid.appendChild(tile)
}

// 'Comparison:   '+str_array[0]+'<br>'+str_array[1]+'<br>'+str_array[2]+'<br>'+

const generate_human_tile = (human) => {
    let tile = document.createElement('div')
    tile.setAttribute('class','grid-item')
    tile.innerHTML = '<h3>'+human.name+'</h3>'+
                      '<img src="./images/human.png" alt="human image">'+
                      '<p>'+
                       'height:'+human.height+'<br>'+'weight:'+human.weight+'<br>'+'diet :'+human.diet+'<br>'+
                      '</p>'
    const grid = document.querySelector('#grid')
    grid.appendChild(tile)
}


// Add tiles to DOM
const add_tiles = (tile_list) => {
    const grid = document.querySelector('#grid')
    for (let i=0;i<9;i+=1)
    {
        if(i!=4)
        {
            let weight_str = compare_weight(tile_list[4],tile_list[i])
            let height_str = compare_height(tile_list[4],tile_list[i])
            let diet_str = compare_diet(tile_list[4],tile_list[i])
            let weight_height_diet = [weight_str,height_str,diet_str]
            generate_dinosaur_tile(tile_list[i],weight_height_diet)
        }
        else
        {
            generate_human_tile(tile_list[4])
        }
    }
    
}

// Remove form from screen
const remove_form = async (event) => {
    let dino
    readTextFile("dino.json", function (text) {
        const data = JSON.parse(text);
        dino = data;
        let form=document.querySelector('#dino-compare')
        let tile_list = construct_tile_list(dino)
        add_tiles(tile_list)
        form.remove()
    })
    
}

// On button click, prepare and display infographic
