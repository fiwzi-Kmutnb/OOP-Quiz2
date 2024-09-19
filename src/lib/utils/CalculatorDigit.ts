export default class CalculatorDigit {

  public root(str: string): number {
    if(this.address(str) == '')
      return -1;
    let sum: number = -1;
    let len: number = str.length;
    if (len > 0) {
      sum = 0;
      for (let i = 0; i < len; i++) {
        const c: string = str.charAt(i);
        if(isNaN(parseInt(c)) == false) {
          sum += parseInt(c);
        }
      }
    }
    if(sum <= -1)
        return -1;
    if(sum == 0)  
        return 0;
    return sum % 9 == 0 ? 9 : sum % 9;
  }
  public address(str: string): string {
    return str.replace(/[^0-9]/g, '');
  }
}