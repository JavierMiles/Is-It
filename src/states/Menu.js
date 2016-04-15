import Phaser from 'phaser';
import Frontground from '../prefabs/frontground';
import { centerGameObjects } from '../utils';

export default class Menu extends Phaser.State {
    create () {

        let background = this.game.add.sprite(0, 0, 'background');

        this.playButton = this.game.add.button(
            this.game.width / 2,
            this.game.height / 2,
            'imgs',
            this.letsPlay,
            this,
            'playup.png', 'playup.png', 'playdown.png'
        );

        this.playButton.anchor.setTo(0.5);
        
        this.b = new Frontground (this.game, 'Menu');
        this.b.showYouSelfMonster('Menu');
        
        
        let s = localStorage.getItem('HS');
        if (s === null)
            s = '0';
        
        let scoreText = this.game.add.bitmapText(this.game.world.width*3/4, this.game.world.height*9/5, 'font', s, 200);
        scoreText.anchor.setTo(0.5);
        
        let t = this.game.add.tween(scoreText).to({ y: this.game.world.height - this.game.world.width / 6 }, 500, 'Quart.easeOut', true, 1300);
        t.start();
        this.st = scoreText;
        
        
        let tuto = this.game.add.button(
            this.game.width / 8,
            this.game.height*9/5,
            'imgs',
            this.tutorial,
            this,
            'helpup.png', 'helpup.png', 'helpdown.png'
        );
        
        tuto.anchor.setTo(0.5);
        t = this.game.add.tween(tuto).to({ y: this.game.world.height - this.game.world.width / 6 }, 500, 'Quart.easeOut', true, 1300);
        t.start();
        this.tuto = tuto;
        
        
        let title = this.game.add.sprite(this.game.width/2, - this.game.width *4/5, 'title');
        title.anchor.setTo(0.5);
        t = this.game.add.tween(title).to({ y: this.game.world.height / 9 }, 500, 'Quart.easeOut', true, 1300);
        t.start();
        this.title = title;
    }
    
    letsPlay() {
        
        let t = this.game.add.tween(this.st).to({ y: this.game.world.height*9/5 }, 5000, 'Quart.easeOut');
        t.start();
        
        t = this.game.add.tween(this.tuto).to({ y: this.game.height*9/5 }, 5000, 'Quart.easeOut');
        t.start();
        
        t = this.game.add.tween(this.title).to({ y: - this.game.width *4/5 }, 5000, 'Quart.easeOut');
        t.start();
        
        this.b.beGoneDemon('Menu');
    }
    
    tutorial () {
        this.game.state.start('Tutorial');
    }
}
