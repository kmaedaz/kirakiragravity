/**
 * enchant();
 * Preparation for using enchant.js.
 * (Exporting enchant.js class to global namespace.
 *  ex. enchant.Sprite -> Sprite etc..)
 *
 * enchant.js を使う前に必要な処理。
 * (enchant.js 本体や、読み込んだプラグインの中で定義されている enchant.Foo, enchant.Plugin.Bar などのクラスを、
 *  それぞれグローバルの Foo, Bar にエクスポートする。)
 */
enchant();

/*
 * window.onload
 *
 * The function which will be executed after loading page.
 * Command in enchant.js such as "new Core();" will cause an error if executed before entire page is loaded.
 *
 */
window.onload = function(){

    // 定数
    var FRAME_RATE = 8;

    // 定数
    var IMAGES_PATH = "./images/";

    var IMAGE_TITLE_BGROUD = 'free_world.png';
    var IMAGE_TITLE_BGROUD_WIDTH = 1080 ;
    var IMAGE_TITLE_BGROUD_HEIGHT = 1920 ;


	// クリアステージ
    var CLEAR_STAR_BUTTON = 'button/star_c.png';

	// 未完了ステージ
    var UN_STAR_BUTTON = 'button/star_u.png';

	// 　未完ステージ
    var NOT_STAR_BUTTON = 'button/none1.png';

	// クリア　アイコン	
	//  time
	var TIME_ICON="star/star_blue.png";

	// jump
	var JUMP_ICON="star/star_red.png";

	// rotate
	var ROTATE_ICON="star/star_yellow.png";
	

	// 背景
    var IMAGE_BACKGROUND_BOTTOM = 'bg/gray.png';

    var IMAGE_BACKGROUND_TOP = 'bg/gray_top.png';



    var IMAGE_MENU_BUTTON = 'button/menu_button.png';
    var IMAGE_NEXT_BUTTON = 'button/next_button.png';
    var IMAGE_PRE_BUTTON = 'button/pre_button.png';


    var LINK_URL_MENU_BUTTON = 'index.html';
    var LINK_URL_NEXT_BUTTON = 'help4.html';
    var LINK_URL_PRE_BUTTON = 'help2.html';


	// レベルボタン
	var LEVEL_arr =[
					// link  データ保存キー
	               ["xenon_game0.html","xenon_game0"], //0
	               ["xenon_game1.html","xenon_game1"], //1
	               ["xenon_game2.html","xenon_game2"], //2
	               ["xenon_game3.html","xenon_game3"], //3
	               ["xenon_game4.html","xenon_game4"], //4
	               ["xenon_game5.html","xenon_game5"], //5
	               ["xenon_game6.html","xenon_game6"], //6
	               ["xenon_game7.html","xenon_game7"], //7
	               ["xenon_game8.html","xenon_game8"], //8
	               ["",""], //12
	               ["",""], //13
	               ["",""], //14
	               ["",""], //15
	               ["",""], //16
	               ["",""], //16
	               ["",""], //16
	               ["",""], //16
	                ];

    var TUTORIAL_BUTTON = 'free_world_button.png';
    var TUTORIAL_BUTTON_WIDTH = 213 ;
    var TUTORIAL_BUTTON_HEIGHT = 221;



	// シーンの設定										
    var core = new Core(1080, 1920); 
    
    core.preload(
				IMAGES_PATH + IMAGE_TITLE_BGROUD,
				IMAGES_PATH + IMAGE_TITLE_BGROUD,
				IMAGES_PATH + CLEAR_STAR_BUTTON,
				IMAGES_PATH + UN_STAR_BUTTON ,
				IMAGES_PATH + NOT_STAR_BUTTON, 
				IMAGES_PATH + TIME_ICON,
				IMAGES_PATH + JUMP_ICON,
				IMAGES_PATH + ROTATE_ICON,
				IMAGES_PATH + IMAGE_BACKGROUND_BOTTOM,
    			IMAGES_PATH + IMAGE_BACKGROUND_TOP,
				IMAGES_PATH + IMAGE_MENU_BUTTON,
				IMAGES_PATH + IMAGE_NEXT_BUTTON,
				IMAGES_PATH + IMAGE_PRE_BUTTON

    			  );


    core.fps = FRAME_RATE;



	// titleBgroud
	// 
	var TitleBgroud = Class.create(Sprite,{
		initialize : function(x,y){
			Sprite.call(this,IMAGE_TITLE_BGROUD_WIDTH,695);
			this.x = x;
			this.y = y;
	        this.frame = 1;        
	        this.image = core.assets[IMAGES_PATH + IMAGE_BACKGROUND_BOTTOM];

        core.rootScene.addChild(this);
		}
	});

	// 
	var TitleBgroudTOP = Class.create(Sprite,{
		initialize : function(x,y){
			Sprite.call(this,IMAGE_TITLE_BGROUD_WIDTH,400);
			this.x = x;
			this.y = y;
	        this.frame = 1;        
	        this.image = core.assets[IMAGES_PATH + IMAGE_BACKGROUND_TOP];

        core.rootScene.addChild(this);
		}
	});

	var LevelButton  = Class.create(Sprite,{
		//			座標X、座標Y アイコンN  アクティブ,タイム、ジャンプ、回転
		initialize : function(x,y,n,flg,tflg,jflg,rflg){
			Sprite.call(this,190,220);
			// グループ用オブジェクト
	        var group = new Group();
		
			this.x = x;
			this.y = y;
	        this.frame = 0;
	        var level_arr = LEVEL_arr[n-1];
	        this.link  = LEVEL_arr[0][0];
			console.log("link:"+this.link);
	        if( level_arr[0]==""){
		        this.image = core.assets[IMAGES_PATH + NOT_STAR_BUTTON];
	        } else if(flg) {
		        this.image = core.assets[IMAGES_PATH + CLEAR_STAR_BUTTON];
	        } else {
		        this.image = core.assets[IMAGES_PATH + UN_STAR_BUTTON];

	        }
	        
	        
	        this.levelname =  LEVEL_arr[n-1][1];
	        this.link =  LEVEL_arr[n-1][0];
       // グループ化する
         group.addChild(this);
			// NUMBER
			var vname = new Label();
			vname.font = "42px Palatino";
				vname.x = this.x +32;
				vname.y = this.y +30;
				vname.text = n;
				vname.color="#fff";
           group.addChild(vname);

				console.log("LevelButton TIME"+tflg);
          
	        if( tflg == 1){
		         var ticon= new Sprite(64,64);
		         ticon.image =core.assets[IMAGES_PATH + TIME_ICON];
		         ticon.x = x +10;
		         ticon.y = y +168;
		         ticon.scale(0.7,0.7);
	             group.addChild(ticon);
	         
	        }	        	        
	        
	        if( jflg == 1){
		         var jicon= new Sprite(64,64);
		         jicon.image =core.assets[IMAGES_PATH + JUMP_ICON];
		         jicon.x = x +68;
		         jicon.y = y +168;
		         jicon.scale(0.7,0.7);
	             group.addChild(jicon);
	        }	        	        
	        
	        if( rflg == 1){
		         var ricon= new Sprite(64,64);
		         ricon.image =core.assets[IMAGES_PATH + ROTATE_ICON];
		         ricon.x = x +126;
		         ricon.y = y +168;
		         ricon.scale(0.7,0.7);
	             group.addChild(ricon);
	        }	        	        
	        
	         core.rootScene.addChild(group);
	        this.on('enterframe', function() {
				//this.x += 5;
			});

	        this.on('touchstart', function() {
				 this.y+=2;
			});


	        this.on('touchend', function() {
				 this.y-=2;
				 if(!flg) return;
				 location.href = this.link;
			});

 
		}
	});


	var MenuButton  = Class.create(Sprite,{
		initialize : function(x,y,link,title,image){
			// グループ用オブジェクト
	        var group = new Group();
			Sprite.call(this,140,140);
			this.x = x;
			this.y = y;
	        this.frame = 0;        
	        this.image = core.assets[IMAGES_PATH + image ];

              // グループ化する
	         group.addChild(this);


			// 
			var vtitle= new Label();
			vtitle.font = "42px Palatino";
			vtitle.x = this.x +20;
			vtitle.y = this.y +150;
			vtitle.text = title;
			vtitle.color="#fff";
             group.addChild(vtitle);
	
	         core.rootScene.addChild(group);


	        this.on('touchstart', function() {
				 this.y+=3;
				 location.href = link;
			});

	        this.on('touchend', function() {
				 this.y-=3;
				 location.href = link;
			});

        core.rootScene.addChild(this);
		}
	});

// -----------------------------------------------------------------------
	// 


    core.onload = function() {
		 var titleBgroud = new TitleBgroud(0,1225);

		 var titleBgroudTOP = new TitleBgroudTOP(0,0);
		var scene = core.rootScene;
		scene.backgroundColor = "#191930";


		var vname = new Label("          ");
		vname.font = "64px Palatino";
		vname.x = 80;
		vname.y = 220;
		vname.width = 1080;
		vname.text = "Xenon";
		vname.color="#fff";

		core.rootScene.addChild(vname);
		var gameconfig =new GameConfig();

		var levelButton=[]; 
		var cur_level=gameconfig.getLevel();
		var cur_stage =gameconfig.getStage();
		for(var y=0;y<3;y++){

			for(var x=0;x<3;x++){
			var active_flg= false;

			if( cur_level >= (x+y*3) || cur_stage > 5 ){
				active_flg = true;
			} else {
				active_flg = false;
			}

//			active_flg = true; //debug

			console.log("LEVL:"+LEVEL_arr[x+y*3][1] +">>");

			levelButton[y*3+x]  =  new LevelButton(160+x*280,340+y*290,(x+y*3)+1,active_flg,gameconfig.getStatusTime(LEVEL_arr[x+y*3][1]),
													gameconfig.getStatusJump(LEVEL_arr[x+y*3][1]),
													gameconfig.getStatusRotate(LEVEL_arr[x+y*3][1]));

			}
		}

		var menuButton1  = new MenuButton(470,1520,LINK_URL_MENU_BUTTON,"MENU",IMAGE_MENU_BUTTON);

        var menuButton3 = new MenuButton(110, 1520, "krypton_world.html", "前へ", IMAGE_PRE_BUTTON);


		if( cur_stage >5){
	        var menuButton2 = new MenuButton(850, 1520, "radon_world.html", "次へ", IMAGE_NEXT_BUTTON);
		}

    
    }
    core.start();

};


