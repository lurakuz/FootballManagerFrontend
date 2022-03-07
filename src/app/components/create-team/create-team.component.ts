import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TeamDto } from 'src/app/models/team.model';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-create-team',
  templateUrl: './create-team.component.html',
  styleUrls: ['./create-team.component.css']
})
export class CreateTeamComponent implements OnInit {

  team: TeamDto = new TeamDto();
  constructor(private teamService: TeamService,
    private router: Router) { }

  ngOnInit(): void {
  }

  saveTeam(){
    this.teamService.createTeam(this.team).subscribe(data=> {
      console.log(data);
      this.goToTeamsList();
    },
    error=>console.log(error));
  }

  goToTeamsList(){
    this.router.navigate(['/team']);
  }

  onSubmit(){
    console.log(this.team);
    this.saveTeam();
  }

}
