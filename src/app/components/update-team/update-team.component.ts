import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TeamDto } from 'src/app/models/team.model';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-update-team',
  templateUrl: './update-team.component.html',
  styleUrls: ['./update-team.component.css']
})
export class UpdateTeamComponent implements OnInit {

  id!: number;
  team: TeamDto = new TeamDto();
  constructor(private teamService: TeamService,
    private route: ActivatedRoute,
    private router: Router) { }


  ngOnInit(): void {
    this.id = this.route.snapshot.params['id']
    this.teamService.getTeamById(this.id).subscribe(data => {
      this.team = data;
    }, error => console.log(error));
  }

  saveTeam(){
    this.teamService.updateTeam(this.team.id, this.team).subscribe(data=> {
      console.log(data);
      this.goToTeamsList();
    },
    error=>console.log(error));
  }
  goToTeamsList() {
    this.router.navigate(['/teams']);
  }

  onSubmit(){
    console.log(this.team);
    this.saveTeam();
  }
}
