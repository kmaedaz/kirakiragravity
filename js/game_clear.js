/**
 重力ゲーム設定ファイル
**/


// Class TEST
var game_test=new GameConfig();

	for(  var  i= 0 ; i<  G_STAGE_CLEAR_CON.length ;i++){

		for(  var  h= 0 ; h<  G_STAGE_CLEAR_CON[i].length ;h++){
			 var val = G_STAGE_CLEAR_CON[i][h] ;
			 game_test.setStatusTime(val,1);
			 game_test.setStatusJump(val,1);
			 game_test.setStatusRotate(val,1);
		}

	}

game_test.setStage(7);
game_test.setLevel(8);

location.href = "index.html";


