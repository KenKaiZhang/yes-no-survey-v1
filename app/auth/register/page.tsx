"use client";

import React, { useState } from "react";
import Link from "next/link";
import InputWarning from "@/app/components/InputWarning";

const Register = () => {
  const [error, setError] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const payload = {
      name: e.target.name.value,
      email: e.target.email.value,
      password: e.target.password.value,
    };
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (res.status === 409) {
      setError(true);
    } else {
      window.history.back();
    }
  };

  return (
    <React.Fragment>
      <div className="title">
        <p>Register</p>
      </div>

      <form method="post" onSubmit={handleSubmit}>
        <input id="name" name="name" type="text" placeholder="Name" required />
        <label htmlFor="email">
          <input id="email" name="email" type="email" placeholder="Email" required />
          {error && <InputWarning message="Failed" />}
        </label>
        <input id="password" type="password" placeholder="Password" required />
        <input id="submit" type="submit" value="Register" />
      </form>

      <div className="goLogin">
        <Link href="/auth/login">Login</Link>
      </div>
    </React.Fragment>
  );
};

export default Register;
