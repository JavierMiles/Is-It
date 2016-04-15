import Phaser from 'phaser';
import { setResponsiveWidth } from '../utils';

export default class Frontground {
    constructor (game, state) {
        
        this.s = state;
        this.game = game;
        
        this.topMiddle = game.height / 2 + 100;
        this.botMiddle = game.height / 2 - 50;
        
        
        this.top = game.add.sprite(game.width / 2, this.topMiddle, 'imgs', 'topbig.png');
        this.top.anchor.setTo(0.5, 1);
        //setResponsiveWidth(this.top, 120, game.world);
        
        this.bot = game.add.sprite(game.width / 2, this.botMiddle, 'imgs', 'botbig.png');
        this.bot.anchor.setTo(0.5, 0);
        //setResponsiveWidth(this.bot, 120, game.world);
        
        
        if (state === 'Play') {
            this.wPos = game.width*4/5;
            this.lPos = game.width/5;
            
            this.px = game.width*8/9;
            
            this.wright = game.add.sprite(game.width + game.width / 4, game.height - game.height / 9, 'imgs', 'wright.png');
            this.wright.anchor.setTo(0.5);
            this.wrong = game.add.sprite(0 - game.width / 4, game.height - game.height / 9, 'imgs', 'wrong.png');
            this.wrong.anchor.setTo(0.5);
            
            this.pause = game.add.button(game.width + game.width / 4, game.height/50, 'imgs', null, this, 'pauseup.png', 'pauseup.png', 'pausedown.png');
            
        }
        
        let beige = 'e8e89c';
        let pink = 'e26069';
        
        this.time = 1500;
    }
    
    beGoneDemon (s) {
        let q = this.game.add.tween(this.top).to({ y: this.topMiddle }, this.time, 'Quart.easeOut');
        q.start();
        q = this.game.add.tween(this.bot).to({ y: this.botMiddle }, this.time, 'Quart.easeOut');
        q.start();
        q.onComplete.add(this.itIsGone, this);
        
        if (this.s === 'Menu')
            return;
        
        q = this.game.add.tween(this.wright).to({ x: this.game.width * 5/4 }, this.time, 'Quart.easeOut');
        q.start();
        q = this.game.add.tween(this.wrong).to({ x: -this.game.width / 4 }, this.time, 'Quart.easeOut');
        q.start();
        q = this.game.add.tween(this.pause).to({ x: this.game.width * 5/4 }, this.time, 'Quart.easeOut');
        q.start();
        
        
    }
    
    itIsGone () {
        this.game.state.start(this.s === 'Menu' ? 'Play' : 'Menu');
        //this.game.state.start('Play');
    }
    
    showYouSelfMonster () {
        
        let t = this.s === 'Menu' ? this.game.height / 3 : this.game.height / 5;
        let b = this.s === 'Menu' ? this.game.height - this.game.height / 3 : this.game.height - this.game.height / 4;
        
        let q = this.game.add.tween(this.top).to({ y: t }, this.time, 'Quart.easeOut');
        q.start();
        q = this.game.add.tween(this.bot).to({ y: b }, this.time, 'Quart.easeOut');
        q.start();
        
        
        if (this.s !== 'Play')
            return;
        
        q = this.game.add.tween(this.wright).to({ x: this.wPos }, this.time, 'Quart.easeOut');
        q.start();
        q = this.game.add.tween(this.wrong).to({ x: this.lPos }, this.time, 'Quart.easeOut');
        q.start();
        q = this.game.add.tween(this.pause).to({ x: this.px }, this.time, 'Quart.easeOut');
        q.onComplete.add(this.itIsShown, this);
        q.start();
        
    }
    
    itIsShown () {}
}