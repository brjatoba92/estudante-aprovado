import React, { useState} from "react";
import { usePlan } from "../../contexts/PlanContext";
import PlanSelection from "./PlanSelection";
import UserPlans from "./UserPlans";
import { HiPlus, HiClipboardList } from "react-icons/hi";
import "../../styles/plans.css";

const PlansPage = () => {
    const { userPlans } = usePlan();
    const [showPlanSelection, setShowPlanSelection] = useState(false);

    return (
        <div className="plans-page">
            <div className="plans-header">
                <div>
                    <h1>Meus Planos de Estudo</h1>
                    <p>Gerencie seus planos de estudo para diferentes concursos</p>
                </div>
                <button 
                    className="btn-primary" 
                    onClick={() => setShowPlanSelection(true)}
                >
                    <HiPlus size={20} />
                    Novo Plano
                </button>
            </div>
            
            <div className="plans-content">
                {userPlans && userPlans.length > 0 ? (<UserPlans />) : (
                    <div className="empty-state">
                        <HiClipboardList size={64} />
                        <h2>Você ainda não criou nenhum plano de estudo.</h2>
                        <p>Clique em "Novo Plano" para começar a criar seu primeiro plano de estudo.</p>
                        <button 
                            className="btn-primary" 
                            onClick={() => setShowPlanSelection(true)}
                        >
                            <HiPlus size={20} />
                            Novo Plano
                        </button>
                    </div>
                )}
            </div>
            {showPlanSelection && (
                <PlanSelection onClose={() => setShowPlanSelection(false)} />
            )}
        </div>
    );
}

export default PlansPage;