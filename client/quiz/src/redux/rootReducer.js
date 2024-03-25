import { combineReducers } from 'redux';
import userReducer from './reducers';
import quizViewerReducer from './QuizViewerSlice'; // Import the quizViewer reducer with correct casing

const rootReducer = combineReducers({
  user: userReducer,
  quizViewer: quizViewerReducer, // Add the quizViewer reducer
});

export default rootReducer;