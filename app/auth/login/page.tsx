"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faFacebook, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { HttpStatusCodes } from "@/app/lib/httpStatusCodes";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState({ email: "", password: "" });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const payload = {
      email: e.target.email.value,
      password: e.target.password.value,
    };

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const url = window.location.href;
    const params = new URLSearchParams(new URL(url).search);
    const from = params.get("from") ? params.get("from") : "/";
    console.log(from, res.status);
    console.log(router);
    if (res.status === HttpStatusCodes.OK && from) {
      router.push(from);
      window.location.reload();
    }
  };

  return (
    <React.Fragment>
      <div className="title">
        <p>Login</p>
      </div>

      <form method="post" onSubmit={handleSubmit}>
        <input
          id="email"
          type="text"
          placeholder="Email"
          onChange={({ target }) => {
            setUserInfo({ ...userInfo, email: target.value });
          }}
          required
        />
        <input
          id="password"
          type="password"
          placeholder="Password"
          onChange={({ target }) => {
            setUserInfo({ ...userInfo, password: target.value });
          }}
          required
        />
        <input id="submit" type="submit" value="Login" />
      </form>

      <div className="divider">
        <p>or login with</p>
      </div>

      <div className="socialLogin">
        <FontAwesomeIcon id="google" icon={faGoogle} />
        <FontAwesomeIcon id="facebook" icon={faFacebook} />
        <FontAwesomeIcon id="twitter" icon={faTwitter} />
      </div>

      <div className="goRegister">
        <Link href="/auth/register">Register</Link>
      </div>
    </React.Fragment>
  );
};

export default Login;
