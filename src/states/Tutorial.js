import Phaser from 'phaser'

export default class Tutorial extends Phaser.State {
    create () {
        let background = this.game.add.sprite(0, 0, 'background');

        this.game.add.sprite(0, 0, 'tutorial');
    }

    update (){
        if (this.game.input.activePointer.isDown)
            this.game.state.start('Menu');
    }
    
}
