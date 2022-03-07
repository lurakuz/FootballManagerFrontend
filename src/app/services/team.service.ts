import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { API_BASE_URL_TEAMS } from "../constants";
import { TeamDto } from "../models/team.model";
import { PageableTeamDto } from "../models/pageable.team.model";

@Injectable({
    providedIn: 'root'
  })
export class TeamService {
    constructor(private httpClient: HttpClient) { }
  
    getPageableTeams(params:any): Observable<PageableTeamDto>{
      return this.httpClient.get<PageableTeamDto>(API_BASE_URL_TEAMS + "/pageable", {params});
    }

    getTeamsList(): Observable<TeamDto[]>{
      return this.httpClient.get<TeamDto[]>(API_BASE_URL_TEAMS);
    }
  
    createTeam(team: TeamDto): Observable<Object>{
      return this.httpClient.post(API_BASE_URL_TEAMS, team);
    } 
  
    getTeamById(id: number): Observable<TeamDto>{
      return this.httpClient.get<TeamDto>(API_BASE_URL_TEAMS + "/" + id);
    }
  
    updateTeam(id: number, team: TeamDto): Observable<Object>{
      return this.httpClient.put(API_BASE_URL_TEAMS + "/" + id, team);
    }
  
    deleteTeam(id: number): Observable<Object>{
      return this.httpClient.delete(API_BASE_URL_TEAMS + "/" + id);
    }
  
}