function countOfIsland(data: number[][]): number {
  // 좌표를 저장할 스택 초기화
  const stack: [number, number][] = [];
  // 8방향 (상, 하, 좌, 우, 대각선 포함) 이동을 위한 dx, dy 배열
  const dx: number[] = [1, 1, 0, -1, -1, -1, 0, 1];
  const dy: number[] = [0, 1, 1, 1, 0, -1, -1, -1];


  const n: number = data.length;  // 행의 개수
  const m: number = data[0].length; // 열의 개수

  // 방문 여부를 추적하는 2차원 배열 (초기값은 0)
  const visit: number[][] = Array(n).fill(0).map(() => Array(m).fill(0));

  let count: number = 0;  // 섬의 개수

  // [0,0]부터 모든 좌표를 순회
  for (let x = 0; x < n; x++) {
    for (let y = 0; y < m; y++) {
      // 해당 좌표가 방문한 적이 없고 1(섬)인 경우
      if (visit[x][y] == 0 && data[x][y] == 1) {
        visit[x][y] = 1;  // 방문처리
        stack.push([x, y]); // 스택에 해당 좌표 추가
        count += 1; // 섬 개수 증가

        // 스택을 이용한 깊이 우선 탐색
        while (stack.length > 0) {
          const [curX, curY] = stack.pop()!;  // 스택에서 좌표 꺼내기

          // 8방향으로 탐색
          for (let i = 0; i < 8; i++) {
            const nx = curX + dx[i];
            const ny = curY + dy[i];

            // 좌표가 배열의 범위를 벗어난 경우 건너뜀
            if (nx < 0 || nx >= n || ny < 0 || ny >= m) continue;
            // 이미 방문했거나 0(바다)인 경우 건너뜀
            if (visit[nx][ny] == 1 || data[nx][ny] == 0) continue;
            visit[nx][ny] = 1;  // 방문처리
            stack.push([nx, ny]); // 스택에 추가
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
