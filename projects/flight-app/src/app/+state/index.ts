import { AuthState, LayoutState } from './index';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
  Action
} from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';

import { environment } from '../../environments/environment';


export enum AppActions {
  INIT = '[App] INIT'
}

export class AppInitAction implements Action {
  readonly type = AppActions.INIT;
  constructor() {
  }
}

export interface AuthState {
  userName: string;
}

export const initAuthState: AuthState = {
  userName: ''
}

export interface LayoutState {
  layout: string;
}

export const initLayoutState: LayoutState = {
  layout: ''
}

export interface ContextState {
  linie: string;
}

export const initContextState: ContextState = {
  linie: ''
}

export interface AppState {
  auth: AuthState
  layout: LayoutState,
  context: ContextState
}

export const initState = {
  auth: initAuthState,
  layout: initLayoutState,
  context: initContextState
}


export function AuthStateReducer(state: AuthState, action: Action): AuthState {
  switch(action.type) {
    case AppActions.INIT: {
      return { userName: 'Max' };
    }
    default:
      return state;
  }
}

export function LayoutStateReducer(state: LayoutState, action: Action): LayoutState {
  switch(action.type) {
    case AppActions.INIT: {
      return { layout: 'salkfdjsalkfjdsa==' };
    }
    default:
      return state;
  }
}

export function ContextStateReducer(state: ContextState, action: Action): ContextState {
  switch(action.type) {
    case AppActions.INIT: {
      return { linie: 'gelb' };
    }
    default:
      return state;
  }
}


export const reducers: ActionReducerMap<AppState> = {
  auth: AuthStateReducer,
  context: ContextStateReducer,
  layout: LayoutStateReducer
};


export const isInitializedSelector = createSelector(
  (s:AppState) => s.auth.userName,
  (s:AppState) => s.context.linie,
  (s:AppState) => s.layout.layout,
  (userName, linie, layout) => !!userName && !!linie && !!layout
)

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [storeFreeze] : [];
