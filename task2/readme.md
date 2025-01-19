# 문제2 풀이과정

BFS 혹은 DFS방식으로 노드를 탐색하여 Island의 개수를 찾습니다.

이를위해 주어진 그림을 Land는 1, Sea는 0로 하여 이차원 배열에 담았습니다.

```ts
const taskData2 = [
  [1, 0, 1, 0, 0],
  [1, 0, 0, 0, 0],
  [1, 0, 1, 0, 1],
  [1, 0, 0, 1, 0],
];
```

BFS는 Queue를 사용하고 DFS는 Stack을 사용합니다. 타입스크립트의 경우 Queue 또는 Stack에 대한 내장된 자료구조가 없습니다. 따라서 배열을 이용하여 BFS,DFS를 구현해야 하는대 Queue의 경우 자료를 꺼낼때 Array.shift()를 사용하기때문에 시간복잡도가O(n)이고 Stack의 경우 Array.pop()을 사용하기때문에 시간복잡도가 O(1)입니다. 따라서 DFS를 사용하였습니다.

이제 0,1로 이루어진 이차원 배열을 받으면 Island의 개수를 반환하는 countOfIsland 함수를 만듭니다.


- stack을 활용하기위해 배열 생성
```ts
const stack: [number, number][] = [];
```


- 선택된 노드의 상하좌우와 대각선을 탐색하기 위해 dx,dy 생성
```ts
const dx: number[] = [1, 1, 0, -1, -1, -1, 0, 1];
const dy: number[] = [0, 1, 1, 1, 0, -1, -1, -1];
```


- 해당 노드를 방문했는지 확인하기 위해 입력받은 이차원 행렬과 같은크기의 0행렬 생성
```ts
const n: number = data.length;
const m: number = data[0].length;
const visit: number[][] = Array(n).fill(0).map(() => Array(m).fill(0));
```


- Island의 개수를 세기위한 변수 생성
```ts
let count: number = 0;
```


이제 입력받은 이차원 배열의 [0,0]부터 순회를하며 방문한 곳의 값이 1이고 방문한 적이 없다면 해당 좌표를 stack에 넣은 뒤 DFS방식으로 탐색합니다. 그리고 탐색 전 혹은 탐색 후에 count를 1 증가시키면서 입력받은 이차원배열의 순회가 끝나면 모든Island의 개수를 셀 수 있습니다.
```ts
for (let x = 0; x < n; x++) {
  for (let y = 0; y < m; y++) {
    if (visit[x][y] == 0 && data[x][y] == 1) {
      visit[x][y] = 1;
      stack.push([x, y]);
      count += 1;
      while (stack.length > 0) {
        // DFS방식으로 노드 탐색
      }
    }
  }
}
```