// 주어진 숫자 배열의 모든 순열을 생성하는 함수
function getPermutations(elements: number[]): number[][] {
  // 배열의 길이가 1이면 배열을 그대로 반환
  if (elements.length === 1) {
    return [elements];
  }

  const perms: number[][] = [];

  // 1개의 숫자를 고정하고 나머지 숫자에 대해 재귀적으로 순열을 구함
  for (let i = 0; i < elements.length; i++) {
    const fixed = elements[i]; // 고정할 숫자
    const remaining = [...elements.slice(0, i), ...elements.slice(i + 1)]; // 남은 숫자들
    // 남은 숫자들의 순열을 구하고 고정된 숫자와 합침
    for (const perm of getPermutations(remaining)) {
      perms.push([fixed, ...perm]);
    }
  }

  return perms;
}

// 만들 수 있는 두개의 숫자 조합중에서 가장 곱이 큰 조합을 찾는 함수
function findMaxProduct(numbers: number[]): [number, number] {
  let maxProduct: number = 0; // 가장 큰 곱의 값
  let bestCombination: [number, number] = [0, 0]; // 가장 큰 곱의 값을 만든 두 수
  const permutations = getPermutations(numbers); // 숫자 배열의 모든 순열 구하기

  // 각 순열에 대해 만들 수 있는 두 숫자의 곱을 계산
  for (const perm of permutations) {
    for (let i = 1; i < perm.length; i++) {
      // 배열의 0~i까지의 숫자와 나머지를 각각 문자열로 만들어 합치고 다시 숫자로 바꿈
      const num1 = Number(perm.slice(0, i).join(""));
      const num2 = Number(perm.slice(i).join(""));
      const product = num1 * num2;

      // 만약 곱이 더 크면 곱한 값 및 두 수를 갱신
      if (product > maxProduct) {
        maxProduct = product;
        bestCombination = [num1, num2];
      }
    }
  }

  return bestCombination;
}

const taskData1 = [1, 3, 5, 7, 9];
const [resultNum1, resultNum2] = findMaxProduct(taskData1);
console.log(`result: ${resultNum1}, ${resultNum2}`);
