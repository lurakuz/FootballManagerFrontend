import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlayerDto } from 'src/app/models/player.model';
import { TeamDto } from 'src/app/models/team.model';
import { PlayerService } from 'src/app/services/player.service';
import { TeamService } from 'src/app/services/team.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-team-details',
  templateUrl: './team-details.component.html',
  styleUrls: ['./team-details.component.css']
})
export class TeamDetailsComponent implements OnInit {

  page: number = 1;
  count: number = 0;
  pageSize: number = 5;
  pageSizes: any = [3, 6, 9, 12];

  players: PlayerDto[] = [];

  id!:number;
  team!: TeamDto;
  constructor(private route: ActivatedRoute, private teamService: TeamService,
     private playerService: PlayerService, private router: Router) { }

  ngOnInit(): void {
      this.id = this.route.snapshot.params['id'];
      this.getTeam();
  }   

  private getTeam(){
    this.team = new TeamDto;
    this.teamService.getTeamById(this.id).subscribe(data => {
      this.team = data;
      const params = this.getRequestParams(this.page, this.pageSize);
      this.playerService.getPlayersByIds(this.team.playerIds, params).subscribe(data => {
        this.players = data.players;
        this.count = data.totalCount;
      })
    })
  }

  getRequestParams(page:any, pageSize:any): any {
    let params:any = {};
    if (this.page) {
      params[`page`] = page - 1;
    }
    if (this.pageSize) {
      params[`size`] = pageSize;
    }
    return params;
  }


  onTableDataChange(event: any) {
    this.page = event;
    this.getTeam();
  }
  onTableSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.getTeam();
  }

  playerDetails(id:number){
    this.router.navigate(['player-details', id]);
  }

  updatePlayer(id: number){
    this.router.navigate(['update-player', id]);
  }

  deletePlayer(id:number){
    this.playerService.deletePlayer(id).subscribe(data=>{
      console.log(data)
      this.getTeam();
    })
  }
}
