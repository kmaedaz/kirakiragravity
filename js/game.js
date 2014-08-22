/**
 *  main　処理
 * 
 *  
 *  enchant();
 * Preparation for using enchant.js.
 * (Exporting enchant.js class to global namespace.
 *  ex. enchant.Sprite -> Sprite etc..)
 *
 * enchant.js を使う前に必要な処理。
 * (enchant.js 本体や、読み込んだプラグインの中で定義されている enchant.Foo, enchant.Plugin.Bar などのクラスを、
 *  それぞれグローバルの Foo, Bar にエクスポートする。)
 */

// 
var DEBUG_MODE = true;

enchant();



//　Function


// 引数 num を受け取って、0 から (num - 1) までの乱数を返す関数
function rand(num) {
    return Math.floor(Math.random() * num);
}

function sleep(milliSeconds) {
    var startTime = new Date().getTime();
    while (new Date().getTime() < startTime + milliSeconds);
}


// ブラウザ対応 Audio 拡張子取得
var AUDIO_EXT = (function(){
    var ext = "";
    var audio = new Audio();
    if      (audio.canPlayType("audio/ogg") == "maybe") { ext=".ogg"; }
    else if (audio.canPlayType("audio/mp3") == "maybe") { ext=".mp3"; }
    else if (audio.canPlayType("audio/wav") == "maybe") { ext=".wav"; }
    return ext;
})();


// 圧縮ファイルはブラウザで実装が異なるので、確認できるまで、wav 形式にする。

AUDIO_EXT =".wav";



// Sprite NO
var MENU_ICON_LEVEL = 0;
var MENU_ICON_MENU 	= 1;
var MENU_ICON_NEXT 	= 2;
var MENU_ICON_PAUSE = 3;
var MENU_ICON_PLAY 	= 4;
var MENU_ICON_HELP 	= 5;
var MENU_ICON_PRE 	= 6;
var MENU_ICON_RETRY = 7;

//
var GAME_STATUS_READY = 0;
var GAME_STATUS_PLAY = 1;
var GAME_STATUS_PAUSE = 2;
var GAME_STATUS_OVER = 3;
var GAME_STATUS_HIT = 4;

var g_state = GAME_STATUS_READY;
var g_pause = false;

//==========================================

window.onload = function() {

    // 定数
    var FRAME_RATE = 30;	// フレームレート

    var G_SCREEN_WIDTH = 1080;
    var G_SCREEN_HEIGHT = 1920;

	// ゲーム画面範囲
    var G_GAME_SCREEN_X1 = -400;
    var G_GAME_SCREEN_Y1 = -700;

    var G_GAME_SCREEN_X2 = G_SCREEN_WIDTH + 400;
    var G_GAME_SCREEN_Y2 = G_SCREEN_HEIGHT + 700;


    // 定数
    var IMAGES_PATH = "./images/";

    var CELL_PATH = '120px/';

    // スプライト画像
    // 背景						 画像　x,y
    var SPRITE_BGROUND_IMG = G_SPRITE_BGROUND_IMG;

    var SPRITE_BGROUND_MASK = 'bg/bg_mask.png';

    // ボール				 画像
    var SPRITE_BALL_IMG = 'ball.png';
    var SPRITE_BALL_GROW_IMG = 'ball_grow.png';
    var BALL_RADIUS = 39;



    // CUBE				 画像
    var SPRITE_CUBE_IMG = 'CUBE.png';

    var CUBE_SIZE_WIDTH  = 86;
    var CUBE_SIZE_HEIGHT = 86;

    // Phy BLOCK				 画像
    var SPRITE_PHY_BLOCK_IMG = 'PhyCube.png';
    //var SPRITE_PHY_BLOCK_IMG = 'PhyCube1.png';

    // jump TEXT				 画像
    var JUMP_TEXT_IMG = 'jump.png';

    // TAP TEXT				 画像
    var TAP_TEXT_IMG = 'mes/TAP_MESSAGE.png';
    //

    // 星印
    var STAR_RED_BUTTON = 'button/star_red_button.png';
    var STAR_YELLOW_BUTTON = 'button/star_yellow_button.png';
    var STAR_BLUE_BUTTON = 'button/star_blue_button.png';

    // 星印 SMALL
    var STAR_RED_ICON = 'star/star_red.png';
    var STAR_YELLOW_ICON = 'star/star_yellow.png';
    var STAR_BLUE_ICON = 'star/star_blue.png';

    //
    var IMAGE_MENU_BUTTON = 'button/menu_button.png';
    var IMAGE_NEXT_BUTTON = 'button/next_button.png';
    var IMAGE_PRE_BUTTON = 'button/pre_button.png';
    var IMAGE_RETRY_BUTTON = 'button/retry_button.png';

    // 背景
    var IMAGE_BACKGROUND_BOTTOM = 'bg/blue2.png';


    var IMAGE_ALERT_MSG = 'alert_rotate.png';

    // 
    var PAUSE_BUTTON_IMG = "button/pause_button.png";
    var PLAY_BUTTON_IMG = "button/play_buton.png";

    var MENU_BUTTON_IMG = "button/button_sprite.png";

    var STAR_DUST_IMG = "star_dust.png";


	//　SOUND 
	// ステージ開始時
	var SOUND_FADEIN    = "sound/se_maoudamashii_onepoint20" + AUDIO_EXT;	

	// 光の玉を消した時
	var SOUND_FADEOUT    = "sound/fadeout" + AUDIO_EXT;	

	// クリア
	var SOUND_CLEAR    = "sound/gameover" + AUDIO_EXT ;	

	// 「タイム」と「ジャンプ」と「回転」の条件を満たした時 
	var SOUND_LEVELUP    = "sound/se_maoudamashii_chime05" + AUDIO_EXT ;	

	// ジャンプ
	var SOUND_JUMP    = "sound/shyuin" + AUDIO_EXT ;	

	//  CUBE
	var SOUND_CUBE     = "sound/enter12" + AUDIO_EXT ;	

	//  BGM
	var SOUND_BGM     = "sound/game_maoudamashii_8_piano06" + AUDIO_EXT ;	

	//
	
	// 重力の強さ
    var GARVITY_FORCE_FACTOR = 56;
	//ジャンプ力
	var G_JUMP_FACTOR		 = 29;

    // ステージ構成 HTML 部データ
    var BLOCK_PTN_ARR = G_BLOCK_PTN_ARR;

    // 物理ブロック 壁のパターンに一致させるため5X5に細分割
    var BLOCK_WALL_TBL_ARR = [
        [0, 0, 0, 0, 0, //k.png"
            0, 0, 0, 0, 0,
            0, 0, 0, 0, 0,
            0, 0, 0, 0, 0,
            0, 0, 0, 0, 0
        ],
        [0, 0, 0, 0, 0,
            0, 0, 0, 0, 0,
            0, 0, 1, 1, 1,
            0, 0, 1, 0, 0,
            0, 0, 1, 0, 0
        ],
        [0, 0, 0, 0, 0,
            0, 0, 0, 0, 0,
            1, 1, 1, 0, 0,
            0, 0, 1, 0, 0,
            0, 0, 1, 0, 0
        ],
        [0, 0, 1, 0, 0,
            0, 0, 1, 0, 0,
            1, 1, 1, 0, 0,
            0, 0, 0, 0, 0,
            0, 0, 0, 0, 0
        ],
        [0, 0, 1, 0, 0,
            0, 0, 1, 0, 0,
            0, 0, 1, 1, 1,
            0, 0, 0, 0, 0,
            0, 0, 0, 0, 0
        ],
        [0, 0, 1, 0, 0, //cr01
            0, 0, 1, 0, 0,
            1, 1, 1, 1, 1,
            0, 0, 1, 0, 0,
            0, 0, 1, 0, 0
        ],
        [0, 0, 1, 0, 0,
            0, 0, 1, 0, 0,
            0, 0, 1, 0, 0,
            0, 0, 1, 0, 0,
            0, 0, 1, 0, 0
        ],
        [0, 0, 0, 0, 0,
            0, 0, 0, 0, 0,
            1, 1, 1, 1, 1,
            0, 0, 0, 0, 0,
            0, 0, 0, 0, 0
        ],
        [0, 0, 1, 0, 0,
            0, 0, 1, 0, 0,
            1, 1, 1, 1, 1,
            0, 0, 0, 0, 0,
            0, 0, 0, 0, 0
        ],
        [0, 0, 1, 0, 0,
            0, 0, 1, 0, 0,
            0, 0, 1, 1, 1,
            0, 0, 1, 0, 0,
            0, 0, 1, 0, 0
        ],
        [0, 0, 1, 0, 0,
            0, 0, 1, 0, 0,
            1, 1, 1, 0, 0,
            0, 0, 1, 0, 0,
            0, 0, 1, 0, 0
        ],
        [   0, 0, 0, 0, 0,
            0, 0, 0, 0, 0,
            1, 1, 1, 1, 1,
            0, 0, 1, 0, 0,
            0, 0, 1, 0, 0
        ],
        [   0, 0, 1, 0, 0,
            0, 0, 1, 0, 0,
            0, 0, 1, 0, 0,
            0, 0, 0, 0, 0,
            0, 0, 0, 0, 0
        ],
        [   0, 0, 0, 0, 0,
            0, 0, 0, 0, 0,
            0, 0, 1, 0, 0,
            0, 0, 1, 0, 0,
            0, 0, 1, 0, 0
        ],
        [   0, 0, 0, 0, 0,
            0, 0, 0, 0, 0,
            1, 1, 1, 0, 0,
            0, 0, 0, 0, 0,
            0, 0, 0, 0, 0
        ],
        [   0, 0, 0, 0, 0,
            0, 0, 0, 0, 0,
            0, 0, 1, 1, 1,
            0, 0, 0, 0, 0,
            0, 0, 0, 0, 0
        ]

    ];

        var g_ball_num = G_BALL_TBL_ARR.length;
        var g_ball_const = g_ball_num;


    // シーンの設定										
    var core = new Core(G_SCREEN_WIDTH, G_SCREEN_HEIGHT);


    core.preload(
            IMAGES_PATH + SPRITE_BGROUND_IMG,
            IMAGES_PATH + SPRITE_BGROUND_MASK,
            IMAGES_PATH + SPRITE_BALL_IMG,
            IMAGES_PATH + SPRITE_BALL_GROW_IMG,
            IMAGES_PATH + SPRITE_CUBE_IMG,
            IMAGES_PATH + SPRITE_PHY_BLOCK_IMG,
            IMAGES_PATH + JUMP_TEXT_IMG,
            IMAGES_PATH + PAUSE_BUTTON_IMG,
            IMAGES_PATH + PLAY_BUTTON_IMG,
            IMAGES_PATH + MENU_BUTTON_IMG,
            IMAGES_PATH + CELL_PATH + "k.png",		//画像纏めてスプライト化すべきだが？
            IMAGES_PATH + CELL_PATH + "co01.png",
            IMAGES_PATH + CELL_PATH + "co02.png",
            IMAGES_PATH + CELL_PATH + "co03.png",
            IMAGES_PATH + CELL_PATH + "co04.png",
            IMAGES_PATH + CELL_PATH + "cr01.png",
            IMAGES_PATH + CELL_PATH + "li01.png",
            IMAGES_PATH + CELL_PATH + "li02.png",
            IMAGES_PATH + CELL_PATH + "t01.png",
            IMAGES_PATH + CELL_PATH + "t02.png",
            IMAGES_PATH + CELL_PATH + "t03.png",
            IMAGES_PATH + CELL_PATH + "t04.png",
            IMAGES_PATH + CELL_PATH + "li01_u.png",
            IMAGES_PATH + CELL_PATH + "li01_d.png",
            IMAGES_PATH + CELL_PATH + "li02_l.png",
            IMAGES_PATH + CELL_PATH + "li02_r.png",

            // ステージクリア のアイコン
            IMAGES_PATH + STAR_RED_BUTTON, //jump
            IMAGES_PATH + STAR_YELLOW_BUTTON, //rotate
            IMAGES_PATH + STAR_BLUE_BUTTON, //time
            //
            IMAGES_PATH + STAR_RED_ICON, //jump
            IMAGES_PATH + STAR_YELLOW_ICON, //rotate
            IMAGES_PATH + STAR_BLUE_ICON, //time
            IMAGES_PATH + IMAGE_MENU_BUTTON, //jump
            IMAGES_PATH + IMAGE_NEXT_BUTTON, //rotate
            IMAGES_PATH + IMAGE_PRE_BUTTON, //time
            IMAGES_PATH + IMAGE_RETRY_BUTTON,
            IMAGES_PATH + IMAGE_BACKGROUND_BOTTOM,
            IMAGES_PATH + IMAGE_ALERT_MSG,
            IMAGES_PATH + STAR_DUST_IMG,
			// SOUND			WindowsのSafariだと正常に読めない！
			SOUND_FADEIN,
			SOUND_FADEOUT,
			SOUND_CLEAR,
			SOUND_LEVELUP,
			SOUND_JUMP,
			SOUND_CUBE,
		   SOUND_BGM

            );


    core.fps = FRAME_RATE;
    // 変数
    var jump_cnt = 0;
    var rotate_cnt = 0;
    var start_frame = 0;

    var g_pause_cnt = 0; //ポーズ時間だけ補正

    var g_jump_flg = false; //　ジャンプ中？


    var Gravity_x = 0.0;
    var Gravity_y = 9.8;
    var Gravity_z = 0.0;
    var G_force = 10;


    //  傾きを正規化して 0,1,2,3,4の値にする
    var Gravity_unit = -1;


    //  傾きを正規化して 0,1,2,3,4の値にする
    function gravity_unit(x, y) {
        if (Math.abs(y) < Math.abs(x)) {
            if (x) {
                return 1;
            } else {
                return 3;
            }
        } else {
            if (y) {
                return 0;
            } else {
                return 2;
            }
        }
    }

    /**--------------------------------
     スプライトクラス	
     ----------------------------------**/

    // titleBgroud
    // 背景
    var TitleBgroud = Class.create(Sprite, {
        initialize: function(x, y) {
            Sprite.call(this, G_SCREEN_WIDTH, G_SCREEN_HEIGHT);
            this.x = x;
            this.y = y;
            this.frame = 0;
            this.image = core.assets[IMAGES_PATH + SPRITE_BGROUND_IMG];
            core.rootScene.addChild(this);
        }
    });


    // 背景
    var MaskBgroud = Class.create(Sprite, {
        initialize: function(x, y) {
            Sprite.call(this, 108, 148);
            this.x = x;
            this.y = y;
            this.scale(10, 11);
            this.opacity = 0.4;
            this.frame = 0;
            this.image = core.assets[IMAGES_PATH + SPRITE_BGROUND_MASK];
            core.rootScene.addChild(this);
        }
    });


    var Menu_Sprite_BUTTON = Class.create({
        initialize: function(x, y, n, link, title) {
			this.group = new Group();
			this.group.x=x;
			this.group.y=y;

	    	this.cnt = core.frame;
            this.link = link;
            this.title = title;
            
            this.image = new Sprite(140,140);
            this.image.moveTo(0,0);
            this.image.image = core.assets[IMAGES_PATH + MENU_BUTTON_IMG];
            this.image.frame = n;
            this.image.on('touchstart', function() {
                this.image.y += 4;
            });
            this.image.on('touchend', function() {
                this.image.y -= 4;
                g_pause = !g_pause;
                if ( link != "" ) {
                   location.href = link;
                }
                this.cnt = core.frame
            });
            this.group.addChild(this.image);

            // 
			this.vtitle = new Label();
			this.vtitle.font = "32px Palatino";
			this.vtitle.moveTo(28,152);
			this.vtitle.text = title;
			this.vtitle.color = "#fff";
            this.group.addChild(this.vtitle);

            core.rootScene.addChild(this.group);
            //

        },
        moveTo: function(x, y) {
			this.group.moveTo(x,y);

		}

    });



    var MenuButton = Class.create(Sprite, {
        initialize: function(x, y, link, title, image, scne) {
            // グループ用オブジェクト
            var group = new Group();
            Sprite.call(this, 140, 140);
            this.x = x;
            this.y = y;
            this.frame = 0;
            this.image = core.assets[IMAGES_PATH + image ];
            // グループ化する
            group.addChild(this);
            // 
            var vtitle = new Label();
            vtitle.font = "42px Palatino";
            vtitle.x = this.x + 20;
            vtitle.y = this.y + 150;
            vtitle.text = title;
            vtitle.color = "#fff";
            group.addChild(vtitle);

            scne.addChild(group);

            this.on('touchstart', function() {
                this.y += 3;
            });
            this.on('touchend', function() {
                this.y -= 3;
                location.href = link;
            });

        }
    });

    var LabelText = Class.create(Label, {
        initialize: function(x, y, title) {
            // ラベル
            Label.call(this, title);
            this.x = x;
            this.y = y;
            this.font = "56px cursive";
            this.color = '#fff';
            this.text = title;
            core.rootScene.addChild(this);
        }
    });

    var StarIconSmall = Class.create(Sprite, {
        initialize: function(x, y, image) {
            // グループ用オブジェクト
            var group = new Group();
            Sprite.call(this, 64, 64);
            this.x = x;
            this.y = y;
            this.frame = 0;
            this.image = core.assets[IMAGES_PATH + image ];
            core.rootScene.addChild(this);
        }
    });





    var StarIcon = Class.create(Sprite, {
        initialize: function(x, y, title, image, scne) {
            // グループ用オブジェクト
            var group = new Group();
            Sprite.call(this, 203, 203);
            this.x = x;
            this.y = y;
            this.value1 = "";

            this.frame = 0;
            this.image = core.assets[IMAGES_PATH + image ];

            this.scale(0.6, 0.6);
            // グループ化する
            group.addChild(this);
            // 
            var vtitle = new Label();
            vtitle.font = "64px Palatino";
            vtitle.x = this.x + 180;
            vtitle.y = this.y + 60;
            vtitle.text = title;
			vtitle.width=400;
            vtitle.color = "#fff";
            this.text = vtitle;
            group.addChild(vtitle);


            var vtitle1 = new Label("");
            vtitle1.font = "64px Palatino";
            vtitle1.x = this.x + 180;
            vtitle1.y = this.y + 120;
			vtitle1.width=400;
            vtitle1.color = "#fff";
            this.value1 = vtitle1;
            group.addChild(vtitle1);

            if (scne) {
                scne.addChild(group);
            }


            this.on('touchstart', function() {
                this.y += 3;
            });

            this.on('touchend', function() {
                this.y -= 3;
            });

        },
        label: function(title) {
            this.text.text = title;
        },
        value: function(value) {
            this.value1.text = value;
        }



    });

/*----
	// 物理演算はしないのでコメント化
    // ボール
    var BallSprite = Class.create(PhyCircleSprite, {
        initialize: function(x, y) {
            PhyCircleSprite.call(this, BALL_RADIUS, STATIC_SPRITE, 2.0, 0.1, 0.2, true);
            this.cnt = 0;
            this.iv = rand(30) + 5;
            this.x = x;
            this.y = y;
            this.frame = 0;
            this.image = core.assets[IMAGES_PATH + SPRITE_BALL_IMG];
            core.rootScene.addChild(this);

            this.on('enterframe', function() {
                this.cnt = (this.cnt + 1) % this.iv;
                if (this.cnt > (this.iv / 2)) {
                    this.opacity = 0.75;
                } else {
                    this.opacity = 1.0;
                }
            });
        }
    });
--*/
    // ボール
    var BallSprite = Class.create(Sprite, {
        initialize: function(x, y) {
            Sprite.call(this, BALL_RADIUS*2, BALL_RADIUS*2);
            this.cnt = 0;
            this.iv = rand(30) + 5;
            this.x = x;
            this.y = y;
            this.frame = 0;
            this.image = core.assets[IMAGES_PATH + SPRITE_BALL_IMG];
            core.rootScene.addChild(this);

            this.on('enterframe', function() {
                this.cnt = (this.cnt + 1) % this.iv;
                if (this.cnt > (this.iv / 2)) {
                    this.opacity = 0.75;
                } else {
                    this.opacity = 1.0;
                }
            });
        }
    });

    // CUBE
    var CubeSprite = Class.create(PhyBoxSprite, {
        initialize: function(x, y) {
            PhyBoxSprite.call(this, CUBE_SIZE_WIDTH, CUBE_SIZE_HEIGHT, DYNAMIC_SPRITE, 5.0, 0.12, 0.40, true);
            this.jumpEnable = true;
            this.cnt = 0;
            this.j_wait = 0;
            this.x = x;
            this.y = y;
            this.jump_flg = false;
            this.step = 2.7;
            this.setDegugImage(true);
            this.frame = 0;
            this.scale(0.96,0.96);
            this.image = core.assets[IMAGES_PATH + SPRITE_CUBE_IMG];
            this.opacity = 0;
            core.rootScene.addChild(this);

            this.grow = new Sprite(250, 250);
            this.grow.x = this.x + 38 - (250 / 2);
            this.grow.y = this.y + 38 - (250 / 2);
            this.grow.opacity = 0.1;
            this.grow.scale(2.5, 2.5);
            this.grow.image = core.assets[IMAGES_PATH + SPRITE_BALL_GROW_IMG];
            core.rootScene.addChild(this.grow);

            this.on('enterframe', function() {
				this.j_wait++;
				if(this.jumpEnable === false &&  this.j_wait>20){
					this.jumpEnable = true;
				}
				
                this.grow.x = this.x + 38 - (250 / 2);
                this.grow.y = this.y + 38 - (250 / 2);

                if (g_state === GAME_STATUS_PAUSE) {
                    this.grow.opacity = 0.0;
                    return;
                }

                this.cnt = (this.cnt + 1) % 60;
                if (this.cnt > 30) {
                    this.opacity = 0.78;
                    this.grow.opacity = 0.098;
                    this.grow.tl.rotateBy(3600, 6);
                } else {
                    this.opacity = 1.0;
                    this.grow.opacity = 0.05;
                    this.grow.tl.rotateBy(-360, 6);
                }

                this.angle = 0;		// 回転無効
                if (this.jump_flg && g_jump_flg === true) {
                    var tmp_flg = false;
                    if (Gravity_x > 5) {
                        this.x = this.x + this.dx;
                        this.dx -= this.step;
                        tmp_flg = true;
                    } else if (Gravity_x < -5) {
                        this.x = this.x - this.dx;
                        this.dx -= this.step;
                        tmp_flg = true;
                    }

                    if (Gravity_y > 5) {
                        this.y = this.y - this.dy;
                        this.dy -= this.step;
                        tmp_flg = true;
                    } else if (Gravity_y < -5) {
                        this.y = this.y + this.dy;
                        this.dy -= this.step;
                        tmp_flg = true;
                    }
                    // 通常状態に戻る 
                    if ((this.dy < 0 || this.dx < 0) || tmp_flg == false) {
                        this.setAwake(true);
                        g_jump_flg = false;
//                      console.log("this.setAwake(true)");
                        this.jump_flg = false;
                        this.active = true;
                    }

                    return;
                }

                var vecter = new b2Vec2(-(Gravity_x * GARVITY_FORCE_FACTOR), Gravity_y * GARVITY_FORCE_FACTOR);	//
                this.applyImpulse(vecter);
            });

        }
    });

    var Ball_Hit = Class.create({
        initialize: function(x, y) {
			var cnt = 20;
		    var sprite = [];
			var group = new Group();
			group.x=x;
			group.y=y;
			group.originX =BALL_RADIUS   ;
			group.originY =BALL_RADIUS  ;

			var t_cnt = 0;


			// グループにスプライトを追加
			for (var i=0; i<6 ; i++) {
			    var rad = Math.PI*2/6*i;
			    var x1 = Math.sin(rad) * 32 +BALL_RADIUS -14  ;
			    var y1 = Math.cos(rad) * 32 +BALL_RADIUS -14 ;
			    sprite[i] = new Sprite(28, 28);
			    sprite[i].image =  core.assets[ IMAGES_PATH + STAR_DUST_IMG];
//			    sprite[i].moveTo( this.group.x+x,  this.group.y+y);
			    sprite[i].moveTo( x1, y1);
			    group.addChild(sprite[i]);
			}



            group.onenterframe = function() {
				t_cnt +=1;
				cnt--;
				if( cnt !=0){
					for (var i=0; i<6 ; i++) {
					    sprite[i].opacity =  (cnt/20);
					}

					group.rotation +=30;
					group.x += 10-rand(20) ;
					group.y += 10-rand(20) ;

					group.scaleX += 0.05;
					group.scaleY += 0.05;

				} else {
					//this.group.removeEventListener("enterframe", touchFunc);
			        core.rootScene.removeChild(group);
					g_ball_num--;
				}
            };
            core.rootScene.addChild(group);

        }

    });




    core.onload = function() {
		enchant.Sound.enabledInMobileSafari = true;	// 
       
        var world = new PhysicsWorld(0, 0);
        var gameConfig = new GameConfig();

        var cubeSprite;
        var ball_arr = [];
        g_state = GAME_STATUS_READY;
        var v_pause = g_pause;
        var menu_button;
        var next_button;
        var pause_button;
		// 認証チェック
		if(gameConfig.checkAuth() === false ){
        //            location.href = 'index.html';
		}



        //背景
        var titleBgroud = new TitleBgroud(0, 0);
        // ステージ作成
        var cell_arr = [];
        for (var y = 0; y < 16; y++) {
            for (var x = 0; x < 9; x++) {
                cell_arr[y * 9 + x] = new Sprite(120, 120);
                var i = MAP_TBL_ARR[y * 9 + x];
                cell_arr[y * 9 + x].image = core.assets[IMAGES_PATH + CELL_PATH + BLOCK_PTN_ARR[i] ];
                cell_arr[y * 9 + x].x = x * 120;
                cell_arr[y * 9 + x].y = y * 120;
                core.rootScene.addChild(cell_arr[y * 9 + x]);
            }

        }

        // 壁(隠し)　物理的な壁を作成
        var phycell_arr = [];
        var phycell_cnt = 0;
        for (var y = 0; y < 16; y++) {
            for (var x = 0; x < 9; x++) {
                var i = MAP_TBL_ARR[y * 9 + x];
                if (i !== 0) {
                    for (var yy = 0; yy < 5; yy++) {
                        for (var xx = 0; xx < 5; xx++) {
                            var flg = BLOCK_WALL_TBL_ARR[i][xx + yy * 5];
                            if (flg === 1) {
                                phycell_arr[phycell_cnt] = new PhyBoxSprite(23, 23, STATIC_SPRITE, 1.0, 0.095, 0.5, true);
                                phycell_arr[phycell_cnt].x = x * 120 + xx * 24;
                                phycell_arr[phycell_cnt].y = y * 120 + yy * 24;
                                phycell_arr[phycell_cnt].image = core.assets[IMAGES_PATH + SPRITE_PHY_BLOCK_IMG ];
                                core.rootScene.addChild(phycell_arr[phycell_cnt]);
                                phycell_cnt++;
                            }
                        }
                    }
                }
            }
        }


        // ラベル
        var label_LEVEL = new LabelText(30, 26, "レベル");

        // レベル　数字        
        var label_NUM = new LabelText(40, 90, gameConfig.level + 1);

        // タイム
        var label_time = new LabelText(290, 26, "タイム");

        // タイム
        var label_time_cnt = new LabelText(300, 90, "0.0/"+ gameConfig.time +".0");

        // ジャンプ
        var label_jump_title = new LabelText(560, 26, "ジャンプ");
        var label_jump_cnt = new LabelText(570, 90, "0/" + gameConfig.jump);

        // 回転
        var label_rotate_title = new LabelText(860, 26, "回転");
        var label_rotate_cnt = new LabelText(870, 90, "0/" + gameConfig.rotate);

        // クリア済みかチェック
        if (gameConfig.getStatusJump("") === 1) {
            var starIcon_s1 = new StarIconSmall(492, 34, STAR_RED_ICON);		// jump
        }
        if (gameConfig.getStatusRotate("") === 1) {
            var starIcon_s2 = new StarIconSmall(792, 34, STAR_YELLOW_ICON);	//rotate
        }
        if (gameConfig.getStatusTime("") === 1) {
            var starIcon_s3 = new StarIconSmall(212, 34, STAR_BLUE_ICON);		//time
        }
		//


        // 画面外にする
        menu_button = new Menu_Sprite_BUTTON(1300, 1600, MENU_ICON_LEVEL, G_MENU_URL, "レベル");
        next_button = new Menu_Sprite_BUTTON(1300, 1600, MENU_ICON_NEXT, gameConfig.next_url + ".html", "次へ");
        if (!(gameConfig.getStage() > gameConfig.stage || gameConfig.getLevel() > gameConfig.level)) {
            next_button.opacity = 0;
        }
        retry_button = new Menu_Sprite_BUTTON(1300, 1600, MENU_ICON_RETRY, gameConfig.filename + ".html", "リトライ");
        play_button = new Menu_Sprite_BUTTON(-180, 1600, MENU_ICON_PLAY, "", "プレイ");
        pause_button = new Menu_Sprite_BUTTON(130, 1600, MENU_ICON_PAUSE, "", "");
        var maskBgroud = new MaskBgroud(480, 620); // マスク
        maskBgroud.opacity = 0.0;


	    var hintLabel=  new(Label)
            hintLabel.x = 360;
            hintLabel.y = 480;
            hintLabel.font = "48px cursive";
            hintLabel.color = '#ffe';
            hintLabel.text = gameConfig.hint;
            hintLabel.width = 600;
            core.rootScene.addChild(hintLabel);


        //ボール生成
        for (var i = 0; i < g_ball_num; i++) {
            ball_arr[i] = new BallSprite(G_BALL_TBL_ARR[i][0] * 120 + 80, G_BALL_TBL_ARR[i][1] * 120 + 80);
        }
        //


        /*------------------------
         * ステージクリアのシーン
         --------------------------*/
        var stageClear = new Scene();
        stageClear.backgroundColor = "#000000";

        // 背景
        var bg_image = new Sprite(1080, 695);
        bg_image.x = 0;
        bg_image.y = 1225;
        bg_image.frame = 1;
        bg_image.image = core.assets[IMAGES_PATH + IMAGE_BACKGROUND_BOTTOM];
        stageClear.addChild(bg_image);

        // シーンにメッセージを登録
        var clearMessage = new Label("");
        clearMessage.font = "80px cursive";
        clearMessage.x = 120;
        clearMessage.y = 180;
        clearMessage.width = 1080;
        clearMessage.color = "#fff";
        clearMessage.text = "レベル" + (gameConfig.level + 1) + " Complete";

        stageClear.addChild(clearMessage);

        var menuButton1 = new MenuButton(470, 1548, G_MENU_URL, "MENU", IMAGE_MENU_BUTTON, stageClear);

        var menuButton2 = new MenuButton(810, 1548, gameConfig.next_url + ".html", "次へ", IMAGE_NEXT_BUTTON, stageClear);

        var menuButton3 = new MenuButton(130, 1548, gameConfig.filename + ".html", "リトライ", IMAGE_RETRY_BUTTON, stageClear);


        var starIcon1 = new StarIcon(240, 648, "ジャンプ ", STAR_RED_BUTTON, stageClear);   // jump
        var starIcon2 = new StarIcon(240, 868, "回転 ", STAR_YELLOW_BUTTON, stageClear); ///rotate
        var starIcon3 = new StarIcon(240, 428, "タイム ", STAR_BLUE_BUTTON, stageClear);   //time
		//


		if( parseInt( gameConfig.getSound() ) === 0 ){
				 core.assets[SOUND_FADEIN].clone().play(); //ステージ開始時　音
		} 

		var BGM=core.assets[SOUND_BGM]; //

			//BGM
			if( parseInt( gameConfig.getSound() ) === 0 ){
				   BGM.play();
				   BGM.src.loop =true;
			} 

		// 画面アスペクトチェック
        var width = window.innerWidth;
        var height = window.innerHeight;
        console.log("横:" + width + "縦:" + height);
        if (width > height) {
            var alartText = new Label();
            alartText.font = "36px Palatino";
            alartText.x = 200;
            alartText.y = 250;
            alartText.text = "縦長画面にして、自動画面回転はOFFにしてください。";
            alartText.width = 800;
            alartText.color = "#fff";
            core.rootScene.addChild(alartText);
        }

        var Bright_cnt = 0;

        //イベントハンドラー
        // 加速度センサー
        window.addEventListener("devicemotion", function(evt) {
            if ((navigator.userAgent.indexOf('iPhone') > 0 || navigator.userAgent.indexOf('iPad') > 0)) {
                Gravity_x = -evt.accelerationIncludingGravity.x;
                Gravity_y = -evt.accelerationIncludingGravity.y; //縦方法の傾斜
                Gravity_z = -evt.accelerationIncludingGravity.z; //上下方向の傾斜
            } else {
                Gravity_x = evt.accelerationIncludingGravity.x;
                Gravity_y = evt.accelerationIncludingGravity.y; //縦方法の傾斜
                Gravity_z = evt.accelerationIncludingGravity.z; //上下方向の傾斜
            }
            var i = Gravity_unit;
            Gravity_unit = gravity_unit(Gravity_x, Gravity_y);
            if (Gravity_unit !== i && g_pause ==false && g_state === GAME_STATUS_PLAY) {
                rotate_cnt++;
                label_rotate_cnt.text = rotate_cnt + "/" + gameConfig.rotate;
            }
        }, false);

        // フレーム毎に発生
        core.rootScene.addEventListener('enterframe', function(e) {

            if (g_pause !== true && g_jump_flg === false) {
                world.step(core.fps);
            } else if (g_state === GAME_STATUS_PLAY) {
                g_pause_cnt++;  // ポーズ時間分補正
            }
            if (v_pause !== g_pause) {
                if (g_pause) {

                    retry_button.moveTo(380,1600);
                    menu_button.moveTo(640,1600);

                    if ((gameConfig.getStage() > gameConfig.stage || gameConfig.getLevel() > gameConfig.level)) {
                        next_button.moveTo(880,1600);
                    }

                    play_button.moveTo(130,1600);
                    pause_button.moveTo(-180,1600);
                    maskBgroud.opacity = 0.38;

                } else {

                    retry_button.moveTo(1600,1600);
                    menu_button.moveTo(1600,1600);

                    next_button.moveTo(1600,1600);

                    play_button.moveTo(-240,1600);

                    pause_button.moveTo(130,1600);

                    maskBgroud.opacity = 0.0;
                }
            }


            Bright_cnt = (Bright_cnt + 1) % 20;
            if (Bright_cnt > 10) {
                titleBgroud.opacity = 0.84;
            } else {
                titleBgroud.opacity = 1.0;
            }

            // 
            if (g_state === GAME_STATUS_PLAY) {
				//
                if (cubeSprite.x < G_GAME_SCREEN_X1 || cubeSprite.x > G_GAME_SCREEN_X2 ||
                        cubeSprite.y < G_GAME_SCREEN_Y1 || cubeSprite.y > G_GAME_SCREEN_Y2
                        ) {
                    // ボールが画面外なら強制終了
                    location.href = gameConfig.filename + ".html";
                }
 				/*--
                cubeSprite.contact(function(sprite) {
                    if (Math.abs(Gravity_y) > Math.abs(Gravity_x)) {
                        if (Gravity_y > 0) {
                            if ((sprite.y - cubeSprite.y) > 0) {
                                cubeSprite.jumpEnable = true;
                                //console.log("Y:"+ cubeSprite.y +"y:" +sprite.y +"name " + sprite.image);
                            }
                        } else {
                            if ((cubeSprite.y - sprite.y) > 0) {
                                cubeSprite.jumpEnable = true;
                            }
                        }
                    } else {
                        if (Gravity_x > 0) {
                            if ((sprite.x - cubeSprite.x) > 0) {
                                cubeSprite.jumpEnable = true;
                            }
                        } else {
                            if ((cubeSprite.x - sprite.x) > 0) {
                                cubeSprite.jumpEnable = true;
                            }
                        }
                    }

                }, 40);
				--*/ 
				
                //　ボール当たり判定
                for (i = 0; i < g_ball_const; i++) {
                    if (ball_arr[i]) {
                        //console.log("玉：　"+  Math.abs((ball_arr[i].x ) - cubeSprite.x+(CUBE_SIZE_WIDTH/2)));
                        if (Math.abs(ball_arr[i].x - cubeSprite.x) < (CUBE_SIZE_WIDTH/2 ) &&
                                Math.abs(ball_arr[i].y - cubeSprite.y) < (CUBE_SIZE_HEIGHT/2 )
                                ) {
				            core.rootScene.removeChild(ball_arr[i]);
						    var ball_hit= new  Ball_Hit(ball_arr[i].x,ball_arr[i].y);


                            ball_arr[i] = false;

                            //g_ball_num--;
                            console.log("玉：　" + g_ball_num + ":" + i);
						if( parseInt( gameConfig.getSound() ) === 0 ){
								core.assets[SOUND_FADEOUT].clone().play(); //光の玉を消した時　音
							} 

                        }
                        /* 壁に接している場合当たり判定がおかしいのでコメント化
                         if (cubeSprite.intersect(ball_arr[i])) {
                         ball_arr[i].destroy();
                         ball_arr[i] = false;
                         g_ball_num--;
                         //console.log("玉：　" + g_ball_num + ":" + i);
                         }
                         */
                    }
                }

            }

            // 時間表示
            if (g_state == GAME_STATUS_PLAY && g_pause != true) {
                var gameTime = (core.frame - start_frame - g_pause_cnt) / core.fps;
                label_time_cnt.text = gameTime.toFixed(1) + "/" + gameConfig.time;
            }
            //ジャンプ回数
            label_jump_cnt.text = jump_cnt + "/" + gameConfig.jump;

            // クリア
            if (g_ball_num === 0) {

				if( parseInt( gameConfig.getSound() ) === 0 ){
					   BGM.stop();
				} 

            	sleep(200);
				if( parseInt( gameConfig.getSound() ) === 0 ){
					core.assets[SOUND_CLEAR].clone().play(); //クリア　音		
				} 
  
  		
                starIcon1.label("ジャンプ ");
                starIcon1.value( jump_cnt + "/" + gameConfig.jump);

                starIcon2.label("回転 " );
                starIcon2.value( rotate_cnt + "/" + gameConfig.rotate);

                starIcon3.label("タイム ");
                starIcon3.value( Math.floor(core.frame / core.fps) + "/" + gameConfig.time +".0");


                if (!(gameConfig.getStage() > gameConfig.stage || gameConfig.getLevel() > gameConfig.level)) {
	                   menuButton2.y = 1548;
                }
                gameConfig.setLevel(gameConfig.level + 1); // Level UP

                var all_clear = 0;
                // 各条件クリア？
                if (gameConfig.jump >= jump_cnt) {
                    all_clear++;
                    gameConfig.setStatusJump(gameConfig.key, 1);
                }
                if (gameConfig.rotate >= rotate_cnt) {
                    all_clear++;
                    gameConfig.setStatusRotate(gameConfig.key, 1);
                }
                if (gameConfig.time >= gameTime) {
                    all_clear++;
                    gameConfig.setStatusTime(gameConfig.key, 1);
                }
                if (all_clear === 3) {
				if( parseInt(gameConfig.getSound()) === 0){
		                core.assets[SOUND_LEVELUP].clone().play(); //タイム」と「ジャンプ」と「回転」の条件を満たした時 　音
				} 

//                    gameConfig.setLevel(gameConfig.level + 1); // Level UP
                    //全ステージクリアかチェックする。
                    if (gameConfig.last=== true) {  //　最終レベル
                        //`ラストレベルで全クリアならステージアップする。
                        if (gameConfig.checkStageClear() === true) {
                            if (gameConfig.getStage() === gameConfig.stage) {
								var i =gameConfig.getStage();
								if(i <7)  i++;
                                gameConfig.setStage(i); //stage UP 
                                gameConfig.setLevel(2);
                            }
                        }
                    }
                }

                core.pushScene(stageClear);
            }
            v_pause = g_pause;


			//BGM
			if( parseInt( gameConfig.getSound() ) === 0 ){
//					   BGM.play();			 
			} 


        });
//--------		

        // タッチ
        core.rootScene.addEventListener('touchstart', function(e) {

        });

        // タッチ
        core.rootScene.addEventListener('touchend', function(e) {
            //初回タッチ　キューブ生成
            if (g_state == GAME_STATUS_READY && g_pause ===false ) {
                if (e.y < 1500) {
                    cubeSprite = new CubeSprite(e.x, e.y);

				if( parseInt( gameConfig.getSound() ) === 0 ){
	                core.assets[SOUND_CUBE].clone().play(); //
				  }	
                    //
                    g_state = GAME_STATUS_PLAY;	// 　ゲームスタート


                    start_frame = core.frame;

                    if (alartText) {
                        core.rootScene.removeChild(alartText);
                    }
                    if (hintLabel) {
                        core.rootScene.removeChild(hintLabel);
                    }
                }
            } else {
                //jump
				if( g_pause ===false){
	                if ((e.y < 1580 && cubeSprite.jump_flg == false && cubeSprite.jumpEnable == true   ) && (core.frame - start_frame) > (core.fps / 3)) {
	                    cubeSprite.jumpEnable = false;
	                    cubeSprite.dx = G_JUMP_FACTOR;
	                    cubeSprite.dy = G_JUMP_FACTOR;
	                    cubeSprite.jump_flg = true;
	                    cubeSprite.j_wait = 0;
	                    cubeSprite.setAwake(false);
	                    g_jump_flg = true;
	                    jump_cnt++;
						if( parseInt( gameConfig.getSound() ) === 0 ){
			                core.assets[SOUND_JUMP].clone().play(); //ジャンプ　音
						  }	
	                }
				}
                //var vecter = new b2Vec2(0, -300);
                //cubeSprite.applyImpulse(vecter);
            }

        });

    };

    // ゲームスタート
    core.start();
};
