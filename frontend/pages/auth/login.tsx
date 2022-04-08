import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { object, string, TypeOf } from "zod";
import { useRouter } from "next/router";
import axios from "axios";

export const createSessionSchema = object({
  email: string().nonempty({
    message: "Email is required",
  }),
  password: string().nonempty({
    message: "Password is required",
  }),
});

type CreateSessionInput = TypeOf<typeof createSessionSchema>;

function Login() {
  const router = useRouter();
  const [loginError, serLoginError] = useState(null);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<CreateSessionInput>({
    resolver: zodResolver(createSessionSchema),
  });

  function onSubmit(values: CreateSessionInput) {
    try {
      axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/sessions`,
        values,
        { withCredentials: true }
      );
      router.push("/");
    } catch (e: any) {
      serLoginError(e.message);
    }
  }

  return (
    <div>
      <p>{loginError}</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-element">
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
          <button type="submit">submit</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
