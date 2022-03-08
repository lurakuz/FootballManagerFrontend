import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlayerDto } from 'src/app/models/player.model';
import { TeamDto } from 'src/app/models/team.model';
import { PlayerService } from 'src/app/services/player.service';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-create-player',
  templateUrl: './create-player.component.html',
  styleUrls: ['./create-player.component.css']
})
export class CreatePlayerComponent implements OnInit {

  player: PlayerDto = new PlayerDto();
  teamList: TeamDto[] = [];
  selectedTeam!: TeamDto;

  constructor(private playerService: PlayerService,
    private teamService: TeamService,
    private router: Router) { }

  ngOnInit(): void {
    this.teamService.getTeamsList().subscribe(data => {
      this.teamList = data;
    })
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
    this.player.teamId = this.selectedTeam.id
    console.log(this.player);
    this.savePlayer();
  }
}