import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import {MatDialog} from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {



  pickCardAnimation = false;
  currentCard: string = '';
  game: Game = new Game;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    this.newGame()
  }

  newGame() {
    this.game = new Game;
    console.log(this.game);
  }
  takeCard() {
    if (!this.pickCardAnimation) {

      this.currentCard = this.game.stack.pop()!;
      this.pickCardAnimation = true;
      console.log('Game is ' ,this.game)
      console.log('New card:' + this.currentCard)


      
      this.game.currentPlayer++;
      //                                              modolu for loop
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
      setTimeout(() => {
        this.game.playedCard.push(this.currentCard);
        this.pickCardAnimation = false;
      }, 1000)
    }
  }

openDialog(): void { // adding name into the array 
  const dialogRef = this.dialog.open(DialogAddPlayerComponent);
 

  dialogRef.afterClosed().subscribe((name: string) => {
    // überprüfen ob name existiert und dann ob name größer als 0 ist
    if(name && name.length > 0){
      this.game.players.push(name);
    }
  });
}
}


