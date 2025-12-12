import { Injectable, signal, computed } from '@angular/core';

export interface Cell {
  isMine: boolean;
  isRevealed: boolean;
  isFlagged: boolean;
  neighborMines: number;
  row: number;
  col: number;
}

export type Board = Cell[][];

export type Difficulty = 'easy' | 'medium' | 'hard';

export interface DifficultyConfig {
  rows: number;
  cols: number;
  mines: number;
  label: string;
}

export type GameStatus = 'idle' | 'playing' | 'won' | 'lost';

const DIFFICULTY_CONFIGS: Record<Difficulty, DifficultyConfig> = {
  easy: { rows: 9, cols: 9, mines: 10, label: 'Fácil' },
  medium: { rows: 16, cols: 16, mines: 40, label: 'Medio' },
  hard: { rows: 16, cols: 30, mines: 99, label: 'Difícil' }
};

@Injectable({
  providedIn: 'root'
})
export class GameStateService {
  // Signals for reactive state
  private _board = signal<Board>([]);
  private _gameStatus = signal<GameStatus>('idle');
  private _difficulty = signal<Difficulty>('easy');
  private _flagsUsed = signal<number>(0);
  private _startTime = signal<number | null>(null);
  private _elapsedTime = signal<number>(0);
  private _firstClick = signal<boolean>(true);

  // Public readonly signals
  readonly board = this._board.asReadonly();
  readonly gameStatus = this._gameStatus.asReadonly();
  readonly difficulty = this._difficulty.asReadonly();
  readonly flagsUsed = this._flagsUsed.asReadonly();
  readonly elapsedTime = this._elapsedTime.asReadonly();

  // Computed values
  readonly config = computed(() => DIFFICULTY_CONFIGS[this._difficulty()]);
  readonly minesRemaining = computed(() => this.config().mines - this._flagsUsed());
  readonly isPlaying = computed(() => this._gameStatus() === 'playing');

  private timerInterval: ReturnType<typeof setInterval> | null = null;

  constructor() {
    this.initializeGame();
  }

  getDifficultyConfigs(): Record<Difficulty, DifficultyConfig> {
    return DIFFICULTY_CONFIGS;
  }

  setDifficulty(difficulty: Difficulty): void {
    this._difficulty.set(difficulty);
    this.initializeGame();
  }

  initializeGame(): void {
    this.stopTimer();
    const config = this.config();
    const board = this.createEmptyBoard(config.rows, config.cols);
    this._board.set(board);
    this._gameStatus.set('idle');
    this._flagsUsed.set(0);
    this._elapsedTime.set(0);
    this._startTime.set(null);
    this._firstClick.set(true);
  }

  private createEmptyBoard(rows: number, cols: number): Board {
    const board: Board = [];
    for (let row = 0; row < rows; row++) {
      const rowCells: Cell[] = [];
      for (let col = 0; col < cols; col++) {
        rowCells.push({
          isMine: false,
          isRevealed: false,
          isFlagged: false,
          neighborMines: 0,
          row,
          col
        });
      }
      board.push(rowCells);
    }
    return board;
  }

  private placeMines(excludeRow: number, excludeCol: number): void {
    const config = this.config();
    const board = this._board();
    let minesPlaced = 0;

    // Create safe zone around first click (3x3 area)
    const isSafeZone = (row: number, col: number): boolean => {
      return Math.abs(row - excludeRow) <= 1 && Math.abs(col - excludeCol) <= 1;
    };

    while (minesPlaced < config.mines) {
      const row = Math.floor(Math.random() * config.rows);
      const col = Math.floor(Math.random() * config.cols);

      if (!board[row][col].isMine && !isSafeZone(row, col)) {
        board[row][col].isMine = true;
        minesPlaced++;
      }
    }

    // Calculate neighbor mines for all cells
    for (let row = 0; row < config.rows; row++) {
      for (let col = 0; col < config.cols; col++) {
        if (!board[row][col].isMine) {
          board[row][col].neighborMines = this.countNeighborMines(board, row, col);
        }
      }
    }

    this._board.set([...board]);
  }

  private countNeighborMines(board: Board, row: number, col: number): number {
    const directions = [
      [-1, -1], [-1, 0], [-1, 1],
      [0, -1],          [0, 1],
      [1, -1], [1, 0], [1, 1]
    ];

    let count = 0;
    for (const [dr, dc] of directions) {
      const newRow = row + dr;
      const newCol = col + dc;
      if (this.isValidCell(board, newRow, newCol) && board[newRow][newCol].isMine) {
        count++;
      }
    }
    return count;
  }

  private isValidCell(board: Board, row: number, col: number): boolean {
    return row >= 0 && row < board.length && col >= 0 && col < board[0].length;
  }

  revealCell(row: number, col: number): void {
    const board = this._board();
    if (!this.isValidCell(board, row, col)) return;

    const cell = board[row][col];
    if (cell.isRevealed || cell.isFlagged) return;

    // First click - place mines and start timer
    if (this._firstClick()) {
      this._firstClick.set(false);
      this.placeMines(row, col);
      this.startTimer();
      this._gameStatus.set('playing');
    }

    if (this._gameStatus() !== 'playing') return;

    // Hit a mine - game over
    if (cell.isMine) {
      this.revealAllMines();
      this._gameStatus.set('lost');
      this.stopTimer();
      return;
    }

    // Reveal cell using flood fill for empty cells
    this.floodFill(row, col);

    // Check win condition
    if (this.checkWin()) {
      this._gameStatus.set('won');
      this.stopTimer();
      this.flagAllMines();
    }
  }

  private floodFill(startRow: number, startCol: number): void {
    const board = this._board();
    const stack: [number, number][] = [[startRow, startCol]];
    const visited = new Set<string>();

    while (stack.length > 0) {
      const [row, col] = stack.pop()!;
      const key = `${row},${col}`;

      if (visited.has(key)) continue;
      if (!this.isValidCell(board, row, col)) continue;

      const cell = board[row][col];
      if (cell.isRevealed || cell.isFlagged || cell.isMine) continue;

      visited.add(key);
      cell.isRevealed = true;

      // If cell has no neighbor mines, expand to neighbors
      if (cell.neighborMines === 0) {
        const directions = [
          [-1, -1], [-1, 0], [-1, 1],
          [0, -1],          [0, 1],
          [1, -1], [1, 0], [1, 1]
        ];
        for (const [dr, dc] of directions) {
          stack.push([row + dr, col + dc]);
        }
      }
    }

    this._board.set([...board]);
  }

  toggleFlag(row: number, col: number): void {
    const board = this._board();
    if (!this.isValidCell(board, row, col)) return;
    if (this._gameStatus() !== 'playing' && this._gameStatus() !== 'idle') return;

    const cell = board[row][col];
    if (cell.isRevealed) return;

    // Start game on first flag if not started
    if (this._gameStatus() === 'idle') {
      this._gameStatus.set('playing');
      this.startTimer();
    }

    if (cell.isFlagged) {
      cell.isFlagged = false;
      this._flagsUsed.update(v => v - 1);
    } else if (this._flagsUsed() < this.config().mines) {
      cell.isFlagged = true;
      this._flagsUsed.update(v => v + 1);
    }

    this._board.set([...board]);
  }

  // Chord click - reveal neighbors if flags match mine count
  chordClick(row: number, col: number): void {
    const board = this._board();
    if (!this.isValidCell(board, row, col)) return;
    if (this._gameStatus() !== 'playing') return;

    const cell = board[row][col];
    if (!cell.isRevealed || cell.neighborMines === 0) return;

    // Count adjacent flags
    const directions = [
      [-1, -1], [-1, 0], [-1, 1],
      [0, -1],          [0, 1],
      [1, -1], [1, 0], [1, 1]
    ];

    let flagCount = 0;
    for (const [dr, dc] of directions) {
      const newRow = row + dr;
      const newCol = col + dc;
      if (this.isValidCell(board, newRow, newCol) && board[newRow][newCol].isFlagged) {
        flagCount++;
      }
    }

    // If flag count matches, reveal all non-flagged neighbors
    if (flagCount === cell.neighborMines) {
      for (const [dr, dc] of directions) {
        const newRow = row + dr;
        const newCol = col + dc;
        if (this.isValidCell(board, newRow, newCol)) {
          const neighbor = board[newRow][newCol];
          if (!neighbor.isFlagged && !neighbor.isRevealed) {
            this.revealCell(newRow, newCol);
          }
        }
      }
    }
  }

  private revealAllMines(): void {
    const board = this._board();
    for (const row of board) {
      for (const cell of row) {
        if (cell.isMine) {
          cell.isRevealed = true;
        }
      }
    }
    this._board.set([...board]);
  }

  private flagAllMines(): void {
    const board = this._board();
    for (const row of board) {
      for (const cell of row) {
        if (cell.isMine && !cell.isFlagged) {
          cell.isFlagged = true;
        }
      }
    }
    this._flagsUsed.set(this.config().mines);
    this._board.set([...board]);
  }

  private checkWin(): boolean {
    const board = this._board();
    for (const row of board) {
      for (const cell of row) {
        if (!cell.isMine && !cell.isRevealed) {
          return false;
        }
      }
    }
    return true;
  }

  private startTimer(): void {
    this._startTime.set(Date.now());
    this.timerInterval = setInterval(() => {
      const start = this._startTime();
      if (start) {
        this._elapsedTime.set(Math.floor((Date.now() - start) / 1000));
      }
    }, 1000);
  }

  private stopTimer(): void {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  // Get cell at position (for canvas click detection)
  getCellAt(row: number, col: number): Cell | null {
    const board = this._board();
    if (this.isValidCell(board, row, col)) {
      return board[row][col];
    }
    return null;
  }
}
