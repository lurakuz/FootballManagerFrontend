import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlayerDto } from 'src/app/models/player.model';
import { TeamDto } from 'src/app/models/team.model';
import { PlayerService } from 'src/app/services/player.service';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-update-player',
  templateUrl: './update-player.component.html',
  styleUrls: ['./update-player.component.css']
})
export class UpdatePlayerComponent implements OnInit {

  id!: number;
  player: PlayerDto = new PlayerDto();
  newTeam: TeamDto = new TeamDto();
  teamList: TeamDto[] = [];
  transferAmount: number = 0;


  constructor(private playerService: PlayerService,
    private teamService: TeamService,
    private route: ActivatedRoute,
    private router: Router) { }


  ngOnInit(): void {
    this.id = this.route.snapshot.params['id']
    this.playerService.getPlayerById(this.id).subscribe(data => {
      this.player = data;
      this.teamService.getTeamsList().subscribe(data => {
        this.teamList = data;
      })
    }, error => console.log(error));
  }
  
  changeTransfer(){
    this.transferAmount = 0;
    if(this.newTeam.teamName != null)
      this.transferAmount = 10
  }

  savePlayer(){
    this.player.teamId = this.newTeam.id;
    this.playerService.updatePlayer(this.player.id, this.player).subscribe(data=> {
      console.log(data);
      this.goToPlayersList();
    },
    error=>console.log(error));
  }
  goToPlayersList() {
    this.router.navigate(['/players']);
  }

  onSubmit(){
    console.log(this.player);
    this.savePlayer();
  }
}
