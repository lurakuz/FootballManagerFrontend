import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PageableTeamDto } from 'src/app/models/pageable.team.model';
import { TeamDto } from 'src/app/models/team.model';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-teams-list',
  templateUrl: './teams-list.component.html',
  styleUrls: ['./teams-list.component.css']
})
export class TeamsListComponent implements OnInit {

  teams: TeamDto[] = [];
  pageableTeams: PageableTeamDto = new PageableTeamDto;

  page: number = 1;
  count: number = 0;
  pageSize: number = 5;
  pageSizes: any = [3, 6, 9, 12];

  constructor(private teamService: TeamService,
    private router: Router) { }

  ngOnInit(): void {
    this.getTeams();
  }

  private getTeams(){
    const params = this.getRequestParams(this.page, this.pageSize);
    this.teamService.getPageableTeams(params).subscribe(data => {
      this.pageableTeams = data;
      this.count = this.pageableTeams.totalCount;
      this.teams = this.pageableTeams.teams;
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
    this.getTeams();
  }
  onTableSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.getTeams();
  }

  teamDetails(id:number){
    this.router.navigate(['team-details', id]);
  }

  updateTeam(id: number){
    this.router.navigate(['update-team', id]);
  }

  deleteTeam(id:number){
    this.teamService.deleteTeam(id).subscribe(data=>{
      console.log(data)
      this.getTeams();
    })
  }

  createTeam(){
    this.router.navigate(['create-team']);
  }
}