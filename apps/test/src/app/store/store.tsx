import create from 'zustand';
import {Column, Row} from '@razor-risk/ui';
import {v4 as uuid} from 'uuid';
import {Option} from '../app.model';
import formatNumberDecimalPlaces from '../app.helpers';

interface AppState {
  columns: Column[];
  rows: Row[];
  options: { name: string; type: number; id: string }[];
  title: string;
  forms: { type: string; placeholder: string; name: string; id: string;}[];
  addTrade: (trade: Row) => void;
  updateTrade: (trade: Row) => void;
  deleteTrade: (id: string) => void;
  formatters: {
    [key: string]: Function
  }
}

const useStore = create<AppState>()((set) => ({
  columns: [
    {
      id: uuid(),
      name: 'Trade ID',
    },
    {
      id: uuid(),
      name: 'Security Code',
    },
    {
      id: uuid(),
      name: 'Trade Price($)',
    },
    {
      id: uuid(),
      name: 'Trade Volume',
    },
    {
      id: uuid(),
      name: 'Trade Owner',
    }],
  formatters: {
    tradeVolume: formatNumberDecimalPlaces(0),
  },
  rows: [
    {
      tradeId: 1,
      securityCode: 'AAPL',
      tradePrice: 1010,
      tradeVolume: 1000,
      tradeOwner: 'John'
    },
    {
      tradeId: 2,
      securityCode: 'GOOG',
      tradePrice: 520.50,
      tradeVolume: 500,
      tradeOwner: 'Alice'
    },
    {
      tradeId: 3,
      securityCode: 'BTC',
      tradePrice: 19520,
      tradeVolume: 2000,
      tradeOwner: 'Bob'
    }
  ],
  options: [{
    id: uuid(),
    name: 'Amend Trade',
    type: Option.Amend
  }, {
    id: uuid(),
    name: 'Delete Trade',
    type: Option.Delete
  }],
  title: 'Sample Trades',
  forms: [{
      id: uuid(),
      type: 'text',
      placeholder: 'Security Code',
      name: 'securityCode'
    },
    {
      id: uuid(),
      type: 'text',
      placeholder: 'Trade Price',
      name: 'tradePrice'
    },
    {
      id: uuid(),
      type: 'text',
      placeholder: 'Trade Volume',
      name: 'tradeVolume'
    },
    {
      id: uuid(),
      type: 'text',
      placeholder: 'Trade Owner',
      name: 'tradeOwner'
    }],
  addTrade: (trade: Row) => set((state) => ({rows: [...state.rows, {...trade}]})),
  deleteTrade: (id: string) => set((state) => ({rows: state.rows.filter(d => d['tradeId'] !== id)})),
  updateTrade: (trade: Row) => set((state) =>
    ({rows: state.rows.map(d => (d['tradeId'] === trade['tradeId'] ? {...d, ...trade} : {...d} ))}))
}))

export default useStore;
