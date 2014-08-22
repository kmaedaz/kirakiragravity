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
    var FRAME_RATE = 30;

    // 定数
    var IMAGES_PATH = "./images/";

    var IMAGE_HELP = 'help/help_05.png';

    var IMAGE_MENU_BUTTON = 'button/menu_button.png';
    var IMAGE_NEXT_BUTTON = 'button/next_button.png';
    var IMAGE_PRE_BUTTON = 'button/pre_button.png';


    var LINK_URL_MENU_BUTTON = 'index.html';
    var LINK_URL_NEXT_BUTTON = 'help6.html';
    var LINK_URL_PRE_BUTTON  = 'help4.html';


	// 画面サイズ
    var IMAGE_TITLE_BGROUD_WIDTH = 1080 ;
    var IMAGE_TITLE_BGROUD_HEIGHT = 1920 ;



    var TUTORIAL_BUTTON = 'select_button1.png';
    var TUTORIAL_BUTTON_WIDTH = 132 ;
    var TUTORIAL_BUTTON_HEIGHT = 132;



	// シーンの設定										
    var core = new Core(1080, 1920); 

	//core.backgroundColor = "red";
    
    core.preload(
			IMAGES_PATH + IMAGE_HELP,
			IMAGES_PATH + IMAGE_MENU_BUTTON,
			IMAGES_PATH + IMAGE_NEXT_BUTTON,
			IMAGES_PATH + IMAGE_PRE_BUTTON
    			  );


    core.fps = FRAME_RATE;



	// titleBgroud
	// 
	var HelpBgroudImage = Class.create(Sprite,{
		initialize : function(x,y){
			Sprite.call(this,1080,1920);
			this.x = x;
			this.y = y;
	        this.frame = 1;        
	        this.image = core.assets[IMAGES_PATH + IMAGE_HELP];

        core.rootScene.addChild(this);
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





    core.onload = function() {

		var scene = core.rootScene;
		// シーンの背景色でゲーム背景の色を変えることができます
		scene.backgroundColor = "#000000";
		var titleBgroudBottom = new HelpBgroudImage(0,0);
		var menuButton1  = new MenuButton(470,1548,LINK_URL_MENU_BUTTON,"MENU",IMAGE_MENU_BUTTON);
		//var menuButton2  = new MenuButton(842,1548,LINK_URL_NEXT_BUTTON,"次へ",IMAGE_NEXT_BUTTON);
		var menuButton3  = new MenuButton(120,1548,LINK_URL_PRE_BUTTON,"前へ",IMAGE_PRE_BUTTON);

    
    }

    core.start();



};


