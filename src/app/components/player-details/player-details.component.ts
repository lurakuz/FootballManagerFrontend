import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlayerDto } from 'src/app/models/player.model';
import { PlayerService } from 'src/app/services/player.service';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-player-details',
  templateUrl: './player-details.component.html',
  styleUrls: ['./player-details.component.css']
})
export class PlayerDetailsComponent implements OnInit {

  id!:number;
  player!: PlayerDto;
  teamName!: String;
  constructor(private route: ActivatedRoute, private playerService: PlayerService, private teamService: TeamService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.player = new PlayerDto;
    this.playerService.getPlayerById(this.id).subscribe(data => {
      this.player = data;
      this.teamService.getTeamById(this.player.teamId).subscribe(data => this.teamName = data.teamName)
    })
  }
}