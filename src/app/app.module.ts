import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { PlayersListComponent } from './components/players-list/players-list.component';
import { TeamsListComponent } from './components/teams-list/teams-list.component';
import { CreateTeamComponent } from './components/create-team/create-team.component';
import { CreatePlayerComponent } from './components/create-player/create-player.component';
import { PlayerDetailsComponent } from './components/player-details/player-details.component';
import { TeamDetailsComponent } from './components/team-details/team-details.component';
import { UpdatePlayerComponent } from './components/update-player/update-player.component';
import { UpdateTeamComponent } from './components/update-team/update-team.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomePageComponent,
    PlayersListComponent,
    TeamsListComponent,
    CreateTeamComponent,
    CreatePlayerComponent,
    PlayerDetailsComponent,
    TeamDetailsComponent,
    UpdatePlayerComponent,
    UpdateTeamComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgxPaginationModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
