/*
 * EaselJS Text Arc Plugin
 *
 * Copyright (c) 2012 Luca Corbo
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 * This plugin was inspired by:
 * - http://www.html5canvastutorials.com/labs/html5-canvas-text-along-arc-path
 * - http://tympanus.net/codrops/2012/01/24/arctext-js-curving-text-with-css3-and-jquery
 * - https://github.com/CreateJS/EaselJS/blob/master/examples/TextLink.html
 *
 */

this.createjs=this.createjs||{};

(function () {

    // define a new TextArc class that extends Text and drawing arc text.
    var TextArc = function (text, font, color, radius) {
        this.initialize(text, font, color, radius);
    };

    TextArc.prototype = new createjs.Text(); // extend Text.

    // save off initialize method from Text so we can call it from our own:
    TextArc.prototype.Text_initialize = TextArc.prototype.initialize;

    // overwrite Text's initialize method with our own:
    TextArc.prototype.initialize = function (text, font, color, radius) {
        this.Text_initialize(text, font, color);
        this.radius = radius;
        this.textBaseline = "middle";
    };

    // use the same approach with draw:
    TextArc.prototype.Text_drawTextLine = TextArc.prototype._drawTextLine;

    //Override _drawTextLine method
    TextArc.prototype._drawTextLine = function (ctx, text, y) {
        var textWidth = ctx.measureText(text).width,
            angle = textWidth / this.radius;
        ctx.save();
        ctx.rotate(-angle / 2);

        for (var i = 0; i < text.length; i++) {
            var letterWidth = ctx.measureText(text[i]).width,
                ang = angle * letterWidth / textWidth / 2;
            ctx.rotate(ang);
            ctx.save();
            ctx.translate(-letterWidth/2, -this.radius);
            this.Text_drawTextLine(ctx, text[i], y);
            ctx.restore();
            ctx.rotate(ang);

        }
        ctx.restore();
    };

    createjs.TextArc = TextArc;
}());
