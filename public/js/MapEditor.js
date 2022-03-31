window.onload = () => {
    const canvas = document.getElementById('canvas')
    const canvasHeight = canvas.height
    const canvasWidth = canvas.width
    const ctx = canvas.getContext('2d')
    let mapWidth = parseInt(document.querySelector('#mapWidth').textContent)
    let mapHeight = parseInt(document.querySelector('#mapHeight').textContent)
    let map = []
    const cellWidth = canvasWidth / mapWidth
    const cellHeight = canvasHeight / mapHeight
    let activeButton = 1
    let isClicking = 0

    for(let i = 0; i < mapHeight; i++){
        map[i]=[]
        for(let j = 0; j < mapWidth ; j++){
            map[i][j]=wallValue
        }
    }

    document.getElementById('canvas').addEventListener("mousemove",(event) =>{
        if(isClicking){
            map[Math.floor(event.offsetY/cellHeight)][Math.floor(event.offsetX/cellWidth)]=activeButton
            drawMap()
        }
    })

    document.getElementById('canvas').addEventListener("mousedown", function (event) {
        isClicking = true;
    })

    document.getElementById('canvas').addEventListener("mouseup", function (event) {
        isClicking = false;
    })

    document.getElementById('wall').addEventListener("click", ()=>{
        activeButton = wallValue
    })

    document.getElementById('floor').addEventListener("click", ()=>{
        activeButton = floorValue
    })

    document.getElementById('start').addEventListener("click", ()=>{
        activeButton = startValue
    })

    document.getElementById('end').addEventListener("click", ()=>{
        activeButton = endValue
    })

    document.getElementById('save').addEventListener("click", async ()=>{
        if(checkMap()){
            try {
                const mapToSend = {cells:map,current:true,recordRate:100,isPublic:false}
                console.log(mapToSend)
                await gameAPI.sendMap({ mapToSend })
            } catch (error) {
                console.log({ error })
            }
        }else{
            alert("You are only allowed to have ONE end zone and you need at least ONE start zone")
        }
    })

    function checkMap(){
        let endCompteur = 0
        let startCompteur = 0
        for(let i = 0; i < mapHeight; i++){
            for(let j = 0; j < mapWidth ; j++){
                if(map[i][j] === endValue) endCompteur++
                if(map[i][j] === startValue) startCompteur++
            }
        }
        return endCompteur === 1 && startCompteur > 0
    }

    function drawMap(){
        for(let i = 0; i < mapHeight; i++){
            for(let j = 0; j < mapWidth ; j++){
                drawCell(j,i,map[i][j])
            }
        }
    }

    function drawCell(x,y,type){
        switch(type){
            case 1 : 
                ctx.fillStyle = colors.floor
                break;
            case 0 :
                ctx.fillStyle = colors.wall
                break;
            case 10 :
                ctx.fillStyle = colors.start
                break;
            case 11 :
                ctx.fillStyle = colors.end
                break;
        }
  
        ctx.fillRect(x*cellWidth, y*cellHeight, cellWidth, cellHeight)
    }

    drawMap()

}