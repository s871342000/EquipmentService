import { createStore } from 'redux'
import reducer from '../reducers/reducer'

export default () => {
    const store = createStore(reducer)
    return store;
}