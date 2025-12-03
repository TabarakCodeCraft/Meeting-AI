"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

export default function Home() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const { data: session, } = authClient.useSession()

  const onSubmit = () => {
    authClient.signUp.email({ email, password, name },
      {
        onError: () => {
          window.alert("Error went wrong");
        },
        onSuccess: () => {
          window.alert("User created successfully");
        }
      }
    );
  }

  if (session) {
    return <div className="flex flex-col p-4 gap-y-4">
      <p>Logged in as {session.user.name}</p>
      <Button onClick={() => authClient.signOut()}>Sign Out</Button>
    </div>
  }

  return (
    <div>
      <Input
        placeholder="name"
        value={name} onChange={(e) => setName(e.target.value)}
      />
      < Input
        placeholder="email"
        value={email} onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        placeholder="password"
        type="password"
        value={password} onChange={(e) => setPassword(e.target.value)} />

      <Button onClick={onSubmit}>Create User</Button>
    </div>
  );
}
