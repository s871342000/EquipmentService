import { Action } from 'redux';

export interface Action1 extends Action {
    type: 'SET_CUSTOMER';
    payload: {
        cutomer: string;
    };
}

export interface Action2 extends Action {
    type: 'SET_SN';
    payload: {
        sn: string;
    };
}

export interface Action3 extends Action {
    type: 'SET_MODEL';
    payload: {
        model: string;
    };
}

export interface Action4 extends Action {
    type: 'SET_VERSION';
    payload: {
        version: string;
    };
}

export interface Action5 extends Action {
    type: 'SET_PURCHASEDATE';
    payload: {
        purchaseDate: string;
    };
}
export interface Action6 extends Action {
    type: 'SET_WARRANTYSTART';
    payload: {
        warrantyStart: string;
    };
}
export interface Action7 extends Action {
    type: 'SET_WARRANTYEND';
    payload: {
        warrantyEnd: string;
    };
}
export interface Action8 extends Action {
    type: 'SET_LEASESTART';
    payload: {
        leaseStart: string;
    };
}
export interface Action9 extends Action {
    type: 'SET_LEASEEND';
    payload: {
        leaseEnd: string;
    };
}
export interface Action10 extends Action {
    type: 'SET_MAINTENANCESTART';
    payload: {
        maintenanceStart: string;
    };
}
export interface Action11 extends Action {
    type: 'SET_MAINTENANCEEND';
    payload: {
        maintenanceStart: string
    };
}
export interface Action12 extends Action {
    type: 'SET_MAINTENANCE';
    payload: {
        date: Date,
        items: []
    };
}
export interface Action13 extends Action {
    type: 'SET_REPAIR';
    payload: {
        date: Date,
        comment: string
    };
}

export interface Action14 extends Action {
    type: 'SET_REVISION';
    payload: {
        date: Date,
        version: string
    };
}

// Down here, we'll create a discriminated union type of all actions which will be used for our reducer.
export type ChatActions = Action1 | Action2 | Action3 | Action4 | Action5 | Action6 | Action7 | Action8 | Action9 | Action10 | Action11 | Action12 | Action13 | Action14;