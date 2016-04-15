import Phaser from 'phaser';
import Frontground from '../prefabs/frontground';
import Mushroom from '../sprites/Mushroom';

import { setResponsiveWidth } from '../utils';
import { getRandomInt } from '../utils';
    
export default class Play extends Phaser.State {
    create () {

        let background = this.game.add.sprite(this.game.world.width / 2, this.game.world.height / 2, 'background');
        background.anchor.setTo(0.5);
        
        this.running = false;
        this.clicked = false;
        
        this.cantShapes = 3;
        this.cantColours = 4;
        
        this.shapes = ['square', 'circle', 'hexagon', 'triangle', 'pentagon'];
        this.colours = ['red', 'green', 'blue', 'yellow', 'purple', 'orange', 'black', 'white'];
        this.hexColours = [0xFF0000, 0x00FF00, 0x0000FF, 0xFFFF00, 0x8f00c4, 0xff6700, 0x000000, 0xFFFFFF];
        
        //this.thing = this.game.add.sprite(this.game.width/2, this.game.height/2 + this.game.height/50 , 'shapes', 'square.png');
        this.thing = this.game.add.sprite(this.game.width/2, this.game.height*4/7 , 'shapes', 'square.png');
        this.thing.anchor.setTo(0.5);
        this.theThing;
        
        this.stuff = this.game.add.sprite(this.game.width/2, this.game.height/3 + this.game.height/20, 'shapesText', 'square.png'); 
        this.stuff.anchor.setTo(0.5);
        
        this.stuffColour = this.game.add.sprite(this.game.width/2, this.game.height * 2 / 9 + this.game.height/20, 'coloursText', 'whitewhite.png');
        this.stuffColour.anchor.setTo(0.5);
        
        this.theStuff;
        
        this.createThatAndThis();
        
        
        this.fg = new Frontground(this.game, 'Play');
        this.fg.itIsShown = this.youCanGoOn.bind(this);
        this.fg.showYouSelfMonster('Play');
        
        
        this.startTime = 1;
        this.passedTime = this.startTime;
        this.tickTime = 0.1;
        
        let t = (''+this.passedTime)[0];
        if ((''+this.passedTime)[2] !== undefined)
            t += '.' + (''+this.passedTime)[2];
        
        this.timeText = this.game.add.bitmapText(this.game.world.width/15, this.game.world.width/15, 'font', t, 80);
        this.timeText.anchor.setTo(0.5);
        
        this.score = 0;
        this.scoreText = this.game.add.bitmapText(this.game.world.width/2, this.game.world.height/20, 'font', this.score+'', 120);
        this.scoreText.anchor.setTo(0.5);
        
        this.timer = this.game.time.create(false);
        this.timer.loop(Phaser.Timer.SECOND * this.tickTime, this.countDown, this);
        //this.timer.start();
        
        
        this.dir = 0
        this.shake = 0;
        
    }

    /* CREATES THE SHAPE AND THE TEXT */
    /* THERE SHOULD BE A 50/50 CHANCE THAT THEY ARE BOTH THE SAME. OR MAYBE 60/40, OR 70/30... I SHOULD TRY THIS OUT... */
    createThatAndThis () {
        this.theThing = { 
            colour: this.colours[this.game.rnd.integerInRange(0, this.cantColours - 1)], 
            shape: this.shapes[this.game.rnd.integerInRange(0, this.cantShapes - 1)]
        };
        
        this.thing.frameName = this.theThing.shape + '.png';
        
        if (this.theThing.colour !== 'any')
            this.thing.tint = this.hexColours[this.colours.indexOf(this.theThing.colour)];  
        
        
        let r = this.game.rnd.integerInRange(0, 1);
        
        if (r === 0)
            this.theStuff = {
                colour: this.theThing.colour,
                shape: this.theThing.shape
            }; 
        else
            this.theStuff = { 
                colour: this.colours[this.game.rnd.integerInRange(0, this.cantColours - 1)], 
                shape: this.shapes[this.game.rnd.integerInRange(0, this.cantShapes - 1)]
            };
        
        
        let c = this.game.rnd.integerInRange(0, 5);
        
        if (this.theStuff.colour === undefined) 
            this.theStuff.colour = 'any';
        else
            this.stuffColour.frameName = this.theStuff.colour + this.colours[c] + '.png';
        if (this.theStuff.shape === undefined) 
            this.theStuff.shape = 'any';
        else 
            this.stuff.frameName = this.theStuff.shape + this.colours[c] + '.png';
        
        
    }
    
    youCanGoOn () {
        this.running = true;
        this.timer.start();
    }
    
    update () {
        if (this.shake > 0) {
            let r1 = this.game.rnd.integerInRange(-20, 20);
            let r2 = this.game.rnd.integerInRange(-20, 20);
            
            this.game.world.setBounds(r1, r2, this.game.width + r1, this.game.height + r2);
            this.shake--;
            
            if (this.shake <= 0)
                this.game.world.setBounds(0, 0, this.game.width, this.game.height);
        }
        
        if (!this.running)
            return;
        
        if (this.game.input.activePointer.isDown)
            this.theyTouchedIt();
    }
    
    /* IT GETS CALLED WHEN THE SCREEN IS TOUCHED */
    theyTouchedIt () {   
        if (this.clicked || this.game.input.activePointer.y < this.game.height/8)
            return;

        this.clicked = true;
        this.running = false;
        
        this.timer.pause();
        
        let b = (this.theThing.colour === this.theStuff.colour || this.theStuff.colour === 'any') &
                (this.theThing.shape === this.theStuff.shape || this.theStuff.shape === 'any'); 
        
        
        if (this.game.input.activePointer.x >= this.game.width / 2 && b ||
            this.game.input.activePointer.x < this.game.width / 2 && !b ) {
            
            this.dir = b ? 1 : -1;
            this.score++;
            this.scoreText.setText('' + this.score);
            this.nextSet();
        }
        else
            this.endGame();
    }
    
    nextSet () {
        
        let p = this.dir === 1 ? this.game.width * 5/4 : -this.game.width/4;
        let q = this.dir === -1 ? this.game.width * 5/4 : -this.game.width/4;
        
        let t = this.game.add.tween(this.stuff).to({ x: q }, 250, 'Quart.easeOut');
        t.start();
        t = this.game.add.tween(this.stuffColour).to({ x: q }, 250, 'Quart.easeOut');
        t.start();
        
        t = this.game.add.tween(this.thing).to({ x: p }, 250, 'Quart.easeOut');
        t.onComplete.add(this.nowYouAppearAgain, this);
        t.start();
    }
    
    /* BRINGS THE SHAPE AND TEXT TO THE CENTER OF THE SCREEN*/
    nowYouAppearAgain(){

        let p = this.dir === 1 ? this.game.width * 5/4 : -this.game.width/4;
        let q = this.dir === -1 ? this.game.width * 5/4 : -this.game.width/4;
        
        
        this.thing.x = q
        this.stuff.x = p;
        this.stuffColour.x = p;
        
        let t = this.game.add.tween(this.stuff).to({ x: this.game.width/2}, 250 , 'Quart.easeOut');
        t.start();
        t = this.game.add.tween(this.stuffColour).to({ x: this.game.width/2}, 250 , 'Quart.easeOut')
        t.start();
        
        t = this.game.add.tween(this.thing).to({ x: this.game.width/2}, 250 , 'Quart.easeOut');
        t.onComplete.add(this.readyToContinue, this);
        t.start();
        
        this.createThatAndThis();
    }
    
    /* SET THING UP TO 'PLAY' AGAIN. IT'S CALLED AFTER ALL ANIMATIONS ARE DONE*/
    readyToContinue () {
        this.passedTime = this.startTime;
        this.clicked = false;
        this.running = true;
        
        this.thing.x = this.game.width/2;
        
        this.timeText.setText((''+this.passedTime)[0]);
        this.timer.resume();
    }
    
    countDown () {
        this.passedTime -= this.tickTime;
        this.timeText.setText((''+this.passedTime)[0] + '.' + (''+this.passedTime)[2]);
        
        
        if (this.passedTime > 0)
            return;
        
        this.timer.pause();
        this.passedTime = 0;
        this.timeText.setText('0');
        this.endGame();
    }
    
    endGame () {
        this.running = false;
        this.shake = 20;
        
        this.timer.pause();
        
        let hs = localStorage.getItem('HS');
        if (hs === null)
            localStorage.setItem('HS', ''+this.score);
        else {
            hs = parseInt(hs);
            if (this.score > hs)
                localStorage.setItem('HS', ''+this.score);
        }
        
        /* ANIMATION */
        let t = this.game.add.tween(this.timeText).to({ y: this.game.height * 3/2}, 900 , Phaser.Easing.Exponential.In);
        t.start();
        t = this.game.add.tween(this.scoreText).to({ y: this.game.height * 3/2}, 1000 , Phaser.Easing.Exponential.In);
        t.start();
        
        t = this.game.add.tween(this.stuff).to({ y: this.game.height * 3/2}, 700 , Phaser.Easing.Exponential.In, true, 50);
        t.start();
        t = this.game.add.tween(this.stuffColour).to({ y: this.game.height * 3/2}, 700 , Phaser.Easing.Exponential.In, true, 100)
        t.start();
        
        t = this.game.add.tween(this.thing).to({ y: this.game.height * 3/2}, 700 , Phaser.Easing.Exponential.In);
        t.onComplete.add(this.backToMenuWithYou, this);
        t.start();
        
    }
    
    backToMenuWithYou () {
        this.game.world.setBounds(0, 0, this.game.width, this.game.height);
        
        this.fg.beGoneDemon();
    }
}
