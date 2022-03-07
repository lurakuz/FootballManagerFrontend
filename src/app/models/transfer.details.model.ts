export class TransferDetailsDto {
    teamId!: number;
    playerId!: number;

    constructor(teamId:number, playerId: number) {
        this.teamId = teamId;
        this.playerId = playerId;
    }
}