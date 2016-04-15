import Phaser from 'phaser'
import WebFont from 'webfontloader'

export default class Preload extends Phaser.State {
    create (){
        //this.game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
        //this.game.scale.scaleMode = Phaser.ScaleManager.RESIZE;
        //this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.game.scale.setUserScale(0.55, 0.55, 0, 0);
        this.game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
        //this.game.scale.pageAlignHorizontally = true;
        //this.game.scale.pageAlignVertically = true;
    }
    
    preload() {
        this.load.bitmapFont('font', 'assets/fonts/font.png', 'assets/fonts/font.xml');
        
        this.load.atlasXML('imgs', 'assets/images/sprites.png', 'assets/images/sprites.xml');
        this.load.atlasXML('shapes', 'assets/images/shapes.png', 'assets/images/shapes.xml');

        this.load.atlasXML('shapesText', 'assets/fonts/shapesText.png', 'assets/fonts/shapesText.xml');
        this.load.atlasXML('coloursText', 'assets/fonts/colours.png', 'assets/fonts/colours.xml');
        
        this.load.image('background', 'assets/images/background.png');

        this.load.image('tutorial', 'assets/images/tutorial.jpg');
        this.load.image('title', 'assets/images/title.png');
        
        this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    }
    
    onLoadComplete() {
        this.state.start('Menu');
        //this.state.start('Play');
    }
    
}
