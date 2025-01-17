interface IScene {
    update(): void;
    draw(): void;
    
}

//interface för att byta scen
interface IChangeableScene {
  changeActiveScene(scene: IScene): void;

}