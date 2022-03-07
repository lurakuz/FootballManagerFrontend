import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { API_BASE_URL_PLAYERS } from "../constants";
import { PlayerDto } from "../models/player.model";
import { HttpClient, HttpParams } from '@angular/common/http';
import { TransferDetailsDto } from "../models/transfer.details.model";
import { PageablePlayerDto } from "../models/pageable.player.model";

@Injectable({
    providedIn: 'root'
  })
  export class PlayerService {
    constructor(private httpClient: HttpClient) { }

    getPlayers(): Observable<PlayerDto[]>{
      return this.httpClient.get<PlayerDto[]>(API_BASE_URL_PLAYERS);
    }

    getPlayersPageable(params: any): Observable<PageablePlayerDto>{
      return this.httpClient.get<PageablePlayerDto>(API_BASE_URL_PLAYERS + "/pageable", { params });
    }

    getPlayersByIds(ids: number[], params: any = {}): Observable<PageablePlayerDto>{
      console.log("params =" + params);
      return this.httpClient.post<PageablePlayerDto>(API_BASE_URL_PLAYERS + "/ids", ids, { params });
    }
  
    createPlayer(player: PlayerDto): Observable<Object>{
      return this.httpClient.post(API_BASE_URL_PLAYERS, player);
    } 
  
    getPlayerById(id: number): Observable<PlayerDto>{
      return this.httpClient.get<PlayerDto>(API_BASE_URL_PLAYERS + "/" + id);
    }
  
    updatePlayer(id: number, player: PlayerDto): Observable<Object>{
      return this.httpClient.put(API_BASE_URL_PLAYERS + "/" + id, player);
    }
  
    deletePlayer(id: number): Observable<Object>{
      return this.httpClient.delete(API_BASE_URL_PLAYERS + "/" + id);
    }

    transferPlayer(transferDto: TransferDetailsDto): Observable<Object>{
        return this.httpClient.post(API_BASE_URL_PLAYERS + "/transfer-player", transferDto)
    }
  
}