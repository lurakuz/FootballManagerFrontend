import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatePlayerComponent } from './components/create-player/create-player.component';
import { CreateTeamComponent } from './components/create-team/create-team.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { PlayerDetailsComponent } from './components/player-details/player-details.component';
import { PlayersListComponent } from './components/players-list/players-list.component';
import { TeamDetailsComponent } from './components/team-details/team-details.component';
import { TeamsListComponent } from './components/teams-list/teams-list.component';
import { UpdatePlayerComponent } from './components/update-player/update-player.component';
import { UpdateTeamComponent } from './components/update-team/update-team.component';

const routes: Routes = [
  {path: '', redirectTo: 'home-page', pathMatch: 'full'},
  {path: 'home-page', component: HomePageComponent},
  {path: 'players', component: PlayersListComponent},
  {path: 'teams', component: TeamsListComponent},
  {path: 'create-player', component: CreatePlayerComponent},
  {path: 'create-team', component: CreateTeamComponent},
  {path: 'update-player/:id', component: UpdatePlayerComponent},
  {path: 'update-team/:id', component: UpdateTeamComponent},
  {path: 'player-details/:id', component: PlayerDetailsComponent},
  {path: 'team-details/:id', component: TeamDetailsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
