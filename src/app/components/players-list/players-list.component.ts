import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlayerDto } from 'src/app/models/player.model';
import { PlayerService } from 'src/app/services/player.service';
import { TeamService } from 'src/app/services/team.service';
import { TeamDto } from "../../models/team.model";
import { TransferDetailsDto } from "../../models/transfer.details.model";

@Component({
  selector: 'app-players-list',
  templateUrl: './players-list.component.html',
  styleUrls: ['./players-list.component.css']
})
export class PlayersListComponent implements OnInit {

  page: number = 1;
  count: number = 0;
  pageSize: number = 10;
  pageSizes: any = [3, 6, 9, 12];

  players: PlayerDto[] = [];
  teamId: number = 0;
  playersMap = new Map<PlayerDto, TeamDto>();

  constructor(private playerService: PlayerService, private teamService: TeamService,
    private router: Router) { }

  ngOnInit(): void {
    this.getPlayers();
  }

  private getPlayers(){
    const params = this.getRequestParams(this.page, this.pageSize);
    this.playerService.getPlayersPageable(params).subscribe(data => {
      this.players = data.players;
      this.count = data.totalCount;
      this.playersMap = new Map<PlayerDto, TeamDto>();
      this.players.forEach(element => this.teamService.getTeamById(element.teamId)
      .subscribe(data => this.playersMap.set(element, data)));
    })
  }

  getRequestParams(page:any, pageSize:any): any {
    let params:any = {};
    if (this.page) {
      params[`page`] = this.page - 1;
    }
    if (this.pageSize) {
      params[`size`] = this.pageSize;
    }
    return params;
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.getPlayers();
  }
  onTableSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.getPlayers();
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
      this.getPlayers();
    })
  }

  playerTransfer(playerId:number, teamId: number){
    let transferDto = new TransferDetailsDto(playerId, teamId);
    this.playerService.transferPlayer(transferDto).subscribe(data => {
      this.getPlayers();
    })
  }

  transferPlayer(id:number){
    this.router.navigate(['transfer-player', id]);
  }

  getTeamById(){
    this.teamService.getTeamById.name
  }

  createPlayer (){
    this.router.navigate(['create-player']);
  }

}