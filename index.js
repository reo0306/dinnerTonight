'use strict';
var Alexa = require('alexa-sdk');

//=========================================================================================================================================
//TODO: このコメント行より下の項目に注目してください。
//=========================================================================================================================================

//Replace with your app ID (OPTIONAL).  You can find this value at the top of your skill's page on http://developer.amazon.com.  
//Make sure to enclose your value in quotes, like this: var APP_ID = "amzn1.ask.skill.bb4045e6-b3e8-4133-b650-72923c5980f1";
var APP_ID = "amzn1.ask.skill.522a8346-0d1e-45b1-b8e2-6a5c7df56ec2";

var SKILL_NAME = "今日のご飯";
var GET_DINNER_TONIGHT_MESSAGE = "今日のご飯は";
var ASK_MESSAGE = "どうやって食べるのがいいか、決めましょうか。";
var HELP_MESSAGE = "今日のご飯を聞きたい時は「今日のご飯」と、終わりたい時は「おしまい」と言ってください。どうしますか？";
var HELP_REPROMPT = "どうしますか？";
var STOP_MESSAGE = "さようなら";

//=========================================================================================================================================
//「TODO: ここから下のデータを自分用にカスタマイズしてください。」
//=========================================================================================================================================
var meatOrFish = [
    "お肉がいいと思います。",
    "お魚がいいと思います。"
];

var howToFishEat = [
    "刺身",
    "蒲焼き",
    "照り焼き",
    "煮付け",
    "バター焼き",
    "天ぷら",
    "フライ"
];

//=========================================================================================================================================
//この行から下のコードに変更を加えると、スキルが動作しなくなるかもしれません。わかる人のみ変更を加えてください。  
//=========================================================================================================================================
exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'LaunchRequest': function () {
        this.emit('GetDinnerTonightIntent');
    },
    'GetDinnerTonightIntent': function () {
        var foodArr = meatOrFish;
        var foodIndex = Math.floor(Math.random() * foodArr.length);
        var randomFood = foodArr[foodIndex];
        var speechOutput = GET_DINNER_TONIGHT_MESSAGE + randomFood;
        this.emit(':tellWithCard', speechOutput, SKILL_NAME, randomFood)
    },
    'AMAZON.HelpIntent': function () {
        var speechOutput = HELP_MESSAGE;
        var reprompt = HELP_REPROMPT;
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', STOP_MESSAGE);
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', STOP_MESSAGE);
    },
    // 予期せぬ終了
    'SessionEndedRequest': function () {
        // 処理は書かなくてもOKらしいが、書いておく。
        this.emit(':tell', STOP_MESSAGE);
    }, 

    // 予期せぬ発話
    'Unhandled': function () {
        // スピーチアウトプットの設定（Alexa応答設定）
        var speechOutput = HELP_MESSAGE;

        // リプロンプトの設定（聞き直し設定）
        var reprompt = HELP_REPROMPT;

        // ask（Alexa応答＋たずねる）
        this.emit(':ask', speechOutput, reprompt);
    }    
};
