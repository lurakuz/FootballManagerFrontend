import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlayerDto } from 'src/app/models/player.model';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-create-player',
  templateUrl: './create-player.component.html',
  styleUrls: ['./create-player.component.css']
})
export class CreatePlayerComponent implements OnInit {

  player: PlayerDto = new PlayerDto();
  constructor(private playerService: PlayerService,
    private router: Router) { }

  ngOnInit(): void {
  }

  savePlayer(){
    this.playerService.createPlayer(this.player).subscribe(data=> {
      console.log(data);
      this.goToPlayersList();
    },
    error=>console.log(error));
  }

  goToPlayersList(){
    this.router.navigate(['/players']);
  }

  onSubmit(){
    console.log(this.player);
    this.savePlayer();
  }
}