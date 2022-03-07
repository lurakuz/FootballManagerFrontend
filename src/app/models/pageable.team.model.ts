import { TeamDto } from 'src/app/models/team.model';

export class PageableTeamDto {
    teams!: TeamDto[];
    totalCount!: number;
}