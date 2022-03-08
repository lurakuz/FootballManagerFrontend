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
  teamId!: number;
  newTeam: TeamDto = new TeamDto();
  teamList: TeamDto[] = [];
  transferAmount: Number = 0;
  public selectedTeam: TeamDto = new TeamDto();


  constructor(private playerService: PlayerService,
    private teamService: TeamService,
    private route: ActivatedRoute,
    private router: Router) { }


  ngOnInit(): void {
    this.id = this.route.snapshot.params['id']
    this.playerService.getPlayerById(this.id).subscribe(data => {
      this.player = data;
      this.teamId = data.teamId
      this.teamService.getTeamsList().subscribe(data => {
        this.teamList = data;
      })
    }, error => console.log(error));
  }

  savePlayer(){
    this.teamService.getTeamById(this.teamId).subscribe(data => {
      this.newTeam = data;
    })
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

  filterTeam(teamList: TeamDto[]): TeamDto[] {
    let result: TeamDto[] = [];
    teamList.forEach(team => {
      if(team.id !== this.player.teamId){
         result.push(team);
      }
    });
    return result;
  }
}
