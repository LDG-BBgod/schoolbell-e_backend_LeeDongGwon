function countOfIsland(data: number[][]): number {
  const stack: [number, number][] = [];
  const dx: number[] = [1, 1, 0, -1, -1, -1, 0, 1];
  const dy: number[] = [0, 1, 1, 1, 0, -1, -1, -1];
  const n: number = data.length;
  const m: number = data[0].length;
  const visit: number[][] = Array(n).fill(0).map(() => Array(m).fill(0));
  let count: number = 0;

  for (let x = 0; x < n; x++) {
    for (let y = 0; y < m; y++) {
      if (visit[x][y] == 0 && data[x][y] == 1) {
        visit[x][y] = 1;
        stack.push([x, y]);
        count += 1;

        while (stack.length > 0) {
          const [curX, curY] = stack.pop()!;

          for (let i = 0; i < 8; i++) {
            const nx = curX + dx[i];
            const ny = curY + dy[i];

            if (nx < 0 || nx >= n || ny < 0 || ny >= m) continue;
            if (visit[nx][ny] == 1 || data[nx][ny] == 0) continue;
            visit[nx][ny] = 1;
            stack.push([nx, ny]);
          }
        }
      }
    }
  }

  return count;
}

const taskData2: number[][] = [
  [1, 0, 1, 0, 0],
  [1, 0, 0, 0, 0],
  [1, 0, 1, 0, 1],
  [1, 0, 0, 1, 0],
];
const taskResult2 = countOfIsland(taskData2);
console.log(taskResult2);
