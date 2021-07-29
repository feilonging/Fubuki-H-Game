//=============================================================================
// NekoGakuen_GifPicture.js
// Version: 1.2
//=============================================================================
/*:
 * @plugindesc 對話動態圖片
 * @author Mirai
 * @help
 * 
 * ─ 插件簡介 ─
 * 在RPG Maker MV中用來顯示動態的Gif圖檔的簡易插件。
 * 
 * 
 * ─ 更新履歷 ─
 * V1.2 將部分的程式碼最佳化處理以及修正選單開啟時的錯誤
 * V1.1 更新插件說明及部分程式碼
 * V1.1 更新插件說明及部分程式碼
 * V1.0 初次版本的插件發佈
 * 
 * 
 * ─ 使用說明 ─
 * 1.在RPG Maker MV的「插件管理器」之中載入本插件，
 *   並在本插件的「參數」區塊設定即可。
 * 2.在RPG Maker MV上設置事件點內容時，
 *   新增第三頁之高級區塊裡的「插件命令...」或「腳本...」，
 *   並輸入以下的「插件/腳本指令」即可。
 * 
 * ※ 注意事項(重要)
 * 本插件為減緩RPG Maker MV遊戲效能，目前只設定最多顯示一張Gif圖檔，
 * 如要更改圖片時，先將目前呼叫的Gif圖檔給清除掉才能再次呼叫，
 * 將Gif圖檔放在img/pictures/資料夾內即可。
 * 
 * 
 * ─ 插件/腳本指令 ─
 * 
 * 【顯示Gif圖片】
 * --說明：顯示Gif圖片的指令，例如Gif Pic_Show 666 128 72 56 65，666為放在img/pictures/資料夾的666.gif的檔名，
 *        128為666.gif的圖片寬度，72為666.gif的圖片高度，56為圖片在畫面的X座標，65為圖片在畫面的Y座標，以此類推。
 * --插件指令 Gif Pic_Show <圖片檔名> <圖片寬度> <圖片高度> <圖片X座標> <圖片Y座標>
 * --腳本指令 $gameSystem.showgif("<圖片檔名>", <圖片寬度>, <圖片高度>, <圖片X座標>, <圖片Y座標>);
 * 
 * 【顯示Gif圖片(對話框)】
 * --說明：設置Gif圖片的對話框事件的插件指令，但是設置好之後要在對話事件裡加上「\P」才能呼叫顯示，
 *        例如Gif Msg_Show 666 128 72 56 65，666為放在img/pictures/資料夾的666.gif的檔名。
 * --插件指令 Gif Msg_Show <圖片檔名> <圖片寬度> <圖片高度> <圖片X座標> <圖片Y座標>
 * --腳本指令 $gameSystem.msgshowgif("<圖片檔名>", <圖片寬度>, <圖片高度>, <圖片X座標>, <圖片Y座標>);
 * 
 * 【清除Gif圖片】
 * --說明：清除剛剛呼叫的Gif圖片，需要更換Gif圖檔的時候也要先用清除指令來清除目前呼叫的Gif圖檔。
 * --插件指令 Gif Pic_Clear
 * --腳本指令 $gameSystem.cleargif();
 * 
 * 
 * ─ 版權聲明 ─
 * 修改或翻譯本插件無需向作者事前告知，但修改後的版本禁止再次發佈。
 * 如果官方的版本有BUG，可以跟作者回報。
 * 
 * 禁止利用本插件進行非法販售及詐騙。
 * 作者只單純提供此插件，如有問題請使用者自負所有法律責任。
 * 本插件著作權為貓咪學園(Neko Gakuen)的程式人員Mirai(快閃小強)所有。
 * 
 * --------------------
 * -來源標示：【△ 不需要，但有的話會很感謝】
 * -授權方式：【√ 免費】
 * -商業營利：【√ 允許】
 * -改作許可：【√ 允許】
 * -二次配佈：【× 禁止】
 * -成人用途：【√ 允許】
 * -使用範圍：【※ 僅RPG Maker系列】
 * --------------------
 * 
 */
//=============================================================================

(function () {

    var NekoGakuen = NekoGakuen || {};
    NekoGakuen.GifPicture = {};
    NekoGakuen.GifPicture.Enable = true;
    NekoGakuen.GifPicture.Parameters = PluginManager.parameters('NekoGakuen_GifPicture');
    NekoGakuen.GifPicture.Gif_X;
    NekoGakuen.GifPicture.Gif_Y;
    NekoGakuen.GifPicture.gifswitch = false;
    NekoGakuen.GifPicture._Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;

    Game_Interpreter.prototype.pluginCommand = function (command, args) {
        NekoGakuen.GifPicture._Game_Interpreter_pluginCommand.call(this, command, args);
        if (command === 'Gif') {
            switch (args[0]) {
                case 'Pic_Show':
                    $gameSystem.showgif(args[1], parseFloat(args[2]), parseFloat(args[3]), parseFloat(args[4]), parseFloat(args[5]));
                    break;
                case 'Msg_Show':
                    $gameSystem.msgshowgif(args[1], parseFloat(args[2]), parseFloat(args[3]), parseFloat(args[4]), parseFloat(args[5]));
                    break;
                case 'Pic_Clear':
                    $gameSystem.cleargif();
                    break;
            }
        }
    };

    Game_System.prototype.showgif = function (gif_img, gif_w, gif_h, gif_x, gif_y) {
        if (NekoGakuen.GifPicture.gifswitch != true) {
            NekoGakuen.GifPicture.Gif_X = gif_x;
            NekoGakuen.GifPicture.Gif_Y = gif_y;
            var bd = document.createElement("iframe")
            bd.name = 'bcc';
            bd.id = "bcc";
            bd.src = './img/pictures/' + gif_img + '.gif'; bd.frameBorder = 0; bd.scrolling = 'no'; bd.allowtransparency = 'true';
            bd.style.position = 'fixed';
            bd.style.left = 0;
            bd.style.top = 0;
            bd.style.marginLeft = gif_x + 'px';
            bd.style.marginTop = gif_y + 'px';
            bd.style.width = gif_w + 'px';
            bd.style.height = gif_h + 'px';
            bd.style.transform = 'scale(1.0)';
            bd.style.zIndex = 777;
            document.body.appendChild(bd);
            NekoGakuen.GifPicture.gifswitch = true;
        }
    };

    Game_System.prototype.msgshowgif = function (gif_img, gif_w, gif_h, gif_x, gif_y) {
        if (NekoGakuen.GifPicture.gifswitch != true) {
            NekoGakuen.GifPicture.Gif_X = gif_x;
            NekoGakuen.GifPicture.Gif_Y = gif_y;
            var bd = document.createElement("iframe")
            bd.name = 'bcc';
            bd.id = "bcc";
            bd.src = './img/pictures/' + gif_img + '.gif'; bd.frameBorder = 0; bd.scrolling = 'no'; bd.allowtransparency = 'true';
            bd.style.position = 'fixed';
            bd.style.left = 0;
            bd.style.top = 0;
            bd.style.marginLeft = gif_x + 'px';
            bd.style.marginTop = gif_y + 'px';
            bd.style.width = gif_w + 'px';
            bd.style.height = gif_h + 'px';
            bd.style.transform = 'scale(1.0)';
            bd.style.visibility = 'hidden';
            bd.style.zIndex = 777;
            document.body.appendChild(bd);
            NekoGakuen.GifPicture.gifswitch = true;
        }
    };

    Game_System.prototype.cleargif = function () {
        if (NekoGakuen.GifPicture.gifswitch == true) {
            var div = document.getElementById("bcc");
            document.body.removeChild(div);
            NekoGakuen.GifPicture.gifswitch = false;
        }
    };

    NekoGakuen.GifPicture._Window_Message_processEscapeCharacter = Window_Message.prototype.processEscapeCharacter;
    Window_Message.prototype.processEscapeCharacter = function (code, textState) {
        switch (code) {
            case 'P':
                document.getElementById("bcc").style.visibility = "visible";
                break;
            default:
                NekoGakuen.GifPicture._Window_Message_processEscapeCharacter.apply(this, arguments);
        }
    };

    NekoGakuen.GifPicture._Scene_Title_start = Scene_Title.prototype.start;
    Scene_Title.prototype.start = function () {
        $gameSystem.cleargif();
        NekoGakuen.GifPicture._Scene_Title_start.call(this);
    };

    NekoGakuen.GifPicture._Scene_Gameover_start = Scene_Gameover.prototype.start;
    Scene_Gameover.prototype.start = function () {

        $gameSystem.cleargif();
        NekoGakuen.GifPicture._Scene_Gameover_start.call(this);
    };

    NekoGakuen.GifPicture._Scene_Menu_start = Scene_Menu.prototype.start;
    Scene_Menu.prototype.start = function () {
        $gameSystem.cleargif();
        NekoGakuen.GifPicture._Scene_Menu_start.call(this);
    };

    NekoGakuen.GifPicture._scene_map_update = Scene_Map.prototype.update;
    Scene_Map.prototype.update = function () {
        NekoGakuen.GifPicture._scene_map_update.call(this);
        if (NekoGakuen.GifPicture.gifswitch == true) {
            var game_o_w = SceneManager._screenWidth;
            var game_o_h = SceneManager._screenHeight;
            var w2 = parent.document.getElementById("GameCanvas").style.width;
            var h2 = parent.document.getElementById("GameCanvas").style.height;
            var w = w2;
            var h = h2;
            var w_h_rate = game_o_w / game_o_h;
            var fullh = parseFloat(h);
            var bcalew = "scale(" + parseFloat(w) / game_o_w + ")";
            var bcaleh = "scale(" + fullh / game_o_h + ")";
            var l22 = parseFloat(w) / game_o_w;
            var t22 = fullh / game_o_h;
            var fullrate = parseFloat(w) / fullh;
            var w2g = document.getElementById("GameCanvas").offsetLeft;
            var h2g = document.getElementById("GameCanvas").offsetTop;
            if (fullrate <= w_h_rate) {
                if (parseFloat(w2) < game_o_w) {
                    document.getElementById("bcc").style.transform = bcalew;
                    document.getElementById("bcc").style.transformOrigin = '0% 0%';
                    document.getElementById("bcc").style.left = parseFloat(w2g) + 'px';
                    document.getElementById("bcc").style.top = parseFloat(h2g) + 'px';
                    document.getElementById("bcc").style.marginLeft = parseFloat(NekoGakuen.GifPicture.Gif_X) * l22 + "px";
                    document.getElementById("bcc").style.marginTop = parseFloat(NekoGakuen.GifPicture.Gif_Y) * t22 + "px";
                } else {
                    document.getElementById("bcc").style.transform = bcalew;
                    document.getElementById("bcc").style.transformOrigin = '0% 0%';
                    document.getElementById("bcc").style.left = parseFloat(w2g) + 'px';
                    document.getElementById("bcc").style.top = parseFloat(h2g) + 'px';
                    document.getElementById("bcc").style.marginLeft = parseFloat(NekoGakuen.GifPicture.Gif_X) * l22 + "px";
                    document.getElementById("bcc").style.marginTop = parseFloat(NekoGakuen.GifPicture.Gif_Y) * t22 + "px";
                }
            } else {
                if (parseFloat(h2) < game_o_h) {
                    document.getElementById("bcc").style.transform = bcaleh;
                    document.getElementById("bcc").style.transformOrigin = '0 0%';
                    document.getElementById("bcc").style.left = parseFloat(w2g) + 'px';
                    document.getElementById("bcc").style.top = parseFloat(h2g) + 'px';
                    document.getElementById("bcc").style.marginLeft = parseFloat(NekoGakuen.GifPicture.Gif_X) * l22 + "px";
                    document.getElementById("bcc").style.marginTop = parseFloat(NekoGakuen.GifPicture.Gif_Y) * t22 + "px";
                } else {
                    document.getElementById("bcc").style.transform = bcaleh;
                    document.getElementById("bcc").style.transformOrigin = '0 0%';
                    document.getElementById("bcc").style.left = parseFloat(w2g) + 'px';
                    document.getElementById("bcc").style.top = parseFloat(h2g) + 'px';
                    document.getElementById("bcc").style.marginLeft = parseFloat(NekoGakuen.GifPicture.Gif_X) * l22 + "px";
                    document.getElementById("bcc").style.marginTop = parseFloat(NekoGakuen.GifPicture.Gif_Y) * t22 + "px";
                }
            }
        }
    }

})();

