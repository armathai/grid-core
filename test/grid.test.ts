import { Cell } from '../src';
import { CellAlign, CellScale, IRawRect } from '../src/Types';
import { fillRect } from '../src/utils/Utils';

const gridName = 'TestGrid';

const gridCells = [{ name: 'TestCell1', bounds: { x: 0, y: 0, width: 100, height: 100 } }];

const gridBounds = (): IRawRect => ({ x: 0, y: 0, width: 200, height: 200 });

const gridScale = CellScale.fill;

const gridAlign = CellAlign.centerTop;

const gridPadding = 10;

const gridConfig = {
    align: gridAlign,
    bounds: gridBounds(),
    cells: gridCells,
    name: gridName,
    padding: gridPadding,
    scale: gridScale,
};

const grid = new Cell(gridConfig);

test('Grid Config', () => {
    expect(grid.config).toBe(gridConfig);
});

test('Grid Name', () => {
    expect(grid.name).toEqual(gridName);
});

test('Grid Cells', () => {
    expect(grid.cells).toBeInstanceOf(Array);
});

test('Grid Bounds', () => {
    expect(grid.bounds).toEqual(fillRect(gridBounds()));
});

test('Grid Scale', () => {
    expect(grid.scale).toEqual(gridScale);
});

test('Grid Align', () => {
    expect(grid.align).toEqual(gridAlign);
});

test('Grid Get Cell By Name', () => {
    expect(grid.getCellByName(gridCells[0].name)).toBeDefined();
    expect(grid.getCellByName('Should not be Defined')).toBeUndefined();
});
