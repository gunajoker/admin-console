import { FormEvent } from "react";
import zulopeIcon from "../assets/zulope-icon.png";

type AdminLoginPageProps = {
  onSignIn: () => void;
};

export function AdminLoginPage({ onSignIn }: AdminLoginPageProps) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSignIn();
  };

  return (
    <main className="page-shell" data-node-id="1:6">
      <div className="ambient ambient-left" aria-hidden="true" />
      <div className="ambient ambient-bottom" aria-hidden="true" />
      <section
        className="login-card"
        data-node-id="1:7"
        aria-label="Admin login form"
      >
        <header className="login-header" data-node-id="1:8">
          <img className="brand-icon" src={zulopeIcon} alt="zulope logo" />
          <p className="brand-name">zulope</p>
          <h1 data-node-id="1:9">Admin Login</h1>
        </header>

        <form
          className="login-form"
          data-node-id="1:10"
          onSubmit={handleSubmit}
        >
          <div className="field-group" data-node-id="1:11">
            <label htmlFor="email" data-node-id="1:12">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="Enter your email"
              className="glass-input"
              data-node-id="1:14"
              defaultValue=""
            />
          </div>

          <div className="field-group" data-node-id="1:16">
            <label htmlFor="password" data-node-id="1:17">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder="Enter your password"
              className="glass-input"
              data-node-id="1:19"
              defaultValue=""
            />
          </div>

          <button type="submit" className="sign-in-button" data-node-id="1:21">
            Sign In
          </button>
        </form>
      </section>
    </main>
  );
}
