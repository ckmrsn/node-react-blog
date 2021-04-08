import { combineReducers } from 'redux'
import post from './post'

const rootRecuer = combineReducers({
	posts: post,
})

export default rootRecuer
