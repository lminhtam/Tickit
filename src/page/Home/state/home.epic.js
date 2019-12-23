import {FETCHING_DATA, FETCHING_DATA_SUCCESS, FETCHING_DATA_FAILURE} from './home.action';
import {getDataSuccess, getDataFailure} from './home.action';
import 'rxjs';
import {Observable, ofType} from 'redux-observable';

const fetchDataEpic = action$ =>
  action$.pipe(
    ofType(FETCHING_DATA),
    mergeMap(async action => {
      let data = [];
      await Ticket.database()
        .ref()
        .child('shows')
        .once('value', snapshot => {
          data = snapshot.val();
        });
      return Object.assign({}, action, {
        type: FETCHING_DATA_SUCCESS,
        price,
      });
    }),
    catchError(err =>
      Promise.resolve({type: FETCHING_DATA_FAILURE, message: err.message}),
    ),
  );

export default fetchDataEpic;
