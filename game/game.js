function game(){
    const struct = {
        player:{
            x: 0,
            y: 0
        },
        score: 0,
        cheater : false,
        food: {},
        obstacles: {},
        screen: {
            width: 20,
            height: 20,
            grid: [],
        }
    }

    function startGame(){
        for(let i=0; i< struct.screen.width; i++){
            let aux = [];
            for(let j=0; j< struct.screen.height; j++)
                aux.push(0);
            struct.screen.grid.push(aux);
        }

        setInterval(addFood, 200);
        setInterval(addObstacles, 300);
        //setInterval(removeObstacles, 3500);
    }

    function addFood(){
        const x = Math.floor(Math.random() * struct.screen.width),
        y = Math.floor(Math.random() * struct.screen.height);

        if(struct.screen.grid[x][y] === 0){
            struct.screen.grid[x][y] = 1;
            struct.food[Math.random() * 10000000] = {
                x: x,
                y: y
            }
    
        }

    }

    function removeFood(id, x, y){
        delete struct.food[id];
        struct.screen.grid[x][y] = 0;
    }

    function addObstacles(){
        const x = Math.floor(Math.random() * (struct.player.x+5 - struct.player.x))+struct.player.x,
        y = Math.floor(Math.random() * (struct.player.y+5 - struct.player.y))+struct.player.y;

        if(struct.screen.grid[x][y] === 0){
            struct.screen.grid[x][y] = 1;
            struct.obstacles[Math.random() * 10000000] = {
                x: x,
                y: y
            }
    
        }
    }

    /*function removeObstacles(x, y){

    }*/

    function checkFoodCollision(){
        Object.keys(struct.food).map((id)=>{
            if(struct.player.x === struct.food[id].x && struct.player.y === struct.food[id].y){
                removeFood(id, struct.food[id].x, struct.food[id].y);
                struct.score++;
            }
                
        });
    }

    function checkObstacleCollision(){
        Object.keys(struct.obstacles).map((id)=>{
            if(struct.player.x === struct.obstacles[id].x && struct.player.y === struct.obstacles[id].y){
                struct.score = 0;
                struct.player.x = 0;
                struct.player.y = 0;
                struct.food = {};
                struct.obstacles = {};
            }
                
        });
    }

    function movePiece(key){

        const speed = 1,
        moves = {
            ArrowUp(){
                if(struct.player.y -1 >= 0){
                    struct.player.y-=speed;
                }
            },
            ArrowRight(){
                if(struct.player.x + 1< struct.screen.width ){
                    struct.player.x+=speed;
                }
            },
        
            ArrowLeft(){
                if(struct.player.x -1 >= 0)
                    struct.player.x-=speed;
            },

            ArrowDown(){
                if(struct.player.y + 1 < struct.screen.height)
                    struct.player.y+=speed;
            },
            c(){
                struct.cheater = !struct.cheater;
            },

            Control(){
                const key_arr = Object.keys(struct.food);
                if(struct.cheater && key_arr.length > 0){
                    
                    struct.player.x = struct.food[key_arr[0]].x;
                    struct.player.y = struct.food[key_arr[0]].y;
                }
            }

        };

        if(moves[key]){
            moves[key]();
            checkFoodCollision();
            checkObstacleCollision();
        }
            

    }

    return {struct, movePiece, startGame};
}
