import { Router } from 'express';

export const router = Router();

type User = {
    name: string;
    age: number;
    email: string;
};

const users: User[] = [];

router
    .get('/users', (req, res) => {
        res.status(200).json(users);
    })
    .post('/users', (req, res) => {
        const { name, age, email } = req.body;

        let errorMessage = '';
        if (!name || !age || !email) {
            if (!name) {
                errorMessage += 'name is required ';
            } else if (!age) {
                errorMessage += 'age is required ';
            } else if (isNaN(Number(age))) {
                errorMessage += 'age must be a number ';
            } else if (!email) {
                errorMessage += 'email is required ';
            }
        }

        console.log({ errorMessage });

        if (errorMessage) {
            return res.status(400).json({ message: errorMessage.trim() });
        }

        const user = {
            name,
            age,
            email,
        };

        users.push(user);

        res.status(201).json(user);
    });
