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

const taskData1 = [1, 3, 5, 7, 9];
const [resultNum1, resultNum2] = findMaxProduct(taskData1);
console.log(`result: ${resultNum1}, ${resultNum2}`);
