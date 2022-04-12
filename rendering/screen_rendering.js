function screenRendering(document, game_struct, requestAnimationFrame){
    
    const context = document.getElementById('game_screen').getContext('2d');

    context.clearRect(0, 0, 20, 20);

    Object.keys(game_struct.obstacles).map((id)=>{
        context.fillStyle = 'gray';
        context.fillRect(game_struct.obstacles[id].x, game_struct.obstacles[id].y, 1, 1)
    });


    Object.keys(game_struct.food).map((id)=>{
        context.fillStyle = 'green';
        context.fillRect(game_struct.food[id].x, game_struct.food[id].y, 1, 1)
    });


    context.fillStyle = '#000';
    context.fillRect(game_struct.player.x, game_struct.player.y, 1, 1);
    document.getElementById(game_struct.score);

    
    requestAnimationFrame(() => {
        screenRendering(document, game_struct, requestAnimationFrame);
        renderScore(document, game_struct.score)
    });
}

function renderScore(document, score){
    const scoreElement = document.getElementById('score');
    scoreElement.innerHTML = score;
}
