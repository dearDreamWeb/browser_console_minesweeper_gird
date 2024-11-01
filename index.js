class MinesweeperGrid {
    constructor() {
        this.originGrid = [];
        this.showGrid = [];
        this.rows = 5;
        this.columns = 5;
        this.numMines = 3;
        this.steps = 0;
        this.isOver = false;
        this.goal = 0;
    }
    start() {
        this.steps = 0;
        this.goal = 0;
        this.isOver = false;
        this.originGrid = JSON.parse(JSON.stringify(new Array(this.rows).fill(new Array(this.columns).fill(0))));
        this.showGrid = JSON.parse(JSON.stringify(new Array(this.rows).fill(new Array(this.columns).fill('-'))));
        // this.showGrid = new Array(this.rows).fill(new Array(this.columns).fill('⚫'));
        const list = this.generateMinesweeperGrid(this.rows, this.columns, this.numMines)
        this.originGrid = list
        this.logGrid()
    }
    setSettings(rows = 5, columns = 5, numMines = 3) {
        this.rows = rows;
        this.columns = columns;
        this.numMines = numMines;
        this.start()
    }
    nextStep(rowIndex, columnIndex) {
        if (this.isOver) {
            console.log('please restart game')
            return
        }

        if (typeof rowIndex !== 'number' || typeof columnIndex !== 'number') {
            console.log('params is error')
            return
        }

        if (this.isBeyond(rowIndex, columnIndex)) {
            console.log('beyond')
            return
        }

        if (this.showGrid[rowIndex][columnIndex] !== '-') {
            console.log('already exists')
            return
        }

        this.steps++
        const value = this.originGrid[rowIndex][columnIndex]
        this.isOver = value === -1;
        if (value !== -1 && value !== 0) {
            this.originGrid[rowIndex][columnIndex] = value.toString()
        }
        this.revealGrid(rowIndex, columnIndex)
        console.log(value);
        this.showGridHandler(rowIndex, columnIndex)
        this.logGrid()
        if (this.goal === this.rows * this.columns - this.numMines) {
            this.isOver = true;
            console.log(`you are win: steps ${this.steps}; goal ${this.goal}`);
            return
        }
        if (this.isOver) {
            console.log(`game over: steps ${this.steps}; goal ${this.goal}`)
        }
    }
    help() {
        console.log(`
start(): 开始游戏
nextStep(row,col): 下一步。两个参数: row:第几行;col:第几列。从0开始计数
setSettings(rows,cols,mines): 设置参数，三个参数: rows:生成的行数;cols:生成的列数;mines:生成的地雷数
logGrid(): 当前状态
        `);
    }
    /**
     * 显示界面数据处理
     */
    showGridHandler() {
        let _goal = 0
        if (this.isOver) {
            this.showGrid = this.originGrid.map((subList, row) => subList.map((item, col) => {
                if (this.showGrid[row][col] !== '-') {
                    _goal++
                }
                if (item === -1) {
                    return '*'
                }
                return item
            }))

        } else {
            this.showGrid = this.originGrid.map((subList) => subList.map((item) => {
                if (typeof item === 'string') {
                    _goal++
                    return item
                }
                return '-'
            }))
        }
        this.goal = _goal
    }

    /**是否越界 */
    isBeyond(rowIndex, columnIndex) {
        return rowIndex >= this.rows || rowIndex < 0 || columnIndex >= this.columns || columnIndex < 0
    }

    /**
     * 显示界面
     */
    logGrid() {
        let str = ``;
        // console.log('logGrid', this.originGrid, this.showGrid);
        this.showGrid.forEach((subList) => {
            let subStr = ``;
            subList.forEach((item) => {
                subStr += `${item} `;
            });
            str += `${subStr}\n`;
        });
        console.log(str);
    }

    /**
     * 生成随机数据
     * @param {*} rows 
     * @param {*} cols 
     * @param {*} numMines 
     * @returns 
     */
    generateMinesweeperGrid(rows, cols, numMines) {
        // 初始化二维数组
        const grid = Array.from({ length: rows }, () => Array(cols).fill(0));

        // 放置雷
        let minesPlaced = 0;
        while (minesPlaced < numMines) {
            const row = Math.floor(Math.random() * rows);
            const col = Math.floor(Math.random() * cols);

            // 检查这个位置是否已经有雷
            if (grid[row][col] !== -1) {
                grid[row][col] = -1;
                minesPlaced++;
            }
        }

        // 计算每个非雷位置周围的雷数
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                if (grid[i][j] !== -1) {
                    const minesAround = this.countMinesAround(grid, i, j);
                    grid[i][j] = minesAround;
                }
            }
        }

        return grid;
    }

    /**
     * 计算周围的雷数
     * @param {*} grid 
     * @param {*} row 
     * @param {*} col 
     * @returns 
     */
    countMinesAround(grid, row, col) {
        let minesCount = 0;
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                const newRow = row + i;
                const newCol = col + j;
                if (
                    newRow >= 0 &&
                    newRow < grid.length &&
                    newCol >= 0 &&
                    newCol < grid[0].length
                ) {
                    if (grid[newRow][newCol] === -1) {
                        minesCount++;
                    }
                }
            }
        }
        return minesCount;
    }

    /**
     * 为0是空白格，递归找到四周同样为0的格子显示出来
     * @param {*} rowIndex 
     * @param {*} columnIndex 
     * @returns 
     */
    revealGrid(rowIndex, columnIndex) {
        if (this.isBeyond(rowIndex, columnIndex)) {
            return
        }
        if (this.originGrid[rowIndex][columnIndex] !== 0) {
            return
        }
        // 标记该格子为已打开
        this.originGrid[rowIndex][columnIndex] = '0';
        this.revealGrid(rowIndex, columnIndex - 1)
        this.revealGrid(rowIndex, columnIndex + 1)
        this.revealGrid(rowIndex - 1, columnIndex)
        this.revealGrid(rowIndex + 1, columnIndex)
    }
}
window.mines = new MinesweeperGrid()