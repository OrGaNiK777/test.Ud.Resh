function fun(int) {
  let sum = 0
  for (let i = 0; i < int.length; i++) {
    const element = int[i];
    sum = int[i] + sum
  }
  int.sort((a, b) => a - b)
  console.log("avg:" + sum / int.length, "med:" + (int.length % 2 ? int[Math.ceil(int.length / 2)] : (int[int.length / 2]) + (int[(int.length / 2) - 1])))
}
fun([2, 8, 12, 65, 3])
