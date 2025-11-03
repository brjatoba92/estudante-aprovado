import React, { createContext, useContext, useReducer} from "react";

const PlanContext = createContext();

const initialPlanState = {
    userPlans: [],
    activePlan: null,
    selectedConcurso: null
};

function planReducer(state, action) {
    switch (action.type) {
        case 'ADD_USER_PLAN':
            return {
                ...state,
                userPlans: [...state.userPlans, action.payload]
            };
        
        case 'SET_ACTIVE_PLAN':
            return {
                ...state,
                activePlan: action.payload
            };

        case 'UPDATE_PLAN':
            return {
                ...state,
                userPlans: state.userPlans.map(plan =>
                    plan.id === action.payload.id ? action.payload : plan
                )
            };

        case 'DELETE_PLAN':
            return {
                ...state,
                userPlans: state.userPlans.filter(plan => plan.id !== action.payload)
            };

        case 'SET_SELECTED_CONCURSO':
            return {
                ...state,
                selectedConcurso: action.payload
            };
        default:
            return state;
    }
}


export const PlanProvider = ({ children }) => {
    const [state, dispatch] = useReducer(planReducer, initialPlanState);
    
    const addUserPlan = (plan) => {
        dispatch({ type: 'ADD_USER_PLAN', payload: plan });
    };

    const setActivePlan = (plan) => {
        dispatch({ type: 'SET_ACTIVE_PLAN', payload: plan });
    };

    const updatePlan = (plan) => {
        dispatch({ type: 'UPDATE_PLAN', payload: plan });
    };

    const deletePlan = (planId) => {
        dispatch({ type: 'DELETE_PLAN', payload: planId });
    };

    const setSelectedConcurso = (concurso) => {
        dispatch({ type: 'SET_SELECTED_CONCURSO', payload: concurso });
    };

    return (
        <PlanContext.Provider
            value={{
                ...state,
                addUserPlan,
                setActivePlan,
                updatePlan,
                deletePlan,
                setSelectedConcurso
            }}
        >
            {children}
        </PlanContext.Provider>
    );
};

export const usePlan = () => useContext(PlanContext);