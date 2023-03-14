import React from 'react'

export default function index() {
  const [Game,setGame] = {
    skins: ['black', 'red', 'white'],
    player_skin: ['black', 'red'],
    player_name: ['Player 1', 'Player 2'],
    audio: 'on',
    music: 'off',
    back_jump: 'on',
    bot: 'off',
    turn: 1,
    turn_element: document.querySelector("#game .nav .current"),
    selected_stone: [0, 0],
    selected_stone_type: 0,
    selected_stone_span: 0,
    possible_move: [],
    createStone: function (player, type = 'a') {
        let imgElement = document.createElement('img');
        imgElement.dataset.player = player;
        imgElement.dataset.type = type;
        imgElement.setAttribute("onclick", "firstStep(event)");
        imgElement.src = 'images/stone/' + Game.player_skin[player - 1] + '-' + type + '.png';
        return imgElement;
    }

}
const startGame = (stone_count = 12) => {
  let max = 12 / 4;
  for (let i = 1; i <= 8; i++) {
      for (let j = 1; j <= 8; j++) {
          let color;
          if (i % 2 == 1 & j % 2 == 0 || i % 2 == 0 & j % 2 == 1) { color = "primary" } else { color = "secondary " }
          document.querySelector('#game .board').innerHTML += ` <span class="${color}  for-1-${i}-${j} for-2-${9 - i}-${j}"   >  </span> `;
      }
  }


  if (stone_count == 8) max = 8 / 4;
  if (stone_count == 4) max = 4 / 4;

  for (let i = 1; i <= max; i++) {
      for (let j = 1; j <= 8; j++) {
          if (i % 2 == 1 & j % 2 == 0 || i % 2 == 0 & j % 2 == 1) {
              document.querySelector(`.game .for-1-${i}-${j}`).append(Game.createStone(1));
          }
      }
  }

  for (let i = 1; i <= max; i++) {
      for (let j = 1; j <= 8; j++) {
          if (i % 2 == 1 & j % 2 == 1 || i % 2 == 0 & j % 2 == 0) {
              document.querySelector(`.game .for-2-${i}-${j}`).append(Game.createStone(2));
          }
      }
  }

  GameMusic();

}



function firstStep(event) {
  let i, j, result_1, result_2;
  let player = event.target.dataset.player;
  if (Game.turn != player) return false;

  if (Game.selected_stone[0] != 0) {
      Game.selected_stone_span.classList.remove('active');
      Game.possible_move.forEach((item) => { document.querySelector(item).classList.remove('green'); document.querySelector(item).setAttribute("onclick", "") })
  }

  i = parseInt(event.target.parentElement.classList[player].slice(6, 7));
  j = parseInt(event.target.parentElement.classList[player].slice(8));
  Game.selected_stone = [i, j];
  Game.selected_stone_span = document.querySelector(`.game .for-${Game.turn}-${Game.selected_stone[0]}-${Game.selected_stone[1]}`);
  Game.selected_stone_span.classList.add('active');
  Game.selected_stone_type = event.target.dataset.type;
  Game.selected_stone_type == 'a' ? stoneA() : stoneB();
}


function checkSlotStatus(i, j) {
  let item = document.querySelector(`.for-${Game.turn}-${i}-${j}`) || false;
  if (item === false) {
      return false;
  }

  if (item.childElementCount == 0) {
      return 'empty';
  } else if (item.children[0].dataset.player == Game.turn) {
      return 'same';
  }
  else {
      return 'opponent';
  }


}



  return (
    <div className="container">
      <div className="settings-wrapper">
        <div id="settings">
          <div className="head">
            <h3 className="title"> Checkers </h3>
            <span className="close" onClick="closeSetting()"> &times; </span>
          </div>
          <div className="body">
            <div className="skins">
              <div className="player-1">
                <h3 className="title"> Player 1 </h3>
                <img data-skin="black" className="active-skin" onClick="changeSkin(this,1)" src="images/stone/black-a.png" alt="" srcSet=""> </img>
                <img data-skin="red" onClick="changeSkin(this,1)" src="images/stone/red-a.png" />
                  <img data-skin="white" onClick="changeSkin(this,1)" src="images/stone/white-a.png" />
                  </div>
                  <img className="exchange" src="images/exchange.png" onClick="exchangeSkin()" alt="exchange" />
                  <div className="player-2">
                    <h3 className="title"> Player 2 </h3>
                    <img data-skin="black" onClick="changeSkin(this,2)" src="images/stone/black-a.png" alt="" srcSet=""/>
                    <img data-skin="red" className="active-skin" onClick="changeSkin(this,2)" src="images/stone/red-a.png" />
                      <img data-skin="white" onClick="changeSkin(this,2)" src="images/stone/white-a.png" />
                      </div>
                  </div>

                  <div className="music">
                    <span> Music </span> <img onClick="toggleMusic()" className="toggle-music" src="images/audio-off.png" alt=""/>
                      <div className="group">
                        <span className="bar"> </span>
                        <span className="pointer" ondrag="changeVolume(event)" ondragover="changeVolume(event)"> </span>
                      </div>
                  </div>


                  <div className="sound">
                    <span> Sound </span> <img onClick="toggleSound()" className="toggle-sound" src="images/audio-on.png" alt=""/>
                  </div>

                  <div className="back-jump">
                    <span> Back Jump</span>
                    <span className="group" onClick="checkBackJump(this)" > <i className="pointer back-jump-1"></i>  </span>

                    </div>

                      <div className="first-move">
                        <h4 className="text-center"> First Move </h4>
                        <div className="group">
                          <img onClick="changeFirstMover(this)" className="left-arrow" src="images/icons/arrow-left.png" alt="" srcSet="" />
                            <span className="current">Player 1</span>
                            <img onClick="changeFirstMover(this)" className="right-arrow" src="images/icons/arrow-right.png" alt="" srcSet="" />
                            </div>

                        </div>
                        <div className="bot">
                          <h4 className="text-center"> Bot</h4>
                          <div className="group">
                            <img className="left-arrow" src="images/icons/arrow-left.png" onClick="changeBotStatus('l') " src="" alt="" />
                              <span className="current" > Off </span>
                              <img className="right-arrow" src="images/icons/arrow-right.png" onClick="changeBotStatus('r') " alt="" />
                              </div>
                          </div>
                          <div className="actions">
                            <button onClick="playNewGame()"> Start new game </button>
                            <button onClick="loadNewGame()"> Load game </button>
                            <button onClick="playNewGame(8)"> Start with 8 stones (Exclusive) </button>
                            <button onClick="playNewGame(4)"> Start with 4 stones (Exclusive) </button>
                          </div>

                        </div>
                      </div>
                  </div>

                  <div className="game" id="game">
                    <div className="nav">
                      <img className="homeImg" src="images/home.png" alt="" srcSet="" />
                        <span className="current"> Current </span>
                        <img className="settingImg" src="images/settings.png" alt="" onClick="openSettings()" />

                        </div>
                        <div className="board">

                        </div>
                        <div className="footer">

                        </div>
                    </div>
                  </div>
                  )
}
