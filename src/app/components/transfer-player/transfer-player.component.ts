import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlayerDto } from 'src/app/models/player.model';
import { TeamDto } from 'src/app/models/team.model';
import { PlayerService } from 'src/app/services/player.service';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-transfer-player',
  templateUrl: './transfer-player.component.html',
  styleUrls: ['./transfer-player.component.css']
})
export class TransferPlayerComponent implements OnInit {


  @Input() error: any;
  id!:number;
  player!: PlayerDto;
  teamName!: String;
  transferAmount: String = '0';
  newTeam: TeamDto = new TeamDto();
  teamList: TeamDto[] = [];
  constructor(private route: ActivatedRoute, 
    private playerService: PlayerService, 
    private teamService: TeamService,
    private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.playerService.getPlayerById(this.id).subscribe(data => {
      this.player = data;
      this.teamService.getTeamsList().subscribe(data => {
        this.teamService.getTeamById(this.player.teamId).subscribe(data => this.teamName = data.teamName)
        this.teamList = data;
      })
    }, error => console.log(error));
  }
  
  changeTransfer(){
    let now = new Date();
    let playerCareerStartDate = new Date(this.player.careerStartDate);
    var months = (now.getFullYear() - playerCareerStartDate.getFullYear()) * 12;
    months -= playerCareerStartDate.getMonth();
    389655
    months += now.getMonth();
    var transferPrice = months * 100000 / this.player.age;
    var commission = transferPrice / this.newTeam.transferCommission;
    this.transferAmount = (transferPrice + commission).toFixed(2);
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
