import {warped} from 'warped-components';
import effects from './effects';
import {reducer} from './state';

export default warped({reducer, effects})(null);
