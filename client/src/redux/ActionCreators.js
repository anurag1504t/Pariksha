import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';

export const addComment = (comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: comment
});

export const postComment = (examId, comment) => (dispatch) => {

    const newComment = {
        examId: examId,
        comment: comment
    };
    newComment.date = new Date().toISOString();
    
    return fetch(baseUrl + 'comments', {
        method: "POST",
        body: JSON.stringify(newComment),
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "same-origin"
    })
    .then(response => {
        if (response.ok) {
            return response;
        } 
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        throw error;
    })
    .then(response => response.json())
    .then(response => dispatch(addComment(response)))
    .catch(error =>  { console.log('post comments', error.message); alert('Your comment could not be posted\nError: '+error.message); });
};

export const fetchExams = () => (dispatch) => {

    dispatch(examsLoading(true));

    return fetch(baseUrl + 'exams')
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            var errmess = new Error(error.message);
            throw errmess;
      })
    .then(response => response.json())
    .then(exams => dispatch(addExams(exams)))
    .catch(error => dispatch(examsFailed(error.message)));
}

export const examsLoading = () => ({
    type: ActionTypes.EXAMS_LOADING
});

export const examsFailed = (errmess) => ({
    type: ActionTypes.EXAMS_FAILED,
    payload: errmess
});

export const addExams = (exams) => ({
    type: ActionTypes.ADD_EXAMS,
    payload: exams
});

export const fetchComments = () => (dispatch) => {    
    return fetch(baseUrl + 'comments')
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            var errmess = new Error(error.message);
            throw errmess;
      })
    .then(response => response.json())
    .then(comments => dispatch(addComments(comments)))
    .catch(error => dispatch(commentsFailed(error.message)));
};

export const commentsFailed = (errmess) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errmess
});

export const addComments = (comments) => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
});

export const postFeedback = (feedback) => (dispatch) => {
        
    return fetch(baseUrl + 'feedback', {
        method: "POST",
        body: JSON.stringify(feedback),
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "same-origin"
    })
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
    },
    error => {
        throw error;
    })
    .then(response => response.json())
    .then(response => { console.log('Feedback', response); alert('Thank you for your feedback!\n'+JSON.stringify(response)); })
    .catch(error =>  { console.log('Feedback', error.message); alert('Your feedback could not be posted\nError: '+error.message); });
};

export const requestLogin = (creds) => {
    return {
        type: ActionTypes.LOGIN_REQUEST,
        creds
    }
}
  
export const receiveLogin = (response) => {
    return {
        type: ActionTypes.LOGIN_SUCCESS,
        token: response.token
    }
}
  
export const loginError = (message) => {
    return {
        type: ActionTypes.LOGIN_FAILURE,
        message
    }
}

export const loginUser = (creds) => (dispatch) => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(requestLogin(creds))

    return fetch(baseUrl + 'users/login', {
        method: 'POST',
        headers: { 
            'Content-Type':'application/json'
        },
        body: JSON.stringify(creds)
    })
    .then(response => {
        if (response.ok) {
            return response;
        } else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
        },
        error => {
            throw error;
        })
    .then(response => response.json())
    .then(response => {
        if (response.success) {
            // If login was successful, set the token in local storage
            localStorage.setItem('token', response.token);
            localStorage.setItem('creds', JSON.stringify(creds));
            // Dispatch the success action
            dispatch(receiveLogin(response));
        }
        else {
            var error = new Error('Error ' + response.status);
            error.response = response;
            throw error;
        }
    })
    .catch(error => dispatch(loginError(error.message)))
};

export const requestLogout = () => {
    return {
      type: ActionTypes.LOGOUT_REQUEST
    }
}
  
export const receiveLogout = () => {
    return {
      type: ActionTypes.LOGOUT_SUCCESS
    }
}

// Logs the user out
export const logoutUser = () => (dispatch) => {
    dispatch(requestLogout())
    localStorage.removeItem('token');
    localStorage.removeItem('creds');
    dispatch(receiveLogout())
}

export const fetchResults = () => (dispatch) => {

    dispatch(resultsLoading(true));

    return fetch(baseUrl + 'results')
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            var errmess = new Error(error.message);
            throw errmess;
      })
    .then(response => response.json())
    .then(results => dispatch(addResults(results)))
    .catch(error => dispatch(resultsFailed(error.message)));
}

export const resultsLoading = () => ({
    type: ActionTypes.RESULT_LOADING
});

export const resultsFailed = (errmess) => ({
    type: ActionTypes.RESULT_FAILED,
    payload: errmess
});

export const addResults = (results) => ({
    type: ActionTypes.ADD_RESULT,
    payload: results
});

export const fetchResponses = () => (dispatch) => {

    dispatch(responsesLoading(true));

    return fetch(baseUrl + 'response')
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            var errmess = new Error(error.message);
            throw errmess;
      })
    .then(response => response.json())
    .then(responses => dispatch(addResponses(responses)))
    .catch(error => dispatch(responsesFailed(error.message)));
}

export const responsesLoading = () => ({
    type: ActionTypes.RESPONSE_LOADING
});

export const responsesFailed = (errmess) => ({
    type: ActionTypes.RESPONSE_FAILED,
    payload: errmess
});

export const addResponses = (responses) => ({
    type: ActionTypes.ADD_RESPONSE,
    payload: responses
});

export const postMultiple = (examId, userResponse) => (dispatch) => {
        
    const bearer = 'Bearer ' + localStorage.getItem('token');
    
    return fetch(`${baseUrl + examId}/multiple`, {
        method: "POST",
        body: JSON.stringify(userResponse),
        headers: {
            "Content-Type": "application/json",
            'Authorization': bearer
        },
        credentials: "same-origin"
    })
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
    },
    error => {
        throw error;
    })
    .then(response => response.json())
    .then(response => { console.log('Multiple Choice Question', response); alert('Multiple Choice Question Added\n'+JSON.stringify(response)); })
    .catch(error =>  { console.log('Multiple Choice Question', error.message); alert('Failed to add Multiple Choice Question\nError: '+error.message); });
};

export const postNumerical = (examId, userResponse) => (dispatch) => {
        
    const bearer = 'Bearer ' + localStorage.getItem('token');
    
    return fetch(`${baseUrl + examId}/numerical`, {
        method: "POST",
        body: JSON.stringify(userResponse),
        headers: {
            "Content-Type": "application/json",
            'Authorization': bearer
        },
        credentials: "same-origin"
    })
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
    },
    error => {
        throw error;
    })
    .then(response => response.json())
    .then(response => { console.log('Numerical Question', response); alert('Numerical Question Added\n'+JSON.stringify(response)); })
    .catch(error =>  { console.log('Numerical Question', error.message); alert('Failed to add Numerical Question\nError: '+error.message); });
};

export const postSubjective = (examId, userResponse) => (dispatch) => {
        
    const bearer = 'Bearer ' + localStorage.getItem('token');
    
    return fetch(`${baseUrl + examId}/subjective`, {
        method: "POST",
        body: JSON.stringify(userResponse),
        headers: {
            "Content-Type": "application/json",
            'Authorization': bearer
        },
        credentials: "same-origin"
    })
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
    },
    error => {
        throw error;
    })
    .then(response => response.json())
    .then(response => { console.log('Subjective Question', response); alert('Subjective Question Added\n'+JSON.stringify(response)); })
    .catch(error =>  { console.log('Subjective Question', error.message); alert('Failed to add Subjective Question\nError: '+error.message); });
};