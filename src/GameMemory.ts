class GameMemory {
    public playerName: string = "";
    public playerScore: number = 0;
    public topScores: { name: string; score: number }[] = [];

    constructor() {
        this.loadFromLocalStorage();
        // this.topScores = [];
    }

    public addScore(name: string, score: number): void {
        this.topScores.push({ name, score });
        this.saveToLocalStorage();
    }

    private saveToLocalStorage(): void {
        const data = {
            topScores: this.topScores,
        };
        localStorage.setItem("gameMemory", JSON.stringify(data));
    }

    private loadFromLocalStorage(): void {
        const rawData = localStorage.getItem("gameMemory");
        if (!rawData) {
            this.topScores = [];
            return;
        }
        try {
            const parsedData = JSON.parse(rawData) as {
                topScores: { name: string; score: number }[];
            };
            this.topScores = parsedData.topScores;

        } catch (error) {
            console.error(error);
            this.topScores = [];
        }
    }
}
