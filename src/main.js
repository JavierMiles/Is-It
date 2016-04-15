import Phaser from 'phaser'

import PreloadState from './states/Preload'
import SplashState from './states/Splash'
import PlayState from './states/Play'
import MenuState from './states/Menu'
import TutorialState from './states/Tutorial'

class Game extends Phaser.Game {

    constructor () {
        let width = document.documentElement.clientWidth > 800 ? 800 : document.documentElement.clientWidth
        let height = document.documentElement.clientHeight > 1024 ? 1024 : document.documentElement.clientHeight

        let a = 1600 / 900;
        height = document.documentElement.clientHeight - 50;
        width = height / a;
        
        //super(width, height, Phaser.AUTO, 'content', null);
        super(960, 1600, Phaser.AUTO, 'content', null);

        this.state.add('Preload', PreloadState, false);
        this.state.add('Splash', SplashState, false);
        this.state.add('Play', PlayState, false);
        this.state.add('Menu', MenuState, false);
        this.state.add('Tutorial', TutorialState, false);

        
        this.state.start('Preload');
  }
}

new Game()