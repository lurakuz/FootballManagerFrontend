export class TeamDto {
    id!: number;
    teamName!: string;
    country!: string;
    city!: string;
    accountAmount!: DoubleRange;
    transferCommission!: string;
    playerIds! : number[];
}