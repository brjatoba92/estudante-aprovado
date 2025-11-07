import React, { createContext, useContext, useReducer, useEffect} from "react";

const PlanContext = createContext();

// Funções para localStorage
const loadPlanState = () => {
  try {
    const serializedState = localStorage.getItem('planPlatformState');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error('Erro ao carregar estado dos planos:', err);
    return undefined;
  }
};

const savePlanState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('planPlatformState', serializedState);
  } catch (err) {
    console.error('Erro ao salvar estado dos planos:', err);
  }
};

const initialPlanState = loadPlanState() || {
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
    
    // Salvar no localStorage sempre que o estado mudar
    useEffect(() => {
        savePlanState(state);
    }, [state]);
    
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