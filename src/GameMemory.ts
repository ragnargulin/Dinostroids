class GameMemory {
    public playerName: string = "";
    public playerScore: number = 0;
    public topScores: { name: string; score: number }[] = [];

    constructor() {
        this.topScores = [];
    }

    public addScore(name: string, score: number): void {
        this.topScores.push({ name, score });
    }
}
