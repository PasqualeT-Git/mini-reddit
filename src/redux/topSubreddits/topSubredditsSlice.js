import { createSlice } from '@reduxjs/toolkit';

const fakeTopics = [
  {id:'000001', title: 'foo', icon:'test.jpeg'}, 
  {id:'000002', title: 'bar', icon:'test.jpeg'}, 
  {id:'000001', title: 'clo', icon:'test.jpeg'} 
]

const initialState = {
  topics: fakeTopics
}

const topSubredditsSlice = createSlice({
  name: 'topSubreddits',
  initialState: initialState,
})

export const selectTopSubreddits = state => state.topSubreddits.topics
export default topSubredditsSlice.reducer