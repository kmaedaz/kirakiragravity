/**
 重力ゲーム設定ファイル
**/
		
	if ('object' === typeof window.onorientationchange) {
	  window.addEventListener("orientationchange", function () {
		//　
	  	setTimeout(function(){
	    if (window.innerHeight > window.innerWidth) {
	      // ポートレイト
			 obj=document.getElementById("rotate_alart");
			 obj.style.display = "none";
			 obj=document.getElementById("enchant-stage");
			 obj.style.display = "block";
	    } else {
	      // ランドスケープ
			 obj=document.getElementById("rotate_alart");
			 obj.style.display = "block";
			 //document.getElementById("rotate_alert_text").textContent ="画面の縦横の機能をOFFにして下さい";
			 obj.style.display = "block";
			 obj=document.getElementById("enchant-stage");
			 obj.style.display = "none";
	    };
		},500);
	  }, false);
	}


	//　グローバル変数
	// 各ステージ 設定
	var G_SCRIPT_EXT_NAME =".html";	//スクリプト拡張子
	var G_GAME_CLEAR_CON ={	 //script	   ※　ジャンプ・回転・タイムの目標数字の設定
							"index":{"STAGE":0,"LEVEL":0, "KEY":"free_game0","JUMP":10,"TIME":30,"ROTATE":8,"NEXT_URL":"free_game1"},
							"free_game0":{"STAGE":0,"LEVEL":0, "KEY":"free_game0","JUMP":0,"TIME":1,"ROTATE":0,"NEXT_URL":"free_game1",hint:"タップしてスタート"},
							"free_game1":{"STAGE":0,"LEVEL":1, "KEY":"free_game1","JUMP":0,"TIME":2,"ROTATE":0,"NEXT_URL":"free_game2",hint:"傾けてスライドさせる"},
							"free_game2":{"STAGE":0,"LEVEL":2, "KEY":"free_game2","JUMP":0,"TIME":5,"ROTATE":0,"NEXT_URL":"free_game3",hint:"回転させる"},
							"free_game3":{"STAGE":0,"LEVEL":3, "KEY":"free_game3","JUMP":0,"TIME":5,"ROTATE":1,"NEXT_URL":"free_game4",hint:"回転させる"},
							"free_game4":{"STAGE":0,"LEVEL":4, "KEY":"free_game4","JUMP":2,"TIME":5,"ROTATE":0,"NEXT_URL":"free_game5",hint:"タップしてジャンプする"},
							"free_game5":{"STAGE":0,"LEVEL":5, "KEY":"free_game5","JUMP":2,"TIME":12,"ROTATE":0,"NEXT_URL":"free_game6",hint:"回転させてジャンプする"},
							"free_game6":{"STAGE":0,"LEVEL":6, "KEY":"free_game6","JUMP":6,"TIME":10,"ROTATE":2,"NEXT_URL":"free_game7",hint:"回転させてジャンプする"},
							"free_game7":{"STAGE":0,"LEVEL":7, "KEY":"free_game7","JUMP":0,"TIME":7,"ROTATE":0,"NEXT_URL":"free_game8"},
							"free_game8":{"STAGE":0,"LEVEL":8, "KEY":"free_game8","JUMP":1,"TIME":10,"ROTATE":0,"NEXT_URL":"free_game9"},
							"free_game9":{"STAGE":0,"LEVEL":9, "KEY":"free_game9","JUMP":0,"TIME":8,"ROTATE":2,"NEXT_URL":"free_game10"},
							"free_game10":{"STAGE":0,"LEVEL":10, "KEY":"free_game10","JUMP":8,"TIME":20,"ROTATE":5,"NEXT_URL":"free_game11"},
							"free_game11":{"STAGE":0,"LEVEL":11, "KEY":"free_game11","JUMP":0,"TIME":20,"ROTATE":0,"NEXT_URL":"free_game12"},
							"free_game12":{"STAGE":0,"LEVEL":12, "KEY":"free_game12","JUMP":2,"TIME":10,"ROTATE":0,"NEXT_URL":"free_game13","last":true},
							"free_game13":{"STAGE":0,"LEVEL":13, "KEY":"free_game13","JUMP":3,"TIME":10,"ROTATE":1,"NEXT_URL":"free_game14"},
							"free_game14":{"STAGE":0,"LEVEL":14, "KEY":"free_game14","JUMP":2,"TIME":8,"ROTATE":0,"NEXT_URL":"free_game15"},
							"free_game15":{"STAGE":0,"LEVEL":15, "KEY":"free_game15","JUMP":4,"TIME":12,"ROTATE":0,"NEXT_URL":"helinum_game0","last":true},

							"helinum_game0":{"STAGE":1,"LEVEL":0, "KEY":"helinum_game0","JUMP":0,"TIME":5,"ROTATE":0,"NEXT_URL":"helinum_game1"},
							"helinum_game1":{"STAGE":1,"LEVEL":1, "KEY":"helinum_game1","JUMP":4,"TIME":5,"ROTATE":0,"NEXT_URL":"helinum_game2"},
							"helinum_game2":{"STAGE":1,"LEVEL":2, "KEY":"helinum_game2","JUMP":2,"TIME":5,"ROTATE":0,"NEXT_URL":"helinum_game3"},
							"helinum_game3":{"STAGE":1,"LEVEL":3, "KEY":"helinum_game3","JUMP":0,"TIME":8,"ROTATE":0,"NEXT_URL":"helinum_game4"},
							"helinum_game4":{"STAGE":1,"LEVEL":4, "KEY":"helinum_game4","JUMP":4,"TIME":16,"ROTATE":1,"NEXT_URL":"helinum_game5"},
							"helinum_game5":{"STAGE":1,"LEVEL":5, "KEY":"helinum_game5","JUMP":2,"TIME":3,"ROTATE":0,"NEXT_URL":"helinum_game6","last":true},
							"helinum_game6":{"STAGE":1,"LEVEL":6, "KEY":"helinum_game6","JUMP":0,"TIME":1,"ROTATE":0,"NEXT_URL":"helinum_game7"},
							"helinum_game7":{"STAGE":1,"LEVEL":7, "KEY":"helinum_game7","JUMP":0,"TIME":7,"ROTATE":1,"NEXT_URL":"helinum_game8"},
							"helinum_game8":{"STAGE":1,"LEVEL":8, "KEY":"helinum_game8","JUMP":2,"TIME":12,"ROTATE":0,"NEXT_URL":"neon_game0","last":true},

							"neon_game0":{"STAGE":2,"LEVEL":0, "KEY":"neonm_game0","JUMP":1,"TIME":10,"ROTATE":0,"NEXT_URL":"neon_game1"},
							"neon_game1":{"STAGE":2,"LEVEL":1, "KEY":"neonm_game1","JUMP":6,"TIME":10,"ROTATE":2,"NEXT_URL":"neon_game2"},
							"neon_game2":{"STAGE":2,"LEVEL":2, "KEY":"neonm_game2","JUMP":4,"TIME":12,"ROTATE":0,"NEXT_URL":"neon_game3"},
							"neon_game3":{"STAGE":2,"LEVEL":3, "KEY":"neonm_game3","JUMP":2,"TIME":8,"ROTATE":0,"NEXT_URL":"neon_game4"},
							"neon_game4":{"STAGE":2,"LEVEL":4, "KEY":"neonm_game4","JUMP":4,"TIME":14,"ROTATE":1,"NEXT_URL":"neon_game5"},
							"neon_game5":{"STAGE":2,"LEVEL":5, "KEY":"neonm_game5","JUMP":0,"TIME":3,"ROTATE":2,"NEXT_URL":"neon_game6"},
							"neon_game6":{"STAGE":2,"LEVEL":6, "KEY":"neonm_game6","JUMP":7,"TIME":18,"ROTATE":2,"NEXT_URL":"neon_game7","last":true},
							"neon_game7":{"STAGE":2,"LEVEL":7, "KEY":"neonm_game7","JUMP":2,"TIME":13,"ROTATE":1,"NEXT_URL":"neon_game8"},
							"neon_game8":{"STAGE":2,"LEVEL":8, "KEY":"neonm_game8","JUMP":6,"TIME":16,"ROTATE":2,"NEXT_URL":"argon_game0","last":true},

							"argon_game0":{"STAGE":3,"LEVEL":0, "KEY":"argon_game0","JUMP":5,"TIME":12,"ROTATE":1,"NEXT_URL":"argon_game1"},
							"argon_game1":{"STAGE":3,"LEVEL":1, "KEY":"argon_game0","JUMP":5,"TIME":15,"ROTATE":2,"NEXT_URL":"argon_game2"},
							"argon_game2":{"STAGE":3,"LEVEL":2, "KEY":"argon_game0","JUMP":6,"TIME":13,"ROTATE":0,"NEXT_URL":"argon_game3"},
							"argon_game3":{"STAGE":3,"LEVEL":3, "KEY":"argon_game0","JUMP":3,"TIME":12,"ROTATE":0,"NEXT_URL":"argon_game4"},
							"argon_game4":{"STAGE":3,"LEVEL":4, "KEY":"argon_game0","JUMP":3,"TIME":10,"ROTATE":1,"NEXT_URL":"argon_game5"},
							"argon_game5":{"STAGE":3,"LEVEL":5, "KEY":"argon_game0","JUMP":4,"TIME":16,"ROTATE":1,"NEXT_URL":"argon_game6"},
							"argon_game6":{"STAGE":3,"LEVEL":6, "KEY":"argon_game0","JUMP":2,"TIME":8,"ROTATE":1,"NEXT_URL":"argon_game7","last":true},
							"argon_game7":{"STAGE":3,"LEVEL":7, "KEY":"argon_game0","JUMP":12,"TIME":22,"ROTATE":2,"NEXT_URL":"argon_game8"},
							"argon_game8":{"STAGE":3,"LEVEL":8, "KEY":"argon_game0","JUMP":3,"TIME":12,"ROTATE":1,"NEXT_URL":"krypton_game0","last":true},

							"krypton_game0":{"STAGE":4,"LEVEL":0, "KEY":"krypton_game0","JUMP":9,"TIME":20,"ROTATE":7,"NEXT_URL":"krypton_game1"},
							"krypton_game1":{"STAGE":4,"LEVEL":1, "KEY":"krypton_game1","JUMP":2,"TIME":16,"ROTATE":2,"NEXT_URL":"krypton_game2"},
							"krypton_game2":{"STAGE":4,"LEVEL":2, "KEY":"krypton_game2","JUMP":6,"TIME":12,"ROTATE":0,"NEXT_URL":"krypton_game3"},
							"krypton_game3":{"STAGE":4,"LEVEL":3, "KEY":"krypton_game3","JUMP":1,"TIME":8,"ROTATE":2,"NEXT_URL":"krypton_game4"},
							"krypton_game4":{"STAGE":4,"LEVEL":4, "KEY":"krypton_game4","JUMP":3,"TIME":10,"ROTATE":2,"NEXT_URL":"krypton_game5"},
							"krypton_game5":{"STAGE":4,"LEVEL":5, "KEY":"krypton_game5","JUMP":4,"TIME":15,"ROTATE":1,"NEXT_URL":"krypton_game6","last":true},
							"krypton_game6":{"STAGE":4,"LEVEL":6, "KEY":"krypton_game6","JUMP":0,"TIME":5,"ROTATE":2,"NEXT_URL":"krypton_game7"},
							"krypton_game7":{"STAGE":4,"LEVEL":7, "KEY":"krypton_game7","JUMP":3,"TIME":8,"ROTATE":1,"NEXT_URL":"krypton_game8"},
							"krypton_game8":{"STAGE":4,"LEVEL":8, "KEY":"krypton_game8","JUMP":7,"TIME":16,"ROTATE":1,"NEXT_URL":"xenon_game0","last":true},

							"xenon_game0":{"STAGE":5,"LEVEL":0, "KEY":"xenon_game0","JUMP":4,"TIME":12,"ROTATE":2,"NEXT_URL":"xenon_game1"},
							"xenon_game1":{"STAGE":5,"LEVEL":1, "KEY":"xenon_game1","JUMP":3,"TIME":15,"ROTATE":2,"NEXT_URL":"xenon_game2"},
							"xenon_game2":{"STAGE":5,"LEVEL":2, "KEY":"xenon_game2","JUMP":2,"TIME":10,"ROTATE":0,"NEXT_URL":"xenon_game3"},
							"xenon_game3":{"STAGE":5,"LEVEL":3, "KEY":"xenon_game3","JUMP":4,"TIME":12,"ROTATE":1,"NEXT_URL":"xenon_game4"},
							"xenon_game4":{"STAGE":5,"LEVEL":4, "KEY":"xenon_game4","JUMP":6,"TIME":20,"ROTATE":0,"NEXT_URL":"xenon_game5"},
							"xenon_game5":{"STAGE":5,"LEVEL":5, "KEY":"xenon_game5","JUMP":6,"TIME":18,"ROTATE":1,"NEXT_URL":"xenon_game6"},
							"xenon_game6":{"STAGE":5,"LEVEL":6, "KEY":"xenon_game6","JUMP":2,"TIME":10,"ROTATE":0,"NEXT_URL":"xenon_game7","last":true},
							"xenon_game7":{"STAGE":5,"LEVEL":7, "KEY":"xenon_game7","JUMP":6,"TIME":18,"ROTATE":4,"NEXT_URL":"xenon_game8"},
							"xenon_game8":{"STAGE":5,"LEVEL":8, "KEY":"xenon_game8","JUMP":7,"TIME":20,"ROTATE":1,"NEXT_URL":"radon_game0","last":true},

							"radon_game0":{"STAGE":6,"LEVEL":0, "KEY":"radon_game0","JUMP":5,"TIME":24,"ROTATE":2,"NEXT_URL":"radon_game1"},
							"radon_game1":{"STAGE":6,"LEVEL":1, "KEY":"radon_game1","JUMP":0,"TIME":7,"ROTATE":2,"NEXT_URL":"radon_game2"},
							"radon_game2":{"STAGE":6,"LEVEL":2, "KEY":"radon_game2","JUMP":2,"TIME":16,"ROTATE":3,"NEXT_URL":"radon_game3"},
							"radon_game3":{"STAGE":6,"LEVEL":3, "KEY":"radon_game3","JUMP":14,"TIME":36,"ROTATE":8,"NEXT_URL":"radon_game4"},
							"radon_game4":{"STAGE":6,"LEVEL":4, "KEY":"radon_game4","JUMP":6,"TIME":14,"ROTATE":1,"NEXT_URL":"radon_game5"},
							"radon_game5":{"STAGE":6,"LEVEL":5, "KEY":"radon_game5","JUMP":8,"TIME":16,"ROTATE":2,"NEXT_URL":"radon_game6","last":true},
							"radon_game6":{"STAGE":6,"LEVEL":6, "KEY":"radon_game6","JUMP":5,"TIME":18,"ROTATE":3,"NEXT_URL":"radon_game7"},
							"radon_game7":{"STAGE":6,"LEVEL":7, "KEY":"radon_game7","JUMP":6,"TIME":14,"ROTATE":4,"NEXT_URL":"radon_game8"},
							"radon_game8":{"STAGE":6,"LEVEL":8, "KEY":"radon_game8","JUMP":3,"TIME":8,"ROTATE":0,"NEXT_URL":"ununoctiunm_game0","last":true},

							"ununoctiunm_game0":{"STAGE":7,"LEVEL":0, "KEY":"ununoctiunm_game0","JUMP":1,"TIME":10,"ROTATE":2,"NEXT_URL":"ununoctiunm_game1"},
							"ununoctiunm_game1":{"STAGE":7,"LEVEL":1, "KEY":"ununoctiunm_game1","JUMP":8,"TIME":18,"ROTATE":2,"NEXT_URL":"ununoctiunm_game2"},
							"ununoctiunm_game2":{"STAGE":7,"LEVEL":2, "KEY":"ununoctiunm_game2","JUMP":0,"TIME":6,"ROTATE":3,"NEXT_URL":"ununoctiunm_game3"},
							"ununoctiunm_game3":{"STAGE":7,"LEVEL":3, "KEY":"ununoctiunm_game3","JUMP":1,"TIME":24,"ROTATE":5,"NEXT_URL":"ununoctiunm_game4"},
							"ununoctiunm_game4":{"STAGE":7,"LEVEL":4, "KEY":"ununoctiunm_game4","JUMP":4,"TIME":18,"ROTATE":1,"NEXT_URL":"ununoctiunm_game5"},
							"ununoctiunm_game5":{"STAGE":7,"LEVEL":5, "KEY":"ununoctiunm_game5","JUMP":9,"TIME":20,"ROTATE":2,"NEXT_URL":"ununoctiunm_game6","last":true},
							"ununoctiunm_game6":{"STAGE":7,"LEVEL":6, "KEY":"ununoctiunm_game6","JUMP":14,"TIME":22,"ROTATE":2,"NEXT_URL":"ununoctiunm_game7"},
							"ununoctiunm_game7":{"STAGE":7,"LEVEL":7, "KEY":"ununoctiunm_game7","JUMP":9,"TIME":25,"ROTATE":5,"NEXT_URL":"ununoctiunm_game8"},
							"ununoctiunm_game8":{"STAGE":7,"LEVEL":8, "KEY":"ununoctiunm_game8","JUMP":0,"TIME":6,"ROTATE":1,"NEXT_URL":"free_game0","last":true},
						 };

		// ステージクリア
		var G_STAGE_CLEAR_CON =[

								[
								"free_game0","free_game1","free_game2","free_game3",
								"free_game4","free_game5","free_game6","free_game7",
								"free_game8","free_game9","free_game10","free_game11",
								"free_game12",],

								[
								"helium_game0","helium_game1","helium_game2","helium_game3",
								"helium_game4","helium_game5"],

								[
								"neon_game0","neon_game1","neon_game2","neon_game3",
								"neon_game4","neon_game5",],

								[
								"argon_game0","argon_game1","argon_game2","argon_game3",
								"argon_game4","argon_game5"],

								[
								"krypton_game0","krypton_game1","krypton_game2","krypton_game3",
								"krypton_game4","krypton_game5"],

								[
								"xenon_game0","xenon_game1","xenon_game2","xenon_game3",
								"xenon_game4","xenon_game5"],


								[
								"radon_game0","radon_game1","radon_game2","radon_game3",
								"radon_game4","radon_game5"],

								[
								"ununoctiunm_game0","ununoctiunm_game1","ununoctiunm_game2","ununoctiunm_game3",
								"ununoctiunm_game4","ununoctiunm_game5"]
								];

/*---------
		// ステージクリア
		var G_STAGE_CLEAR_CON =[

								[
								"free_game0","free_game1","free_game2","free_game3",
								"free_game4","free_game5","free_game6","free_game7",
								"free_game8","free_game9","free_game10","free_game11",
								"free_game12","free_game13","free_game14","free_game15"],

								[
								"helium_game0","helium_game1","helium_game2","helium_game3",
								"helium_game4","helium_game5","helium_game6","helium_game7",
								"helium_game8"],

								[
								"neon_game0","neon_game1","neon_game2","neon_game3",
								"neon_game4","neon_game5","neon_game6","neon_game7",
								"neon_game8"],

								[
								"argon_game0","argon_game1","argon_game2","argon_game3",
								"argon_game4","argon_game5","argon_game6","argon_game7",
								"argon_game8"],

								[
								"krypton_game0","krypton_game1","krypton_game2","krypton_game3",
								"krypton_game4","krypton_game5","krypton_game6","krypton_game7",
								"krypton_game8"],

								[
								"xenon_game0","xenon_game1","xenon_game2","xenon_game3",
								"xenon_game4","xenon_game5","xenon_game6","xenon_game7",
								"xenon_game8"],


								[
								"radon_game0","radon_game1","radon_game2","radon_game3",
								"radon_game4","radon_game5","radon_game6","radon_game7",
								"radon_game8"],

								[
								"ununoctiunm_game0","ununoctiunm_game1","ununoctiunm_game2","ununoctiunm_game3",
								"ununoctiunm_game4","ununoctiunm_game5","ununoctiunm_game6","ununoctiunm_game7",
								"ununoctiunm_game8"]
								];
	
-------------*/
	
	//ブロックパターン 120px
	var	G_BLOCK_PTN_ARR=["k.png",		
						"co01.png",		
						"co02.png",		
						"co03.png",
						"co04.png",
						"cr01.png",
						"li01.png",
						"li02.png",
						"t01.png",
						"t02.png",
						"t03.png",
						"t04.png",
						"li01_u.png",
						"li01_d.png",
						"li02_l.png",
						"li02_r.png",
					
							];
//------------------------------------------------------------------------------

	// WEB ストレージから設定を保存・取得する

var GameConfig = function() {
	
	var url = window.location.href;
	console.log(""+url );
	//
	if(url.indexOf(".html") >0){
		this.filename = url.match(".+/(.+?)\.[a-z]+([\?#;].*)?$")[1];
	} else {
		this.filename = url;
	}

	this.last =false;
	this.hint ="";
	if(this.filename in G_GAME_CLEAR_CON){
		// ステージ毎の設定値
		this.stage = G_GAME_CLEAR_CON[this.filename]["STAGE"];
		this.level = G_GAME_CLEAR_CON[this.filename]["LEVEL"];
		this.key   = G_GAME_CLEAR_CON[this.filename]["KEY"];
		this.jump  = G_GAME_CLEAR_CON[this.filename]["JUMP"];
		this.time  = G_GAME_CLEAR_CON[this.filename]["TIME"];
		this.rotate  = G_GAME_CLEAR_CON[this.filename]["ROTATE"];
		this.next_url= G_GAME_CLEAR_CON[this.filename]["NEXT_URL"];
		if( "last"in G_GAME_CLEAR_CON[this.filename] ){
			this.last =G_GAME_CLEAR_CON[this.filename]["last"];
		}

		if( "hint"in G_GAME_CLEAR_CON[this.filename] ){
			this.hint =G_GAME_CLEAR_CON[this.filename]["hint"];
		}		
	} else {
		var keyVal ="index";
		this.stage = G_GAME_CLEAR_CON[keyVal]["STAGE"];
		this.level = G_GAME_CLEAR_CON[keyVal]["LEVEL"];
		this.key   = G_GAME_CLEAR_CON[keyVal]["KEY"];
		this.jump  = G_GAME_CLEAR_CON[keyVal]["JUMP"];
		this.time  = G_GAME_CLEAR_CON[keyVal]["TIME"];
		this.rotate  = G_GAME_CLEAR_CON[keyVal]["ROTATE"];
		this.next_url= G_GAME_CLEAR_CON[keyVal]["NEXT_URL"];
	}			

	//
	this.storage = localStorage;	

	// 設定 デフォルト
	var game_config = {
				// キー名　デフォルト			
		    	"sound"  : "0",
		    	"stage"  : "0",
		    	"level"  : "0"
			};


	// 	WEB ストレージが使えるか確認
	this.checkStorage = function() {
		if (typeof localStorage !== 'undefined') {
			return true;
			} else {
			return false;
		}
	};
	
	// ゲームプレーできるか
	this.checkAuth = function() {
		if(this.getStage()< this.stage){
		console.log("0stage:"+ this.stage +"LEVEl:" +this.level );
			return false;
		}
		if(this.getStage()> this.stage){
			return true;
		}
		if( this.getLevel()< this.level ){
			return false;
		}
		return true ;
	};
	
	
	this.getSound = function() {
		return  this.storage.getItem("sound") ? this.storage.getItem("sound"):game_config["sound"];
	};

	this.getStage = function() {
		return  this.storage.getItem("stage") ? parseInt(this.storage.getItem("stage")):0;
		return;
	};

	this.getLevel = function() {
		return  this.storage.getItem("level") ? parseInt(this.storage.getItem("level")):0;
		return;
	};

	this.setSound = function(val) {
		  this.storage.setItem("sound", val);
		return;
	};

	this.setStage = function(val) {
		  //if(this.getStage()> val) return ;
		  this.storage.setItem("stage", val);
		return;
	};

	this.setLevel = function(val) {
		  this.storage.setItem("level", val);
		return;
	};

	// detail
	// クリア条件をクリアしているか？

	this.getStage = function() {
		if(keyVal =="")  keyVal =this.key ;
		var vkey= "stage" ;
		return  this.storage.getItem(vkey)  ? parseInt(this.storage.getItem(vkey)) : 0;
	}	
	this.getStatusTime = function(keyVal) {
		if(keyVal =="")  keyVal =this.key ;
		var vkey= keyVal +"_time" ;
		// console.log("getStatusTime>"+vkey+"<" +this.storage.getItem(vkey));
		return  this.storage.getItem(vkey) ? parseInt(this.storage.getItem(vkey)) : 0;

	}

	this.getStatusJump = function(keyVal) {
		if(keyVal =="")  keyVal =this.key ;
		var vkey= keyVal +"_jump" ;
		return  this.storage.getItem(vkey) ? parseInt(this.storage.getItem(vkey)) : 0;
	}

	this.getStatusRotate = function(keyVal) {
		if(keyVal =="")  keyVal =this.key ;
		var vkey= keyVal +"_rotate" ;
		return  this.storage.getItem (vkey) ? parseInt(this.storage.getItem(vkey)) : 0;
	}

	//	ステージをクリアしたチェックする。
	//  return true CLEAR
	//
	this.checkStageClear = function() {
		var ret = true;
		var level_arr = G_STAGE_CLEAR_CON[parseInt(this.getStage())] ;

		for( i=0 ; i<level_arr.length ;i++){
			var keyval=	level_arr[i];
			if( this.getStatusJump(keyval) ==0){
				ret = false ;
				break;
			}
			if( this.getStatusRotate(keyval) ==0){
				ret = false ;
				break;
			}
			if( this.getStatusTime(keyval) ==0){
				ret = false ;
				break;
			}
		}
		return ret;
	}

	// 


	this.setStatusTime = function(keyVal,flg) {
		if(keyVal =="")  keyVal =this.key ;
	   if( this.getStatusTime(keyVal)  &&  flg == 0) {    return;}
	   this.storage.setItem(keyVal + "_time", String(flg) );
	}

	this.setStatusJump = function(keyVal,flg) {
		if(keyVal =="")  keyVal =this.key ;
	   if( !this.getStatusJump(keyVal) &&  flg == 0) {    return;}
	   this.storage.setItem(keyVal + "_jump", String(flg) );
	}

	this.setStatusRotate = function(keyVal,flg) {
		if(keyVal =="")  keyVal =this.key ;
	   if( !this.getStatusRotate(keyVal) &&  flg == 0 ) {    return;}
	   this.storage.setItem(keyVal + "_rotate", String(flg) );
	}


}


/*-----
// Class TEST
var game_test=new GameConfig();
console.log("time:"+game_test.time);
console.log("last:"+game_test.last);
console.log("last:"+game_test.last);
console.log("key:"+game_test.key);


console.log("WEB"+game_test.checkStorage());
console.log("game_test"+game_test.getSound());
game_test.setSound(false);
console.log("game_test"+game_test.getSound());
game_test.setSound(true);
console.log("game_test"+game_test.getSound());
console.log("game_test ジャンプ"+game_test.getStatusJump(""));

console.log("game_test 認証"+game_test.checkAuth(""));
console.log("game_test stage"+game_test.stage);
console.log("game_test level"+game_test.level);


//
--------*/


