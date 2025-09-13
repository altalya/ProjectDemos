import React, { useState } from 'react';
import PropertyForm from './PropertyForm';
import PropertyList from './PropertyList';
import './AuthForm.css';

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('view');
    const [selectedProperty, setSelectedProperty] = useState(null);

    const handleEdit = (property) => {
        setSelectedProperty(property);
        setActiveTab('add');
    };

    const handleSwitchTab = (tab) => {
        if (tab === 'add') {
            setSelectedProperty(null);
        }
        setActiveTab(tab);
    }

    return (
        <div>
            <h1>Property Tenant Management</h1>
            <div className="tabs">
                <button
                    className={activeTab === 'view' ? 'active' : ''}
                    onClick={() => handleSwitchTab('view')}
                >
                    View Properties
                </button>
                <button
                    className={activeTab === 'add' ? 'active' : ''}
                    onClick={() => handleSwitchTab('add')}
                >
                    Add Property
                </button>
            </div>

            {activeTab === 'add' && <PropertyForm selectedProperty={selectedProperty} />}
            {activeTab === 'view' && <PropertyList onEdit={handleEdit} />}
        </div>
    );
};

export default Dashboard;
