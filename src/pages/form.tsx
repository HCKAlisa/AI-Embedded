/*
Author: Alisa Ho (hckalisa@gmail.com)
form.tsx (c) 2024
Desc: Form for user input
Created:  2024-07-08T02:39:39.546Z
*/

import React, { FC } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import "../index.css";

type FormData = {
    firstName: string;
    lastName: string;
    age: number;
};

const FormPage: React.FC = (props) => {
    const schema: z.ZodSchema<FormData> = z.object({
        firstName: z.string().min(2).max(30),
        lastName: z.string().min(2).max(30),
        age: z.number(),
    });

    const { register, handleSubmit } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    const submitData = (data: FormData) => {
        console.log(data);
    };

    return (
        <div
            id="form-area"
            className="grow flex flex-col items-center justify-center"
        >
            <form
                className="flex flex-col w-4/12 gap-4"
                onSubmit={handleSubmit(submitData)}
            >
                <label htmlFor="Fname">First Name: </label>
                <input
                    type="text"
                    id="Fname"
                    {...register("firstName")}
                    className="border border-gray-300 rounded-md"
                />
                <label htmlFor="Lname">Last Name: </label>
                <input
                    type="text"
                    id="Lname"
                    {...register("lastName")}
                    className="border border-gray-300 rounded-md"
                />
                <label htmlFor="age">Age: </label>
                <input
                    type="number"
                    id="age"
                    {...register("age")}
                    className="border border-gray-300 rounded-md"
                />
                <input
                    type="submit"
                    className="bg-indigo-900 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
                />
            </form>
        </div>
    );
};

export default FormPage;
