/// <reference types="svelte" />

interface HomeNumber {
    msg: string;
    job: string;
    recommend: string[];
  }
  interface HomeNumberData {
    data: HomeNumber[];
  }
  interface DuoNumber {
    number: string[];
    msg: string;
  }
  
  interface DuoNumberData {
    data: DuoNumber[];
  }
  
  interface BirthdayMsg {
    key: number[];
    msg: string;
  }
  
  interface BirthdayDay {
    key: string;
    msg: BirthdayMsg[];
  }
  
  interface BirthdayNumberData {
    data: BirthdayDay[];
  }
  interface dataShow {
    msg: HomeNumber;
    birthDay: string[];
    duo: string[];
    rootDigit: string;
  }
  