const express = require('express');
const propertyRoutes = express.Router();
const User = require('../models/user.model');


propertyRoutes.post('/:userId/properties', async (req, res) => {
    const { userId } = req.params;
    console.log('Request Body:', req.body);
    const { name, address, current_tenant, current_rent } = req.body;

    try {
        const user = await User.findOne({ _id: { $eq: userId } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const newProperty = {
            name,
            address,
            current_tenant,
            current_rent,
            rent_logs: []
        };

        user.properties.push(newProperty);
        await user.save();
        res.status(201).json(newProperty);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

propertyRoutes.get('/:userId/properties', async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await User.findOne({ _id: { $eq: userId } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user.properties);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

propertyRoutes.put('/:userId/properties/:propertyId', async (req, res) => {
    const { userId, propertyId } = req.params;
    const { name, address, current_tenant, current_rent } = req.body;

    try {
        const user = await User.findOne({ _id: { $eq: userId } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const property = user.properties.id(propertyId);
        if (!property) {
            return res.status(404).json({ message: 'Property not found' });
        }

        property.name = name;
        property.address = address;
        property.current_tenant = current_tenant;
        property.current_rent = current_rent;

        await user.save();
        res.status(200).json(property);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

module.exports = propertyRoutes;