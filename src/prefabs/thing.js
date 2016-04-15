import Phaser from 'phaser';

export default class Thing extends Phaser.Sprite {
    
    constructor ({ game, x, y, asset }) {
        super(game, x, y, asset);
        
        this.game = game;
        this.anchor.setTo(0.5);
        
        this.shape = 'square';
        this.colour = 'red';
    }
    
    update () {
        
    }
}