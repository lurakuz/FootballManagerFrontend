import { PlayerDto } from 'src/app/models/player.model';

export class PageablePlayerDto {
    players!: PlayerDto[];
    totalCount!: number;
}