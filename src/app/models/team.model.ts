export class TeamDto {
    id!: number;
    teamName!: string;
    country!: string;
    city!: string;
    accountAmount!: DoubleRange;
    transferCommission!: number;
    playerIds! : number[];
}