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

var g_orientation_flg = false;

if (Math.abs(window.orientation) === 90) {
    g_orientation_flg = true;
}



enchant();

/*
 * window.onload
 *
 * The function which will be executed after loading page.
 * Command in enchant.js such as "new Core();" will cause an error if executed before entire page is loaded.
 *
 */
window.onload = function() {

    // 定数
    var FRAME_RATE = 30;

    var G_SCREEN_WIDTH = 1080;
    var G_SCREEN_HEIGHT = 1920;

    // 定数
    var IMAGES_PATH = "./images/";

    var IMAGE_BACKGROUND_BOTTOM = 'bg/back_bottom01.png';

    var IMAGE_TITLE_LOGO = 'title/title_logo.png';

    var IMAGE_LINK_BUTTON00 = 'button/0.png';
    var IMAGE_LINK_BUTTON01 = 'button/1.png';
    var IMAGE_LINK_BUTTON02 = 'button/2.png';
    var IMAGE_LINK_BUTTON03 = 'button/3.png';
    var IMAGE_LINK_BUTTON04 = 'button/4.png';
    var IMAGE_LINK_BUTTON05 = 'button/5.png';
    var IMAGE_LINK_BUTTON06 = 'button/6.png';
    var IMAGE_LINK_BUTTON07 = 'button/7.png';
    var IMAGE_LINK_BUTTON08 = 'button/8.png';
    var IMAGE_LINK_BUTTON_NONE = 'button/none.png';


    var IMAGE_SPEAK_BUTTON = 'button/speaker_button.png';

    var IMAGE_HELP_BUTTON = 'button/plus_button.png';

    var HELP_LINK_URL = 'help1.html';


    // レベルボタン
    var LEVEL_arr = [
        // 画像　   Name        link
        [IMAGE_LINK_BUTTON00, "Tutorial", "free_world.html"],
        [IMAGE_LINK_BUTTON01, "Helium", "helium_world.html"],
        [IMAGE_LINK_BUTTON02, "Neon", "neon_world.html"],
        [IMAGE_LINK_BUTTON03, "Argon", "argon_world.html"],
        [IMAGE_LINK_BUTTON04, "Krypton", "krypton_world.html"],
        [IMAGE_LINK_BUTTON05, "Xenon", "xenon_world.html"],
        [IMAGE_LINK_BUTTON06, "Radon", "radon_world.html"],
        [IMAGE_LINK_BUTTON07, "Ununoctium", "ununoctium_world.html"],
        [IMAGE_LINK_BUTTON07, "", "free_world.html"],
    ];


    // 画面サイズ
    var IMAGE_TITLE_BGROUD_WIDTH = 1080;
    var IMAGE_TITLE_BGROUD_HEIGHT = 1920;



    var TUTORIAL_BUTTON = 'select_button1.png';
    var TUTORIAL_BUTTON_WIDTH = 132;
    var TUTORIAL_BUTTON_HEIGHT = 132;



    // シーンの設定										
    // シーンの設定										
    var core = new Core(G_SCREEN_WIDTH, G_SCREEN_HEIGHT);

    core.backgroundColor = "black";

    core.preload(
            IMAGES_PATH + IMAGE_BACKGROUND_BOTTOM,
            IMAGES_PATH + IMAGE_TITLE_LOGO,
            IMAGES_PATH + IMAGE_LINK_BUTTON00,
            IMAGES_PATH + IMAGE_LINK_BUTTON01,
            IMAGES_PATH + IMAGE_LINK_BUTTON02,
            IMAGES_PATH + IMAGE_LINK_BUTTON03,
            IMAGES_PATH + IMAGE_LINK_BUTTON04,
            IMAGES_PATH + IMAGE_LINK_BUTTON05,
            IMAGES_PATH + IMAGE_LINK_BUTTON06,
            IMAGES_PATH + IMAGE_LINK_BUTTON07,
            IMAGES_PATH + IMAGE_LINK_BUTTON08,
            IMAGES_PATH + IMAGE_LINK_BUTTON_NONE,
            IMAGES_PATH + IMAGE_SPEAK_BUTTON,
            IMAGES_PATH + IMAGE_HELP_BUTTON
            );

    core.fps = FRAME_RATE;


    // titleBgroud
    // 
    var TitleBgroudBottom = Class.create(Sprite, {
        initialize: function(x, y) {
            Sprite.call(this, IMAGE_TITLE_BGROUD_WIDTH, 695);
            this.x = x;
            this.y = y;
            this.frame = 1;
            this.image = core.assets[IMAGES_PATH + IMAGE_BACKGROUND_BOTTOM];

            core.rootScene.addChild(this);
        }
    });


    var TitleBgroudLogo = Class.create(Sprite, {
        initialize: function(x, y) {
            Sprite.call(this, IMAGE_TITLE_BGROUD_WIDTH, 480);
            this.x = x;
            this.y = y;
            this.frame = 1;
            this.image = core.assets[IMAGES_PATH + IMAGE_TITLE_LOGO];

            core.rootScene.addChild(this);
        }
    });


    var SpeakerButton = Class.create(Sprite, {
        initialize: function(x, y) {
            Sprite.call(this, 130, 130);
            this.x = x;
            this.y = y;
            this.image = core.assets[IMAGES_PATH + IMAGE_SPEAK_BUTTON];
	        this.gameConfig = new GameConfig();
			this.snd_flg = parseInt(this.gameConfig.getSound()) ;
            this.frame = this.snd_flg;


            this.on('touchstart', function() {
                this.y++;
            });

            this.on('touchend', function() {
                this.y--;
                this.tl.fadeOut(8).fadeIn(8);

				this.snd_flg = ( parseInt(this.gameConfig.getSound()) +1 )%2 ;
				console.log("SOUND");
				this.gameConfig.setSound(this.snd_flg);
                this.frame = this.snd_flg;


            });

            core.rootScene.addChild(this);
        }
    });


    var HelpButton = Class.create(Sprite, {
        initialize: function(x, y, link) {
            Sprite.call(this, 140, 140);
            this.x = x;
            this.y = y;
            this.frame = 0;
            this.image = core.assets[IMAGES_PATH + IMAGE_HELP_BUTTON];
            this.on('touchstart', function() {
                this.y++;
                this.tl.fadeOut(4).fadeIn(4);
            });

            this.on('touchend', function() {
                this.y--;
                location.href = link;
            });

            core.rootScene.addChild(this);
        }
    });

    var LevelButton = Class.create(Sprite, {
        //			座標X、座標Y アイコンN  アクティブ
        initialize: function(x, y, n, flg) {
            Sprite.call(this, 165, 165);
            // グループ用オブジェクト
            var group = new Group();

            this.x = x;
            this.y = y;
            this.frame = 0;
            var img_path = LEVEL_arr[n][0];
            if (flg) {
                this.image = core.assets[IMAGES_PATH + img_path];
            } else {
                this.image = core.assets[IMAGES_PATH + IMAGE_LINK_BUTTON_NONE];
            }

            this.levelname = LEVEL_arr[n][1];
            this.link = LEVEL_arr[n][2];
            // グループ化する
            group.addChild(this);

            var vname = new Label();
            vname.font = "36px Palatino";
            if (!flg) {
                vname.x = this.x + 20;
                vname.y = this.y + 20;
                vname.text = n;
                vname.color = "#fff";
            }
            group.addChild(vname);

            var vname1 = new Label();
            vname1.font = "36px Palatino";
            vname1.x = this.x + 10;
            vname1.y = this.y + 180;
            vname1.text = this.levelname;
            vname1.color = "#fff";
            group.addChild(vname1);


            this.on('touchstart', function() {
                this.tl.fadeOut(8);
                this.y += 3;
            });

            this.on('touchend', function() {
                this.tl.fadeIn(8);

                this.y -= 3;
                if (!flg)
                    return;
                location.href = this.link;
            });
            core.rootScene.addChild(group);

        }
    });

    core.onload = function() {

        var scene = core.rootScene;
        scene.backgroundColor = "#000000";

        var titleBgroudBottom = new TitleBgroudBottom(0, 1225);

        var titleBgroudLogo = new TitleBgroudLogo(0, 0);
        var speakerButton = new SpeakerButton(860, 20);

        // help
        var helpButton = new HelpButton(120, 1580, HELP_LINK_URL);
        var gameConfig = new GameConfig();
        var stage = gameConfig.getStage();
        var level = gameConfig.getLevel();

        var levelButton = [];
        var active_flg;
        for (var y = 0; y < 3; y++) {
            for (var x = 0; x < 3; x++) {
                var i = x + y * 3;
                if (stage < i) {
                    active_flg = false;
                } else {
                    active_flg = true;
                }
                levelButton[x + y * 3] = new LevelButton(140 + x * 290, 510 + y * 330, x + y * 3, active_flg);
            }
        }



        if (Math.abs(window.orientation) === 90) {
            var alartText = new Label();
            alartText.font = "32px Palatino";
            alartText.x = 30;
            alartText.y = 60;
            alartText.text = "縦長画面にして、自動画面回転はOFFにしてください。("  + stage + ":" +level +")";

            alartText.width = 800;

            alartText.color = "#fff";
            core.rootScene.addChild(alartText);
        }





    }

    core.start();



};


