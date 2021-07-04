/**
 * 公式曰く、
 * 複雑なロジックがReducerになければ単体テストを書く必要はない
 * 統合テストで動作を確認すればいい
 */
import counterReducer, 
  {
    decrement,
    increment,
    incrementByAmount,
    incrementAsync,
    incrementIfOdd,
    selectCount,
  } from '../features/counter/counterSlice';
import {CounterState, initialState } from '../features/counter/counterSlice'
import { useAppSelector, useAppDispatch } from '../app/hooks';

test('Action decrement', () => {
  const resultState: CounterState = {
    status: 'idle',
    value: -1,
  }
  expect(counterReducer(initialState,decrement)).toEqual(resultState)
})

test('Action increment', () => {
  const resultState: CounterState = {
    status: 'idle',
    value: 1,
  }
  expect(counterReducer(initialState,increment)).toEqual(resultState)
})

test('Action incrementByAmount', () => {
  const resultState: CounterState = {
    status: 'idle',
    value: 10,
  }
  expect(counterReducer(initialState,incrementByAmount(10))).toEqual(resultState)
})

// test('Action incrementAsync', () => {
//   const dispatch = useAppDispatch();

//   const resultState: CounterState = {
//     status: 'idle',
//     value: 10,
//   }
//   expect(counterReducer(initialState,incrementAsync(10))).toEqual(resultState)
// })

// test('Action incrementIfOdd', () => {
//   const resultState: CounterState = {
//     status: 'idle',
//     value: 10,
//   }
//   expect(counterReducer(initialState,incrementIfOdd(10))).toEqual(resultState)
// })



