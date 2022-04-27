import { Item } from 'chakra-ui-autocomplete';
declare module 'chakra-ui-autocomplete' {
  interface Item {
    ISO_3166_1: string;
  }
}
