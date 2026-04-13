import { FormEvent, useState } from "react";
import zulopeIcon from "../assets/zulope-icon.png";
import { useAppDispatch } from '../app/hooks';
import { setAuthToken } from '../features/auth/authSlice';
import { useLoginAdminMutation } from '../services/adminApi';

export function AdminLoginPage() {
  const dispatch = useAppDispatch();
  const [loginAdmin, { isLoading }] = useLoginAdminMutation();
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!number.trim() || !password) {
      setErrorMessage("Enter your number and password.");
      return;
    }

    const parsedNumber = Number(number);

    if (Number.isNaN(parsedNumber)) {
      setErrorMessage("Enter a valid number.");
      return;
    }

    setErrorMessage(null);

    try {
      const response = await loginAdmin({
        number: parsedNumber,
        password,
      }).unwrap();

      if (response.ok && response.token) {
        dispatch(setAuthToken(response.token));
        return;
      }

      setErrorMessage(response.error ?? "Login failed.");
    } catch (error) {
      const fallbackMessage = "Unable to reach the login service.";

      if (
        typeof error === 'object' &&
        error !== null &&
        'data' in error &&
        typeof error.data === 'object' &&
        error.data !== null &&
        'error' in error.data &&
        typeof error.data.error === 'string'
      ) {
        setErrorMessage(error.data.error);
        return;
      }

      setErrorMessage(fallbackMessage);
    }
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
            <label htmlFor="number" data-node-id="1:12">
              Number
            </label>
            <input
              id="number"
              name="number"
              type="tel"
              autoComplete="username"
              inputMode="numeric"
              placeholder="Enter your number"
              className="glass-input"
              data-node-id="1:14"
              value={number}
              onChange={(event) => setNumber(event.target.value)}
              disabled={isLoading}
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
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              disabled={isLoading}
            />
          </div>

          {errorMessage ? (
            <p className="form-feedback">{errorMessage}</p>
          ) : null}

          <button
            type="submit"
            className="sign-in-button"
            data-node-id="1:21"
            disabled={isLoading}
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </button>
        </form>
      </section>
    </main>
  );
}
