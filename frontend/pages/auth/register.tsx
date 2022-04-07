import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { object, string, TypeOf } from "zod";
import { useRouter } from "next/router";
import axios from "axios";

const createUserSchema = object({
  email: string().email("Not a valid email").nonempty({
    message: "Email is required",
  }),
  username: string().nonempty({
    message: "Username is required",
  }),
  password: string()
    .min(6, "Password too short - should be 6 chars minimum")
    .nonempty({
      message: "Password is required",
    }),
  passwordConfirmation: string().nonempty({
    message: "Password confirmation is required",
  }),
}).refine((data) => data.password === data.passwordConfirmation, {
  message: "Passwords do not match",
  path: ["passwordConfirmation"],
});

type CreateUserInput = TypeOf<typeof createUserSchema>;

function Register() {
  const router = useRouter();
  const { registerError, setRegisterError } = useState(null);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<CreateUserInput>({
    resolver: zodResolver(createUserSchema),
  });

  function onSubmit(values: CreateUserInput) {
    try {
      axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/users`,
        values
      );
      router.push("/");
    } catch (e: any) {
      setRegisterError(e.message);
    }
  }

  return (
    <div>
      <p>{registerError}</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-element">
          <input
            id="username"
            type="text"
            placeholder="Username"
            {...register("username")}
          />
          <p>{errors.username?.message}</p>
          <input
            id="email"
            type="email"
            placeholder="Email"
            {...register("email")}
          />
          <p>{errors.email?.message}</p>
          <input
            id="password"
            type="password"
            placeholder="Password"
            {...register("password")}
          />
          <p>{errors.password?.message}</p>
          <input
            id="passwordConfirmation"
            type="password"
            placeholder="Confirmation"
            {...register("passwordConfirmation")}
          />
          <p>{errors.passwordConfirmation?.message}</p>
          <button type="submit">submit</button>
        </div>
      </form>
    </div>
  );
}

export default Register;
