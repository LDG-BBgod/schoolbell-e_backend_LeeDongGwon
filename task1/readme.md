# 문제1 풀이과정

### 1. 주어진 수를 사용하여 두개의 숫자조합을 만든다.

### 2. 두 수를 곱해서 나온값이 maxValue(초기값0)보다 크다면 그 값과 두 수를 저장한다.

### 3. 주어진 숫자를 사용해 만들 수 있는 모든 경우의 수에 대하여 위 과정을 반복 한 후 저장된 두 수를 출력한다.

두 숫자의 곱이 가장 큰 조합을 찾아야 하기 때문에 당연히 주어진 숫자(1,3,5,7,9)를 모두 사용해야 합니다. 주어진 숫자를 배열에 넣은 뒤, 모든 가능한 순열을 생성합니다. 각 배열에서 인덱스0 부터 인덱스i 까지의 숫자로 첫번재 수를 만들고 나머지로 두번째 수를 만듭니다. 첫번째 수는 최소1개부터 최대 4개까지의 숫자로 만들어 질 수 있습니다.

위의 설명을 구현하기 위해, 숫자가 주어졌을 때 순열을 생성하는 getPermutations 함수를 재귀적으로 작성했습니다.

<br>

- 입력받은 요소가 1개면 해당 요소를 배열에 담아 반환하고 이 조건은 재귀함수의 종료 조건입니다.
- 그렇지 않은경우 1개의 요소를 고정 후 남은 요소들의 모든 순열을 재귀적으로 구합니다. 그 후 고정한 요소 뒤에 구한 순열을 추가하여 순열을 완성시킨 후 반환합니다.

```ts
function getPermutations(elements: number[]): number[][] {
  if (elements.length === 1) {
    return [elements];
  }

  const perms: number[][] = [];

  for (let i = 0; i < elements.length; i++) {
    const fixed = elements[i];
    const remaining = [...elements.slice(0, i), ...elements.slice(i + 1)];
    for (const perm of getPermutations(remaining)) {
      perms.push([fixed, ...perm]);
    }
  }

  return perms;
}
```

<br>

이제 주어진 숫자로 순열을 생성하는 함수를 만들었으니 해당순열에서 두개의 숫자조합을 뽑고 곱한 뒤 그 값을 비교하여 이전보다 큰경우 곱한 수와 값을 저장하는 findMaxProduct 함수를 만듭니다.

<br>

- 숫자배열을 받아오면 getPermutations 함수를 통해 순열을 생성합니다.
- 각각의 요소마다 만들수 있는 모든 숫자 조합에서 두 수를 곱한 뒤 maxProduct와 비교하면서 기존값보다 클경우 곱한 수와 값을 저장합니다.
- 모든 순열의 요소들에 대해 계산이 끝나면 최종적으로 저장된 두 수를 반환합니다.

```ts
function findMaxProduct(numbers: number[]): [number, number] {
  let maxProduct: number = 0;
  let bestCombination: [number, number] = [0, 0];
  const permutations = getPermutations(numbers);

  for (const perm of permutations) {
    for (let i = 1; i < perm.length; i++) {
      const num1 = Number(perm.slice(0, i).join(""));
      const num2 = Number(perm.slice(i).join(""));
      const product = num1 * num2;

      if (product > maxProduct) {
        maxProduct = product;
        bestCombination = [num1, num2];
      }
    }
  }

  return bestCombination;
}
```
